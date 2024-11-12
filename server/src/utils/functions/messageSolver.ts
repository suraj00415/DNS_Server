import { dnsResponse, dnsResponseSteps } from "../types";
import { parseMessageHook } from "./parseMessageHook";
import { resolver } from "./resolver";

export const messageSolver = async (msg: Buffer, stepsArray: dnsResponseSteps[] = [], isHttp: boolean = false) => {
    const message = parseMessageHook(msg)
    let response: any = []
    await Promise.all(message.question.map(async (question, index) => {
        let a = await resolver(message.header, question,stepsArray,isHttp)
        if (index === 0) {
            response.push(a?.responseHeader)
            response.push(a?.responseQuestion)
        }
        if (a?.responseAnswer) {
            response.push(a?.responseAnswer)
        }
    }))
    return response
}