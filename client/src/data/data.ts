import { ClassType, QueryTYPE, ResponseCode } from "@/types/enums";
import { dnsResponse, dnsResponseMain } from "@/types/types";

export const Data: dnsResponse = {
    data: {
        header: {
            ID: 1,
            QR: 1,
            OPCODE: 0,
            AA: 1,
            TC: 0,
            RD: 1,
            RA: 1,
            Z: 0,
            RCODE: 0,
            QDCOUNT: 1,
            ANCOUNT: 3,
            NSCOUNT: 0,
            ARCOUNT: 0
        },
        question: [
            {
                ClassCode: 1,
                QNAME: "codeforces.com",
                QTYPE: 1
            }
        ],
        answer: [
            {
                NAME: "codeforces.com",
                Type: 1,
                ClassCode: 1,
                TTL: 239,
                RDLENGTH: 4,
                RDATA: "104.26.6.164"
            },
            {
                NAME: "codeforces.com",
                Type: 1,
                ClassCode: 1,
                TTL: 239,
                RDLENGTH: 4,
                RDATA: "104.26.7.164"
            },
            {
                NAME: "codeforces.com",
                Type: 1,
                ClassCode: 1,
                TTL: 239,
                RDLENGTH: 4,
                RDATA: "172.67.68.254"
            }
        ],
        authority: [],
        additional: []
    }
};


export const data: dnsResponseMain = {
    data: [
        {
            header: {
                ID: 1,
                QR: 1,
                OPCODE: 0,
                AA: 0,
                TC: 1,
                RD: 1,
                RA: 0,
                Z: 0,
                RCODE: ResponseCode.NO_ERROR,
                QDCOUNT: 1,
                ANCOUNT: 0,
                NSCOUNT: 13,
                ARCOUNT: 11
            },
            question: [
                {
                    ClassCode: ClassType.IN,
                    QNAME: "tryhackme.com",
                    QTYPE: QueryTYPE.A
                }
            ],
            answer: [],
            authority: [
                {
                    NAME: "com",
                    Type: QueryTYPE.NS,
                    Class: ClassType.IN,
                    TTL: 2734686228,
                    RDLENGTH: 20,
                    RDATA: "l.gtld-servers.net"
                },
                {
                    NAME: "com",
                    Type: QueryTYPE.NS,
                    Class: ClassType.IN,
                    TTL: 2734686212,
                    RDLENGTH: 4,
                    RDATA: "j.gtld-servers.net"
                },
                // ...other authorities
            ],
            additional: [
                {
                    NAME: "l.gtld-servers.net",
                    Type: QueryTYPE.A,
                    Class: ClassType.IN,
                    TTL: 2734686212,
                    RDLENGTH: 4,
                    RDATA: "192.41.162.30"
                },
                {
                    NAME: "l.gtld-servers.net",
                    Type: QueryTYPE.AAAA,
                    Class: ClassType.IN,
                    TTL: 2734686224,
                    RDLENGTH: 16,
                    RDATA: "2001:0500:d937:0000:0000:0000:0000:0030"
                },
                // ...other additional records
            ]
        },
        {
            header: {
                ID: 1,
                QR: 1,
                OPCODE: 0,
                AA: 0,
                TC: 0,
                RD: 1,
                RA: 0,
                Z: 0,
                RCODE: ResponseCode.NO_ERROR,
                QDCOUNT: 1,
                ANCOUNT: 0,
                NSCOUNT: 2,
                ARCOUNT: 12
            },
            question: [
                {
                    ClassCode: ClassType.IN,
                    QNAME: "tryhackme.com",
                    QTYPE: QueryTYPE.A
                }
            ],
            answer: [],
            authority: [
                {
                    NAME: "tryhackme.com",
                    Type: QueryTYPE.NS,
                    Class: ClassType.IN,
                    TTL: 2734686228,
                    RDLENGTH: 20,
                    RDATA: "kip.ns.cloudflare.com"
                },
                {
                    NAME: "tryhackme.com",
                    Type: QueryTYPE.NS,
                    Class: ClassType.IN,
                    TTL: 2734686214,
                    RDLENGTH: 6,
                    RDATA: "uma.ns.cloudflare.com"
                }
            ],
            additional: [
                {
                    NAME: "kip.ns.cloudflare.com",
                    Type: QueryTYPE.A,
                    Class: ClassType.IN,
                    TTL: 2734686212,
                    RDLENGTH: 4,
                    RDATA: "108.162.193.128"
                },
                // ...other additional records
            ]
        },
        {
            header: {
                ID: 1,
                QR: 1,
                OPCODE: 0,
                AA: 1,
                TC: 0,
                RD: 1,
                RA: 0,
                Z: 0,
                RCODE: ResponseCode.NO_ERROR,
                QDCOUNT: 1,
                ANCOUNT: 3,
                NSCOUNT: 0,
                ARCOUNT: 0
            },
            question: [
                {
                    ClassCode: ClassType.IN,
                    QNAME: "tryhackme.com",
                    QTYPE: QueryTYPE.A
                }
            ],
            answer: [
                {
                    NAME: "tryhackme.com",
                    Type: QueryTYPE.A,
                    ClassCode: ClassType.IN,
                    TTL: 300,
                    RDLENGTH: 4,
                    RDATA: "104.22.55.228"
                },
                {
                    NAME: "tryhackme.com",
                    Type: QueryTYPE.A,
                    ClassCode: ClassType.IN,
                    TTL: 300,
                    RDLENGTH: 4,
                    RDATA: "104.22.54.228"
                },
                {
                    NAME: "tryhackme.com",
                    Type: QueryTYPE.A,
                    ClassCode: ClassType.IN,
                    TTL: 300,
                    RDLENGTH: 4,
                    RDATA: "104.22.54.228"
                },
                {
                    NAME: "tryhackme.com",
                    Type: QueryTYPE.A,
                    ClassCode: ClassType.IN,
                    TTL: 300,
                    RDLENGTH: 4,
                    RDATA: "104.22.54.228"
                },
                {
                    NAME: "tryhackme.com",
                    Type: QueryTYPE.A,
                    ClassCode: ClassType.IN,
                    TTL: 300,
                    RDLENGTH: 4,
                    RDATA: "104.22.54.228"
                },
                {
                    NAME: "tryhackme.com",
                    Type: QueryTYPE.A,
                    ClassCode: ClassType.IN,
                    TTL: 300,
                    RDLENGTH: 4,
                    RDATA: "104.22.54.228"
                },
                {
                    NAME: "tryhackme.com",
                    Type: QueryTYPE.A,
                    ClassCode: ClassType.IN,
                    TTL: 300,
                    RDLENGTH: 4,
                    RDATA: "104.22.54.228"
                },
                {
                    NAME: "tryhackme.com",
                    Type: QueryTYPE.A,
                    ClassCode: ClassType.IN,
                    TTL: 300,
                    RDLENGTH: 4,
                    RDATA: "172.67.27.10"
                }
            ],
            authority: [],
            additional: []
        }
    ]
};
