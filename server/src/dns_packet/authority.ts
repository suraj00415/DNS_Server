import { parseNameWithCompression } from "../utils/functions/parseNameWithCompression";
import { DNS_Authority } from "../utils/types";
import { Additional } from "./additional";

export class Authority {
    static getAuthority(msg: Buffer, offset: number, nsCount: number) {
        let authorities: DNS_Authority[] = [];

        for (let i = 0; i < nsCount; i++) {
            const { name, newOffset } = parseNameWithCompression(msg, offset);
            offset = newOffset;
            const type = msg.readUInt16BE(offset);
            const classCode = msg.readUInt16BE(offset += 2);
            const ttl = msg.readUInt32BE(offset += 4);
            const rdlength = msg.readUInt16BE(offset += 2);
            offset += 2
            const { name: rdata } = parseNameWithCompression(msg, offset);
            offset = offset + rdlength;
            authorities.push({ NAME: name, Type: type, Class: classCode, TTL: ttl, RDLENGTH: rdlength, RDATA: rdata });
        }
        return { authorities, offset };
    }
}
