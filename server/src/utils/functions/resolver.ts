import { Answer } from "../../dns_packet/answer";
import { Header } from "../../dns_packet/header";
import { Question } from "../../dns_packet/question";
import dnsRecords from "../../store/dns.db";
import { ClassType, QueryTYPE, RECURSION_AVALILABLE, ResponseCode } from "../enums";
import { DNS_Answer, DNS_Header, DNS_Question } from "../types";

export const resolver = (header: DNS_Header, question: DNS_Question) => {
    if (header.QR === 0) {
        if (question.QTYPE === QueryTYPE.A && header.TC === 0) {
            if (header.RD && RECURSION_AVALILABLE) {
                try {
                    console.log("Qname: before:", question.QNAME)
                    let answer = dnsRecords.find((a) => a.name == question.QNAME)
                    console.log("answer-db", answer)
                    let responseAnswer = null
                    if (answer) {
                        let ipadderess = answer?.value
                        let responseAnswerObject: DNS_Answer = {
                            NAME: answer.name,
                            Type: QueryTYPE.A,
                            ClassCode: ClassType.IN,
                            TTL: answer.ttl,
                            RDLENGTH: 4,
                            RDATA: ipadderess
                        }
                        responseAnswer = Answer.createAnswer(responseAnswerObject)
                    }
                    else {

                        console.log("here 6")
                    }
                    let responseQuestion = Question.createQuestion(question)
                    let responseHeaderObject: DNS_Header = { ...header, QR: 1, AA: 1, RA: 1, ANCOUNT: header.QDCOUNT }
                    let responseHeader = Header.createHeader(responseHeaderObject)

                    return { responseAnswer, responseHeader, responseQuestion }
                } catch (error) {
                    console.log("here 5")
                    let responseHeaderObject: DNS_Header = { ...header, QR: 1, AA: 1, RA: 1, RCODE: ResponseCode.SERVER_ERROR }
                    let responseHeader = Header.createHeader(responseHeaderObject)
                    console.log(responseHeader)
                }
            } else {
                // non recursive code
            }
        }

    }
}