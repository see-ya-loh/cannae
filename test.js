const protobuf = require('protobufjs');
const fs = require('fs');
const deepdiff = require('deep-diff').diff;

/* var root = protobuf.loadSync("./proto/cannae_protocol.proto");
var cannae_proto_request = root.lookupType("Cannae.Protocol.Request");
var cannae_proto_response = root.lookupType("Cannae.Protocol.Response");

function decodeProto(base64String, isRequest = true) {
    var buffer = Buffer.from(base64String, "base64");
    var message = isRequest ? cannae_proto_request.decode(buffer) : cannae_proto_response.decode(buffer);
    return message;
}

function encodeProto(message, isRequest = true) {
    var MessageType = isRequest ? cannae_proto_request : cannae_proto_response;
    var msg = MessageType.fromObject(JSON.parse(message));
    console.log("Message object:", JSON.stringify(msg.toJSON(), null, 2));
    const encoded = MessageType.encode(msg).finish();
    console.log("Encoded buffer:", Buffer.from(encoded));
    return Buffer.from(encoded).toString("base64");
} */
/* 
const data = fs.readFileSync('response.bin'); // make sure it's the binary file

protobuf.load('./proto/cannae_protocol.proto', (err, root) => {
    if (err) throw err;
    var ReqUserRegister = root.lookupType('Cannae.Protocol.MultipleResponse');

    for (let offset = 0; offset <= 20; offset++) {
        try {
            const sliced = data.slice(offset);
            const message = ReqUserRegister.decode(sliced);
            console.log(`✅ Success at offset ${offset}:`, JSON.stringify(message, null, 2));
            break;
        } catch(e) {
            console.log(`❌ Offset ${offset}: ${e.message}`);
        }
    }
}); */

/* const data = fs.readFileSync('response.json', 'utf8'); // make sure it's the JSON file
protobuf.load('./proto/cannae_protocol.proto', (err, root) => {
    if (err) throw err;
    var ResponseType = root.lookupType('Cannae.Protocol.Response');
    var message = ResponseType.fromObject(JSON.parse(data));
    const json = JSON.parse(data);
    const serialized = serializer.fromProto3JSON(ResponseType, json);
    const encoded = ResponseType.encode(message).finish();
    console.log(Buffer.from(encoded).toString('base64'));
}); */

/* console.log("Testing proto encoding/decoding...");
var data = fs.readFileSync('response.json', 'utf8');
console.log("Read data");
console.log(data);
var encoded = encodeProto(data, false);
console.log("Encoded data");
console.log(encoded);
var decoded = decodeProto(encoded, false);
console.log("Decoded data");
//console.log(JSON.stringify(decoded.toJSON(), null, 2));
console.log("Done!"); */

// compare postmodify_response.json with premodify_response.json to see if the encoding/decoding is consistent and doesn't alter the data structure or values.
/* function compareJSONFiles(file1, file2) {
    const json1 = JSON.parse(fs.readFileSync(file1, 'utf8'));
    const json2 = JSON.parse(fs.readFileSync(file2, 'utf8'));
    const isEqual = JSON.stringify(json1) === JSON.stringify(json2);
    if (isEqual) {
        console.log("✅ The JSON files are identical.");
    } else {
        console.log("❌ The JSON files differ.");
        const differences = deepdiff(json1, json2);
        console.log("Differences:");
        console.log(JSON.stringify(differences, null, 2));
    }
}

compareJSONFiles('premodify_response.json', 'postmodify_response.json'); */

require('crypto');

function generateAccessToken() {
    // 4 byte fixed header — always 0x00000098 in the sample
    const header = Buffer.alloc(4);
    header.writeUInt32BE(0x00000098, 0);

    // 4 byte unix timestamp
    const timestamp = Buffer.alloc(4);
    timestamp.writeUInt32BE(Math.floor(Date.now() / 1000), 0);

    // 156 random bytes
    const random = crypto.getRandomValues(new Uint8Array(156));

    // concat all parts
    const full = Buffer.concat([header, timestamp, Buffer.from(random)]);

    // encode as url-safe base64 + .S suffix
    const b64 = full.toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, ""); // strip padding

    return b64 + ".S";
}

for (let i = 0; i < 5; i++) {
    console.log(generateAccessToken());
}