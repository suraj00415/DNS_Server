import dgram from 'dgram'
import { Header } from './dns_packet/header';
import { DNS_Answer, DNS_Header, DNS_Question } from './utils/types';
import { ClassType, QueryTYPE } from './utils/enums';
import { Question } from './dns_packet/question';
import { Answer } from './dns_packet/answer';
import { parseMessage } from './utils/functions/parseMessage';

const server = dgram.createSocket('udp4')

const headerPacket: DNS_Header = {
    ID: 1234,
    QR: 1,
    OPCODE: 0,
    AA: 0,
    TC: 0,
    RD: 0,
    RA: 0,
    Z: 0,
    RCODE: 0,
    QDCOUNT: 0,
    ANCOUNT: 0,
    NSCOUNT: 0,
    ARCOUNT: 0,
};
const answerPacket: DNS_Answer = {
    ClassCode: ClassType.IN,
    NAME: 'google.com',
    TTL: 230,
    RDATA: '8.8.8.8',
    RDLENGTH: 4,
    Type: QueryTYPE.A
}
const questionPacket: DNS_Question = {
    QNAME: "google.com",
    ClassCode: ClassType.IN,
    QTYPE: QueryTYPE.A
}

const h = Header.createHeader(headerPacket)
const q = Question.createQuestion(questionPacket)
const a = Answer.createAnswer(answerPacket)

console.log("Header: ", h)
console.log("Question: ", q)
console.log("Answer: ", a)

server.on('message', (msg, rinfo) => {
    console.log(`Server got: ${Buffer.from(msg)} from ${rinfo.address}:${rinfo.port}`);
    const response = parseMessage(Buffer.from(msg));
    
    // Concatenate the DNS response message (header + question + answer)
    if (response && response?.length > 1 && response[0] !== undefined) {
        const responseBuffer = Buffer.concat(response);
        // Send the response to the client (nslookup)
        console.log("RESPONSE BUFFER",responseBuffer)
        server.send(responseBuffer, 0, responseBuffer?.length, rinfo.port, rinfo.address, (err) => {
            if (err) console.log('Error sending response:', err);
            else console.log('Response sent');
        });
    }

})


server.on('listening', () => {
    const address = server.address();
    console.log(`Server is listening at ${address.address}:${address.port}`);
});

server.bind(53, '127.0.0.1', () => {
    console.log("Server Started at 53")
})