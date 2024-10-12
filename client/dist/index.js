"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
// Create a UDP client socket
const client = dgram_1.default.createSocket('udp4');
// Send a message to the server
const message = Buffer.from('Hello, UDP server!');
client.send(message, 4001, 'localhost', (err) => {
    if (err) {
        console.error(err);
        client.close();
    }
    else {
        console.log('Message sent to server!');
    }
});
// Close the client after 2 seconds
setTimeout(() => {
    client.close();
}, 2000);
