import { Additional } from "../../dns_packet/additional";
import { Answer } from "../../dns_packet/answer";
import { Authority } from "../../dns_packet/authority";
import { Header } from "../../dns_packet/header";
import { Question } from "../../dns_packet/question";
import { DNS_Additional, DNS_Answer, DNS_Authority, DNS_Question, dnsResponse } from "../types";

export const parseMessageHook = (msg: Buffer): dnsResponse => {
    let offset = 12;
    let header = Header.getHeader(msg.slice(0, offset));
    console.log("Header:", header);

    let questions: { questions: DNS_Question[], offset: number } = Question.getQuestion(msg, header.QDCOUNT, offset);
    console.log("Questions:", questions.questions);
    offset = questions.offset;

    let answers: { answers: DNS_Answer[], offset: number } | undefined;
    if (header.ANCOUNT) {
        answers = Answer.getAnswer(msg, offset, header.ANCOUNT);
        console.log("Answers:", answers.answers);
        offset = answers.offset;
    }

    let authority: { authorities: DNS_Authority[], offset: number } | undefined;
    if (header.NSCOUNT) {
        authority = Authority.getAuthority(msg, offset, header.NSCOUNT);
        console.log("Authority:", authority.authorities);
        offset = authority.offset;
    }

    let additional: DNS_Additional[] | undefined
    if (header.ARCOUNT) {
        additional = Additional.getAdditional(msg, offset, header.ARCOUNT);
        console.log("Additional:", additional);
    }

    return {
        header,
        question: questions.questions,
        answer: answers?.answers || [],
        authority: authority?.authorities || [],
        additional: additional || []
    };
};
