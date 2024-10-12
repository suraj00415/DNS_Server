export enum QueryTYPE {
    A = 0,
    NS = 1,
    MD = 2,
    MF = 3,
    CNAME = 4,
    SOA = 5,
    MB = 6,
    MG = 7,
    MR = 8,
    NULL = 9,
    WKS = 10,
    PTR = 11,
    HINFO = 12,
    MINFO = 13,
    MX = 14,
    TXT = 15,
    AAAA = 28,
}

export enum ClassType {
    IN = 0,
    CS = 1,
    CH = 2,
    HS = 3,
}

export interface DNS_Question {
    QNAME: string,
    QTYPE: QueryTYPE,
    ClassCode: ClassType
}

export class Question {
    static createQuestion(value: DNS_Question) {
        let domains = value.QNAME
        const typeBuffer = Buffer.alloc(4)
        domains = domains.split('.').map((domain) => String.fromCharCode(domain.length) + domain).join('')
        typeBuffer.writeUInt16BE(value.QTYPE, 0)
        typeBuffer.writeUInt16BE(value.ClassCode, 2)
        return Buffer.concat([Buffer.from(domains + '\0', 'binary'), typeBuffer])
    }
}