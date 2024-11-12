import dgram from 'dgram'
import { Header } from './dns_packet/header';
import { DNS_Answer, DNS_Header, DNS_Question } from './utils/types';
import { ClassType, QueryTYPE } from './utils/enums';
import { Question } from './dns_packet/question';
import { Answer } from './dns_packet/answer';
import { messageSolver } from './utils/functions/messageSolver';
import { parseMessageHook } from './utils/functions/parseMessageHook';
import { app } from './utils/express.server';


export const serverv4 = dgram.createSocket('udp4')
export const serverv6 = dgram.createSocket('udp6');


// const headerPacket: DNS_Header = {
//     ID: 1,
//     QR: 0,
//     OPCODE: 0,
//     AA: 0,
//     TC: 0,
//     RD: 0,
//     RA: 0,
//     Z: 0,
//     RCODE: 0,
//     QDCOUNT: 1,
//     ANCOUNT: 0,
//     NSCOUNT: 0,
//     ARCOUNT: 0,
// };
// const answerPacket: DNS_Answer = {
//     ClassCode: ClassType.IN,
//     NAME: 'google.com',
//     TTL: 230,
//     RDATA: '8.8.8.8',
//     RDLENGTH: 4,
//     Type: QueryTYPE.A
// }
// const questionPacket: DNS_Question = {
//     QNAME: "accounts.youtube.com",
//     ClassCode: ClassType.IN,
//     QTYPE: QueryTYPE.A
// }

// const h = Header.createHeader(headerPacket)
// const q = Question.createQuestion(questionPacket)
// const a = Answer.createAnswer(answerPacket)

// console.log("Header: ", h)
// console.log("Question: ", q)
// console.log("Answer: ", a)



// server.on('message', messageHandler)

// server.on('message', (msg, rinfo) => {
//     console.log("HERE:",msg)
//     const response = parseMessageHook(Buffer.from(msg));
// })


// server.on('listening', () => {
//     const address = server.address();
//     // const message = Buffer.concat([h, q])
//     // server.send(message, 53, '8.8.8.8', (err) => {
//     //     if (err) console.log('Error sending response:', err);
//     //     else console.log('Response sent');
//     // })
//     console.log(`Server is listening at ${address.address}:${address.port}`);
// });

const messageHandler = async (msg: any, rinfo: any) => {
    console.log(`Server got: ${Buffer.from(msg)} from ${rinfo.address}:${rinfo.port}`);
    const isQuestion = parseMessageHook(Buffer.from(msg))
    if (isQuestion.header.QR === 0) {
        const response = await messageSolver(Buffer.from(msg));
        if (response && response?.length > 1 && response[0] !== undefined) {
            const responseBuffer = Buffer.concat(response);
            console.log("RESPONSE BUFFER", responseBuffer)
            serverv4.send(responseBuffer, 0, responseBuffer?.length, rinfo.port, rinfo.address, (err) => {
                if (err) console.log('Error sending response:', err);
                else console.log('Response sent');
            });
        }
    }
}

serverv4.on('message', messageHandler);
serverv4.on('listening', () => {
    const address = serverv4.address();
    console.log(`IPv4 Server is listening at ${address.address}:${address.port}`);
});
serverv6.on('listening', () => {
    const address = serverv6.address();
    console.log(`IPv6 Server is listening at ${address.address}:${address.port}`);
});


serverv6.bind(53, '::');
serverv4.bind(53, '0.0.0.0');

const appPort = 3001

app.listen(appPort, () => {
    console.log("Server Started On Port:", appPort)
})