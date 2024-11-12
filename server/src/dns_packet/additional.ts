import { parseNameWithCompression } from "../utils/functions/parseNameWithCompression";
import { DNS_Additional } from "../utils/types";

export class Additional {
    static getAdditional(msg: Buffer, offset: number, ARCOUNT: number): DNS_Additional[] {
        let additionals: DNS_Additional[] = [];
        for (let i = 0; i < ARCOUNT; i++) {
            const { name, newOffset } = parseNameWithCompression(msg, offset);
            offset = newOffset;
            const type = msg.readUInt16BE(offset);
            const classCode = msg.readUInt16BE(offset += 2);
            const ttl = msg.readUInt32BE(offset += 4);
            const rdlength = msg.readUInt16BE(offset += 2);
            offset += 2;
            let rdata;
            if (type === 1) {
                // Type A (IPv4 address)
                rdata = msg.slice(offset, offset + rdlength).join('.');
            } else if (type === 28) {
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
                const parsedName = parseNameWithCompression(msg, offset);
                rdata = parsedName.name;
            }
            offset += rdlength;
            additionals.push({
                NAME: name,
                Type: type,
                Class: classCode,
                TTL: ttl,
                RDLENGTH: rdlength,
                RDATA: rdata
            });
        }
        return additionals;
    }

}
