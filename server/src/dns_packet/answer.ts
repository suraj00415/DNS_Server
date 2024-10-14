import { QueryTYPE } from "../utils/enums"
import { DNS_Answer } from "../utils/types"

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
        // A Record
        if (value.Type === QueryTYPE.A) {
            const RDATA = Buffer.alloc(4)
            const octets = value.RDATA.split('.').map((a) => Number(a))
            octets.forEach((octet, rOffset) => RDATA.writeUInt8(octet, rOffset))
            return Buffer.concat([Buffer.from(domains + '\0', 'binary'), otherBuffer, RDATA])
        }
        else {
            // PTR Record
            const RDATA = Buffer.from(value.RDATA.split('.').map((label) => String.fromCharCode(label.length) + label).join('') + '\0', 'binary');
            return Buffer.concat([Buffer.from(domains + '\0', 'binary'), otherBuffer, RDATA])
        }
    }
}