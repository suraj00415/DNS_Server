import { ClassType, QueryTYPE, ResponseCode } from "./enums";

export interface DNS_Header {
    ID: number,
    QR: number,
    OPCODE: number,
    AA: number,
    TC: number,
    RD: number,
    RA: number,
    Z: number,
    RCODE: ResponseCode,
    QDCOUNT: number,
    ANCOUNT: number,
    NSCOUNT: number,
    ARCOUNT: number
}

export interface DNS_Question {
    QNAME: string,
    QTYPE: QueryTYPE,
    ClassCode: ClassType
}

export interface DNS_Answer {
    NAME: string,
    Type: QueryTYPE,
    ClassCode: ClassType,
    TTL: number,
    RDLENGTH: number,
    RDATA: string;
}

export interface DNS_Authority {
    NAME: string,
    Type: QueryTYPE,
    Class: ClassType,
    TTL: number,
    RDLENGTH: number,
    RDATA: string
}

export interface DNS_Additional {
    NAME: string,
    Type: QueryTYPE,
    Class: ClassType,
    TTL: number,
    RDLENGTH: number,
    RDATA: string
}

export interface dnsResponse {
    data: {
        header: DNS_Header,
        question: DNS_Question[],
        answer: DNS_Answer[] | null,
        authority: DNS_Authority[] | null,
        additional: DNS_Additional[] | null
    }
}
export interface dnsResponseMain {
    data: {
        header: DNS_Header,
        question: DNS_Question[],
        answer: DNS_Answer[] | null,
        authority: DNS_Authority[] | null,
        additional: DNS_Additional[] | null,
        message: string
    }[]
}
export interface simpleDnsResponse {
    header: DNS_Header,
    question: DNS_Question[],
    answer: DNS_Answer[] | null,
    authority: DNS_Authority[] | null,
    additional: DNS_Additional[] | ,
    message:string
}