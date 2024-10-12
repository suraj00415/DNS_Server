import dgram from 'dgram'

const server = dgram.createSocket('udp4')

const buf = Buffer.from([72, 101, 108, 108, 111]);
console.log(buf); 


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