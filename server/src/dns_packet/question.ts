enum QueryTYPE {
    A = 1,
    AAAA = 28,
    MX = 15,
    CNAME = 5,
    NS = 2,
}

interface DNS_Question {
    QNAME: string,
    QTYPE: QueryTYPE,
    ClassCode: number
}

