import { DNS_Question } from "../utils/types"

export class Question {
    static createQuestion(value: DNS_Question) {
        let domains = value.QNAME
        const typeBuffer = Buffer.alloc(4)
        domains = domains.split('.').map((domain) => String.fromCharCode(domain.length) + domain).join('')
        typeBuffer.writeUInt16BE(value.QTYPE, 0)
        typeBuffer.writeUInt16BE(value.ClassCode, 2)
        return Buffer.concat([Buffer.from(domains + '\0', 'binary'), typeBuffer])
    }
    static getQuestion(msg: Buffer, QDCOUNT: number, offset: number) {
        let questions: DNS_Question[] = []  
        for (let i = 0; i < QDCOUNT; i++) {
            let qname = '';
            while (msg[offset] !== 0) {
                const labelLength = msg[offset];
                offset++;
                qname += msg.slice(offset, offset + labelLength).toString('ascii') + '.';
                offset += labelLength;
            }
            qname = qname.slice(0, qname.length - 1)
            offset++;
            const qtype = msg.readUInt16BE(offset);
            const qclass = msg.readUInt16BE(offset += 2);
            let question: DNS_Question = { ClassCode: qclass, QNAME: qname, QTYPE: qtype }
            questions.push(question)
        }
        return questions
    }
}