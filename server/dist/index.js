"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
const server = dgram_1.default.createSocket('udp4');
const packet = {
    qr: 1,
    opcode: 0,
    aa: 0,
    tc: 0,
    rd: 0,
    ra: 0,
    z: 0,
    rcode: 0,
};
const flags = (packet.qr << 15) |
    (packet.opcode << 11) |
    (packet.aa << 10) |
    (packet.tc << 9) |
    (packet.rd << 8) |
    (packet.ra << 7) |
    packet.z |
    packet.rcode;
console.log("Ans:", flags.toString(2).padStart(16, '0'));
console.log("Simple Ans:", flags);
const buff = Buffer.alloc(2);
buff.writeUInt16BE(32768);
console.log("Answer:", buff);
console.log("Simple Answer:", buff.toString('hex'));
server.on('message', (msg, rinfo) => {
    console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
server.on('listening', () => {
    const address = server.address();
    console.log(`Server is listening at ${address.address}:${address.port}`);
});
server.bind(4001, '127.0.0.1', () => {
    console.log("Server Started at 4001");
});
