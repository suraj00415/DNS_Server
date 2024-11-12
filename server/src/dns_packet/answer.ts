import { QueryTYPE } from "../utils/enums"
import { parseNameWithCompression } from "../utils/functions/parseNameWithCompression"
import { DNS_Answer } from "../utils/types"
import { Additional } from "./additional"
import { Authority } from "./authority"

export class Answer {
    static createAnswer(value: DNS_Answer) {
        let domains = value.NAME
        let offset = 0
        let otherBuffer = Buffer.alloc(10)

        domains = domains.split('.').map((domain) => String.fromCharCode(domain.length) + domain).join('')
        otherBuffer.writeUInt16BE(value.Type, offset)
        otherBuffer.writeUInt16BE(value.ClassCode, offset += 2)
        otherBuffer.writeUInt16BE(value.TTL, offset += 4)
        otherBuffer.writeUInt16BE(value.RDLENGTH, offset += 2)
        if (value.Type === QueryTYPE.A) {
            // A Record
            const RDATA = Buffer.alloc(4)
            const octets = value.RDATA.split('.').map((a) => Number(a))
            octets.forEach((octet, rOffset) => RDATA.writeUInt8(octet, rOffset))
            return Buffer.concat([Buffer.from(domains + '\0', 'binary'), otherBuffer, RDATA])
        } else if (value.Type === QueryTYPE.AAAA) {
            // AAAA Record
            const RDATA = Buffer.alloc(16);
            const segments = value.RDATA.split(':').map((segment) => parseInt(segment, 16));
            segments.forEach((segment, rOffset) => RDATA.writeUInt16BE(segment, rOffset * 2));
            return Buffer.concat([Buffer.from(domains + '\0', 'binary'), otherBuffer, RDATA]);
        }
        else {
            // PTR Record
            const RDATA = Buffer.from(value.RDATA.split('.').map((label) => String.fromCharCode(label.length) + label).join('') + '\0', 'binary');
            return Buffer.concat([Buffer.from(domains + '\0', 'binary'), otherBuffer, RDATA])
        }
    }
    static getAnswer(msg: Buffer, offset: number, ANCOUNT: number) {
        let answers: DNS_Answer[] = [];
        for (let j = 0; j < ANCOUNT; j++) {
            const { name, newOffset } = parseNameWithCompression(msg, offset);
            offset = newOffset;
            const type = msg.readUInt16BE(offset);
            const classCode = msg.readUInt16BE(offset += 2);
            const ttl = msg.readUInt32BE(offset += 2);
            const rdlength = msg.readUInt16BE(offset += 4);
            offset += 2;
            let rdata = "";
            if (type === QueryTYPE.A) {
                rdata = Array.from(msg.slice(offset, offset + rdlength)).join('.');
            } else if (type === QueryTYPE.AAAA) {
                // Type AAAA (IPv6 address)
                let hexBytes = Array.from(msg.slice(offset, offset + rdlength))
                    .map(byte => byte.toString(16).padStart(2, '0'))
                rdata = ''
                for (let i = 0; i < hexBytes.length;) {
                    rdata += hexBytes[i] + hexBytes[i + 1]
                    if (i + 2 < hexBytes.length) {
                        rdata += ':'
                    }
                    i += 2
                }
            } else {
                const { name: Name } = parseNameWithCompression(msg, offset);
                rdata = Name;
            }
            answers.push({ NAME: name, Type: type, ClassCode: classCode, TTL: ttl, RDLENGTH: rdlength, RDATA: rdata });
            offset += rdlength;
        }
        return { answers, offset };
    }
}