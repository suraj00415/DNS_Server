export enum ResponseCode {
    NO_ERROR = 0,
    Format_ERROR = 1,
    SERVER_ERROR = 2,
    NAME_ERROR = 3,
    NOT_IMPLEMENTED = 4,
    REFUSED = 5
}

export enum QueryTYPE {
    A = 1,
    NS = 2,
    MD = 3,
    MF = 4,
    CNAME = 5,
    SOA = 6,
    MB = 7,
    MG = 8,
    MR = 9,
    NULL = 10,
    WKS = 11,
    PTR = 12,
    HINFO = 13,
    MINFO = 14,
    MX = 15,
    TXT = 16,
    AAAA = 29,
}

export enum ClassType {
    IN = 1,
    CS = 2,
    CH = 3,
    HS = 4,
}

export const RECURSION_AVALILABLE = 1