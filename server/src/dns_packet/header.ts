export enum ResponseCode {
    NO_ERROR = 0,
    Format_ERROR = 1,
    SERVER_ERROR = 2,
    NAME_ERROR = 3,
    NOT_IMPLEMENTED = 4,
    REFUSED = 5
}

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

export class Header {
    static createHeader(value: DNS_Header) {
        const headerBuffer = Buffer.alloc(12)
        let offset = 0
        headerBuffer.writeUInt16BE(value.ID, offset)
        let flags = (value.QR << 15) | (value.OPCODE << 11) | (value.AA << 10) | (value.TC << 9) | (value.RD << 8) | (value.RA << 7) | (value.Z << 4) | (value.RCODE)
        headerBuffer.writeUInt16BE(flags, offset += 2)
        headerBuffer.writeUInt16BE(value.QDCOUNT, offset += 2)
        headerBuffer.writeUInt16BE(value.ANCOUNT, offset += 2)
        headerBuffer.writeUInt16BE(value.NSCOUNT, offset += 2)
        headerBuffer.writeUInt16BE(value.ARCOUNT, offset += 2)
        return headerBuffer
    }
}
