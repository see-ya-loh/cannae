import crypto from "crypto";
import { v1 } from "uuid";
export function generateAccessToken(): string {
    // 4 byte fixed header — always 0x00000098 in the sample
    const header = Buffer.alloc(4);
    header.writeUInt32BE(0x00000098, 0);

    // 4 byte unix timestamp
    const timestamp = Buffer.alloc(4);
    timestamp.writeUInt32BE(Math.floor(Date.now() / 1000), 0);

    // 156 random bytes
    const random = crypto.randomBytes(156);

    // concat all parts
    const full = Buffer.concat([header, timestamp, random]);

    // encode as url-safe base64 + .S suffix
    const b64 = full.toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, ""); // strip padding

    return b64 + ".S";
}

export function generateTicket(): number {
    return crypto.randomInt(100000000, 999999999);
}

export function generateAccountToken(): string {
    var uintarr = new Uint8Array(6);
    var arr = [0x02, 0x42, 0xc0, 0xa8, 0x00, 0x02]
    uintarr.set(arr);
    return v1({
        node: uintarr, // taken from the logged response
        clockseq: Math.floor(Math.random() * 0x3fff)
    })
}
