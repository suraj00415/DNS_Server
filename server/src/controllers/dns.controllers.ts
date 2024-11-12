import { Request, Response } from "express";
import { Header } from "../dns_packet/header";
import { Question } from "../dns_packet/question";
import { ClassType, QueryTYPE } from "../utils/enums";
import { messageSolver } from "../utils/functions/messageSolver";
import { DNS_Header, DNS_Question, dnsResponse, dnsResponseSteps } from "../utils/types";
import { parseMessageHook } from "../utils/functions/parseMessageHook";

export const dnsRequestController = async (req: Request, res: Response) => {
    let domain = req?.body?.domain;
    if (!domain && !domain?.length) {
        res.status(401).json({
            error: "Domain Required"
        })
    }
    const headerPacket: DNS_Header = {
        ID: 1,
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
        ARCOUNT: 0,
    };
    const questionPacket: DNS_Question = {
        QNAME: domain,
        ClassCode: ClassType.IN,
        QTYPE: QueryTYPE.A
    }

    const h = Header.createHeader(headerPacket)
    const q = Question.createQuestion(questionPacket)
    const query = Buffer.concat([h, q])
    let stepsArray: dnsResponseSteps[] = []
    try {
        const responseData = await messageSolver(Buffer.from(query), stepsArray, true);
        if (responseData && Array.isArray(responseData)) {
            const responseConcat = Buffer.concat(responseData);
            const response = parseMessageHook(responseConcat);
            if (stepsArray.length == 0) {
                stepsArray.push({ ...response, message: "Cannot Resolve Ip Address" })
            }
            if (stepsArray.length === 1) {
                stepsArray[0] = { ...stepsArray[0], message: "Response from Local Cache" }
            }
            res.status(200).json({ data: stepsArray });
        } else {
            res.status(500).json({ error: "Invalid response format" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to resolve DNS query" });
    }
}