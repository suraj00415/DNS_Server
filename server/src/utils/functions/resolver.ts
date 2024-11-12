import { serverv4, serverv6 } from "../..";
import { Answer } from "../../dns_packet/answer";
import { Header } from "../../dns_packet/header";
import { Question } from "../../dns_packet/question";
import dnsRecords, { ROOT_SERVERS } from "../../store/dns.db";
import { ClassType, QueryTYPE, RECURSION_AVALILABLE, ResponseCode } from "../enums";
import { DNS_Additional, DNS_Answer, DNS_Header, DNS_Question, dnsResponse, dnsResponseSteps, Resolver_Response } from "../types";
import { parseMessageHook } from "./parseMessageHook";

export const dnsQueryUDP = (serverIP: string, header: DNS_Header, question: DNS_Question, stepsArray: dnsResponse[] = [], isHttp: boolean = false): Promise<dnsResponse> => {
    return new Promise((resolve, reject) => {
        const queryMessage = Buffer.concat([
            Header.createHeader(header),
            Question.createQuestion(question),
        ]);
        const isIPv6 = serverIP.includes(':');
        const server = isIPv6 ? serverv6 : serverv4;
        console.log('Message Sending to The server:', serverIP)
        const timeout = setTimeout(() => {
            console.log(`Timeout reached for server ${serverIP}. Moving to the next server.`);
            reject(new Error(`Timeout: No response from server ${serverIP} within 2 seconds`));
        }, 2000);

        server.send(queryMessage, 0, queryMessage.length, 53, serverIP, (err) => {
            if (err) {
                console.log("Error in sending the Query to the Root server:", err);
                reject(err);
                return;
            }
        });
        server.on('message', (msg: Buffer, rinfo: { address: string; port: number }) => {
            if ((rinfo.address === serverIP && rinfo.port === 53) || (isIPv6 && rinfo.port === 53)) {
                const response: dnsResponse = parseMessageHook(msg);
                // if (isHttp) {
                // }
                resolve(response);
            }
        });
    });
};

export const resolver = async (header: DNS_Header, question: DNS_Question, stepsArray: dnsResponseSteps[] = [], isHttp: boolean = false): Promise<Resolver_Response> => {
    if (header.QR === 0) {
        try {
            let responseAnswerArray: any = [];
            const answers = dnsRecords.filter((a) => a.name === question.QNAME && a.type === question.QTYPE);
            if (answers.length) {
                answers.forEach((answer) => {
                    responseAnswerArray.push(Answer.createAnswer({
                        NAME: answer.name,
                        Type: question.QTYPE,
                        ClassCode: ClassType.IN,
                        TTL: answer.ttl,
                        RDLENGTH: question.QTYPE === QueryTYPE.AAAA ? 16 : 4,
                        RDATA: answer.value,
                    }));
                });
            } else if (header.RD && RECURSION_AVALILABLE) {
                try {
                    let recursiveAnswer = await resolveRecursively(header, question, new Set(), stepsArray, isHttp);
                    if (recursiveAnswer && recursiveAnswer.length) {
                        recursiveAnswer.forEach((recAnswer) => responseAnswerArray.push(Answer.createAnswer(recAnswer)));
                    } else {
                        return nonRecursiveResponse(header, question, ResponseCode.NAME_ERROR);
                    }
                } catch (error) {
                    return nonRecursiveResponse(header, question, ResponseCode.SERVER_ERROR);
                }
            } else {
                return nonRecursiveResponse(header, question, ResponseCode.NAME_ERROR);
            }
            const responseHeader = Header.createHeader({ ...header, QR: 1, AA: 1, RA: 1, ANCOUNT: responseAnswerArray.length });
            const responseAnswer = Buffer.concat(responseAnswerArray);
            const responseQuestion = Question.createQuestion(question);

            return { responseAnswer, responseHeader, responseQuestion };

        } catch (error) {
            console.log("Error processing DNS query:", error);
            const responseHeader = Header.createHeader({ ...header, QR: 1, AA: 1, RA: 1, RCODE: ResponseCode.SERVER_ERROR });
            const responseQuestion = Question.createQuestion(question);
            return { responseAnswer: null, responseHeader, responseQuestion };
        }
    }

    const responseHeader = Header.createHeader({ ...header, QR: 1, AA: 1, RA: 1, RCODE: ResponseCode.NOT_IMPLEMENTED });
    const responseQuestion = Question.createQuestion(question);
    return { responseAnswer: null, responseHeader, responseQuestion };
};

const resolveNameServerIPS = async (ns: string): Promise<string[]> => {
    const header: DNS_Header = {
        ID: Math.floor(Math.random() * 65535),
        QR: 0,
        OPCODE: 0,
        AA: 0,
        TC: 0,
        RD: 1,
        RA: 0,
        Z: 0,
        RCODE: 0,
        QDCOUNT: 1,
        ANCOUNT: 0,
        NSCOUNT: 0,
        ARCOUNT: 0
    };

    const question: DNS_Question = {
        QNAME: ns,
        QTYPE: QueryTYPE.A, // Type A for IPv4 address resolution
        ClassCode: ClassType.IN
    };

    const nameServerIPs: string[] = [];

    return nameServerIPs;
};


const resolveRecursively = async (header: DNS_Header, question: DNS_Question, visited: Set<string>, stepsArray: dnsResponseSteps[] = [], isHttp: boolean = false): Promise<DNS_Answer[] | null> => {
    let currServers = ROOT_SERVERS;
    let sameServer = currServers
    let i = 0;
    while (true) {
        sameServer = currServers
        for (const serverIP of currServers) {
            console.log("Recursions: ", i++)
            try {
                const response = await dnsQueryUDP(serverIP, header, question);
                stepsArray.push({ ...response, message: `Response From ${serverIP}` })
                if (response.answer && response.answer.length) {
                    if (response.answer[0].Type === QueryTYPE.CNAME && !visited.has(response.answer[0].RDATA)) {
                        visited.add(response.answer[0].RDATA);
                        return resolveRecursively(header, { ...question, QNAME: response.answer[0].RDATA }, visited, stepsArray, isHttp);
                    } else {
                        return response.answer;
                    }
                }
                else if (response.additional && response.additional.length) {
                    currServers = response.additional.map((additional: DNS_Additional) => additional.RDATA);
                    break;
                }
                else if (response.authority && response.authority.length) {
                    const nameServers = response.authority.map((a) => a.RDATA);
                    const NameServerResolverIP = await resolveRecursively(header, { ...question, QNAME: nameServers[0] }, visited, stepsArray, true)
                    const nameServerIPsArrays = NameServerResolverIP?.map((a) => a.RDATA)
                    if (nameServerIPsArrays) {
                        currServers = nameServerIPsArrays;
                        break
                    }
                    if (currServers.length === 0) continue;
                }
            } catch (error) {
                continue
            }
        }
        if (currServers === sameServer) return null
    }
};

const nonRecursiveResponse = (header: DNS_Header, question: DNS_Question, RCODE: ResponseCode): Resolver_Response => {
    const responseHeader = Header.createHeader({ ...header, QR: 1, AA: 1, RCODE });
    const responseQuestion = Question.createQuestion(question);
    return { responseAnswer: null, responseHeader, responseQuestion };
};