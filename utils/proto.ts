import protobufjs from "protobufjs";

var root = protobufjs.loadSync("./proto/cannae_protocol.proto");
var cannae_proto_request = root.lookupType("Cannae.Protocol.Request");
var cannae_proto_response = root.lookupType("Cannae.Protocol.MultipleResponse");

export function decodeProto(base64String: string, isRequest: boolean = true) {
    var buffer = Buffer.from(base64String, "base64");
    console.log("First 16 bytes:", buffer.slice(0, 16).toString("hex"));
    console.log("Total length:", buffer.length);
    var message = isRequest ? cannae_proto_request.decode(buffer) : cannae_proto_response.decode(buffer);
    return message;
}

export function encodeProto(message: string, isRequest: boolean = true): string {
    var MessageType = (isRequest ? cannae_proto_request : cannae_proto_response) as protobufjs.Type;
    var msg = MessageType.fromObject(JSON.parse(message));
    const encoded = MessageType.encode(msg).finish();
    return Buffer.from(encoded).toString("base64");
}

