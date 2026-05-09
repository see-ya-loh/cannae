import crypto from "crypto";
import { v1 } from "uuid";

const sessions = new Map<string, number>();
const INITIAL_TICKET = 1; 
export function getExpectedTicket(sessionId: string): number {
    return sessions.get(sessionId) ?? INITIAL_TICKET;
}

export function validateAndRotate(sessionId: string, incomingTicket: number): boolean {
    const expected = getExpectedTicket(sessionId);
    if (incomingTicket !== expected) {
        console.warn(`[${sessionId}] Bad ticket: got ${incomingTicket}, expected ${expected}`);
        return false; 
    }
    return true;
}

export function nextTicket(sessionId: string): number {
    const next = generateTicket();
    sessions.set(sessionId, next);
    return next;
}

function generateTicket(): number {
    return Math.floor(Math.random() * 0xFFFFFFFF);
}

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

export function generateAccountToken(): string {
    var uintarr = new Uint8Array(6);
    var arr = [0x02, 0x42, 0xc0, 0xa8, 0x00, 0x02]
    uintarr.set(arr);
    return v1({
        node: uintarr, // taken from the logged response
        clockseq: Math.floor(Math.random() * 0x3fff)
    })
}
