import { Header } from "../../dns_packet/header";
import { Question } from "../../dns_packet/question";
import { DNS_Question } from "../types";
import { resolver } from "./resolver";

export const parseMessage = (msg: Buffer) => {
    let header = Header.getHeader(msg.slice(0, 12))
    console.log("Header: ", header)
    let questions: DNS_Question[] = Question.getQuestion(msg, header.QDCOUNT, 12)
    console.log("Questions:", questions)
    let response: any = []
    questions.forEach((question, index) => {
        let a = resolver(header, question)
        if (index === 0) {
            response.push(a?.responseHeader)
            response.push(a?.responseQuestion)
        }
        response.push(a?.responseAnswer)
    })
    console.log("REsopnse:", response)
    return response
}