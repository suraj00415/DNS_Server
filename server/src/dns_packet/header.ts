import { DNS_Header } from "../utils/types"

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
    static getHeader(msg: Buffer) {
        let offset = 0;
        const id = msg.readUInt16BE(offset);
        const flags = msg.readUInt16BE(offset += 2);
        const qdcount = msg.readUInt16BE(offset += 2);
        const ancount = msg.readUInt16BE(offset += 2);
        const nscount = msg.readUInt16BE(offset += 2);
        const arcount = msg.readUInt16BE(offset += 2);
        offset += 2;
        let FLAGS = flags.toString(2).padStart(16, '0')
        let qr = Number(FLAGS[0])
        let opcode = Number(FLAGS.slice(1, 5))
        let aa = Number(FLAGS[5])
        let tc = Number(FLAGS[6])
        let rd = Number(FLAGS[7])
        let ra = Number(FLAGS[8])
        let z = Number(FLAGS.slice(9, 12))
        let rcode = Number(FLAGS.slice(12))
        let header: DNS_Header = {
            ID: id,
            QR: qr,
            OPCODE: opcode,
            AA: aa,
            TC: tc,
            RD: rd,
            RA: ra,
            Z: z,
            RCODE: rcode,
            QDCOUNT: qdcount,
            ANCOUNT: ancount,
            NSCOUNT: nscount,
            ARCOUNT: arcount
        }
        return header
    }
}
