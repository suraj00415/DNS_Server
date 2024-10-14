import { ClassType, QueryTYPE, ResponseCode } from "./enums"

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