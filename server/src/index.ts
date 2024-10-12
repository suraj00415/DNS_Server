import dgram from 'dgram'
import { DNS_Header, Header } from './dns_packet/header';
import { ClassType, DNS_Question, QueryTYPE, Question } from './dns_packet/question';

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

const h = Header.createHeader(headerPacket)
const questionPacket: DNS_Question = {
    QNAME: "google.com",
    ClassCode: ClassType.IN,
    QTYPE: QueryTYPE.A
}

const q = Question.createQuestion(questionPacket)
console.log("Header: ",h)
console.log("Question: ",q)

server.on('message', (msg, rinfo) => {
    console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
})

server.on('listening', () => {
    const address = server.address();
    console.log(`Server is listening at ${address.address}:${address.port}`);
});

server.bind(4001, '127.0.0.1', () => {
    console.log("Server Started at 4001")
})