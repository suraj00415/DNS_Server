export function parseNameWithCompression(msg: Buffer, offset: number): { name: string, newOffset: number } {
    let nameArray = [];
    let jumped = false;
    let offsetTemp = offset;
    let jumpedOffset = 0;

    while (msg[offsetTemp] !== 0) {
        const labelLength = msg.readUInt8(offsetTemp);
        if ((labelLength & 0xC0) === 0xC0) { // Compression pointer
            if (!jumped) {
                jumpedOffset = offsetTemp + 2;
            }
            offsetTemp = msg.readUInt16BE(offsetTemp) & 0x3FFF;
            jumped = true;
        } else {
            offsetTemp++;
            const label = msg.slice(offsetTemp, offsetTemp + labelLength).toString('ascii');
            nameArray.push(label);
            offsetTemp += labelLength;
        }
    }

    const newOffset = jumped ? jumpedOffset : offsetTemp + 1;
    return { name: nameArray.join('.'), newOffset };
}
