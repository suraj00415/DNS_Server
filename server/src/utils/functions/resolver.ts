import { Answer } from "../../dns_packet/answer";
import { Header } from "../../dns_packet/header";
import { Question } from "../../dns_packet/question";
import dnsRecords from "../../store/dns.db";
import { ClassType, CURRENT_DOMAIN, QueryTYPE, RECURSION_AVALILABLE, ResponseCode } from "../enums";
import { DNS_Answer, DNS_Header, DNS_Question } from "../types";

export const resolver = (header: DNS_Header, question: DNS_Question) => {
    if (header.QR === 0) {
        if (question.QTYPE === QueryTYPE.A && header.TC === 0) {
            try {
                let answers = dnsRecords.filter((a) => a.name == question.QNAME && a.type === 'A')
                console.log("answer-db", answers)
                let responseAnswerArray: any = []
                if (answers.length) {
                    // ip address in the cache
                    answers.forEach((answer) => {
                        let responseAnswerObject: DNS_Answer = {
                            NAME: answer.name,
                            Type: QueryTYPE.A,
                            ClassCode: ClassType.IN,
                            TTL: answer.ttl,
                            RDLENGTH: 4,
                            RDATA: answer.value
                        }
                        responseAnswerArray.push(Answer.createAnswer(responseAnswerObject))
                    })
                }
                else if (header.RD && RECURSION_AVALILABLE) {
                    // ip address not there in the cache so recursive calls.......
                    console.log("Domain IP NOT FOUND AND RA is there")
                }
                else {
                    // non recursive code here
                    console.log("Domain IP Not Found and RA not there ")
                    let responseQuestion = Question.createQuestion(question)
                    let responseHeaderObject: DNS_Header = { ...header, QR: 1, AA: 1, RCODE: ResponseCode.NAME_ERROR }
                    let responseHeader = Header.createHeader(responseHeaderObject)
                    return { responseAnswer: null, responseHeader, responseQuestion }
                }
                let responseQuestion = Question.createQuestion(question)
                let responseHeaderObject: DNS_Header = { ...header, QR: 1, AA: 1, RA: 1, ANCOUNT: answers.length }
                let responseHeader = Header.createHeader(responseHeaderObject)
                if (!responseAnswerArray) {
                    return { responseAnswer: null, responseHeader, responseQuestion }
                }
                let responseAnswer = Buffer.concat(responseAnswerArray)
                return { responseAnswer, responseHeader, responseQuestion }
            } catch (error) {
                console.log("Error in A record :", error)
                let responseHeaderObject: DNS_Header = { ...header, QR: 1, AA: 1, RA: 1, RCODE: ResponseCode.SERVER_ERROR }
                let responseHeader = Header.createHeader(responseHeaderObject)
                console.log(responseHeader)
            }

        }
        else if (question.QTYPE === QueryTYPE.PTR) {
            let responseHeaderObject: DNS_Header = {
                ...header,
                QR: 1,
                ANCOUNT: 1
            }
            let responseHeader = Header.createHeader(responseHeaderObject)
            let responseQuestion = Question.createQuestion(question)
            let length = 0
            CURRENT_DOMAIN.split('.').map((a) => {
                length = length + 1 + a.length
            })
            let responseAnswerObject: DNS_Answer = {
                ClassCode: ClassType.IN,
                NAME: question.QNAME,
                TTL: 0,
                Type: QueryTYPE.PTR,
                RDATA: CURRENT_DOMAIN,
                RDLENGTH: length
            }
            let responseAnswer = Answer.createAnswer(responseAnswerObject)
            return { responseAnswer, responseHeader, responseQuestion }
        }
        else if (question.QTYPE === QueryTYPE.AAAA && header.TC === 0) {
            if (header.RD && RECURSION_AVALILABLE) {
                let a = dnsRecords.find((a) => a.name === question.QNAME && a.type === 'AAAA')
                // let responseHeaderObject:DNS_Header={
                //     QR:1,

                // }
                // let responseHeader=Header.createHeader()
            }
        }
    }
}