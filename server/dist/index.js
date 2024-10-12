"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
const server = dgram_1.default.createSocket('udp4');
const buf = Buffer.from([72, 101, 108, 108, 111]);
console.log(buf);
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
