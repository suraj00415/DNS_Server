import dgram from 'dgram';

// Create a UDP client socket
const client = dgram.createSocket('udp4');

const message = Buffer.from('Hello, UDP server!');


client.send(message, 4001, 'localhost', (err) => {
    if (err) {
        console.error(err);
        client.close();
    } else {
        console.log('Message sent to server!');
    }
});

setTimeout(() => {
    client.close();
}, 2000);
