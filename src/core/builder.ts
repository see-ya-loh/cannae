import { Result, type Request, type Response } from "../types/cannae_protocol";
import { encodeProto } from "../utils/proto";
import { nextTicket, validateAndRotate } from "./session";
import protocolIds from "../protocol_ids.json";
import { config } from "../config";
import fs from "fs";
import path from "path";
import protobufjs from "protobufjs";

// Round-trip trace for diagnosing wire-encoding issues. When a response with
// one of these protocolIds is built, decode the produced bytes back through
// protobufjs and dump JSON + hex into <logs>/wire_trace/. Use to compare what
// we actually put on the wire against captured production traffic dumps.
// Empty set disables logging.
const WIRE_TRACE_PROTOCOL_IDS = new Set<number>([203 /* userLoginRsp */]);
const WIRE_TRACE_DIR = path.join(config.paths.logs_dir, "wire_trace");
const wireRoot = protobufjs.loadSync("./proto/cannae_protocol.proto");
const wireMultipleResponse = wireRoot.lookupType("Cannae.Protocol.MultipleResponse");
fs.mkdirSync(WIRE_TRACE_DIR, { recursive: true });

// Build reqName -> {rspName, protocolId} lookup at module load.
// protocol_ids.json's `byName` is keyed by rspName; reverse it once.
type RspMeta = { rspName: string; protocolId: number };
const REQ_TO_RSP: Record<string, RspMeta> = (() => {
    const out: Record<string, RspMeta> = {};
    const byName = (protocolIds as any).byName as Record<string, any>;
    for (const [rspName, meta] of Object.entries(byName)) {
        if (meta?.reqName && typeof meta.protocolId === "number") {
            out[meta.reqName] = { rspName, protocolId: meta.protocolId };
        }
    }
    return out;
})();

export function buildMultipleResponse(request: Request, responses: Response[], sessionId: string): Buffer {
    validateAndRotate(sessionId, (request as any).ticket?.ticket);

    // The proto field on the request side is `seqNo` (proto tag 3), but on
    // both MultipleResponse and Response it's named `reqSeqNo`. Reading
    // `request.reqSeqNo` here silently returned undefined → encoded as 0,
    // which then broke ServerConnection's `mSentPacketInfo` TryGetValue
    // lookup, leaving every sent packet stuck in the dispatch dict and
    // blocking all subsequent _Worker dispatches (session 020 root cause).
    const seq = (request as any).seqNo;

    const payload = {
        responses: responses.map(r => ({
            protocolVersion: (request as any).protocolVersion,
            reqSeqNo:        seq,
            result:          "ResultOk",
            ...r,
        })),
        reqSeqNo:     seq,
        nextTicketNo: nextTicket(sessionId),
    };

    const buf = Buffer.from(encodeProto(JSON.stringify(payload), false), "base64");

    // Wire trace: capture the bytes for selected protocolIds and round-trip
    // them back through protobufjs so we can see precisely what the client
    // will decode. Compare the JSON dump against captured production traffic
    // and the hex against on-device tcpdump.
    if (responses.some(r => WIRE_TRACE_PROTOCOL_IDS.has((r as any).protocolId))) {
        try {
            const decoded = wireMultipleResponse.decode(buf);
            const obj = wireMultipleResponse.toObject(decoded, {
                longs: String, enums: String, bytes: String, defaults: false,
            });
            const stamp = new Date().toISOString().replace(/[:.]/g, "-");
            const ids = responses.map(r => (r as any).protocolId).join("_");
            // sessionId may contain ':' (IPv6/port), invalid in Windows filenames.
            const sid = sessionId.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 16);
            const base = path.join(WIRE_TRACE_DIR, `${stamp}_${sid}_p${ids}`);
            fs.writeFileSync(`${base}.json`, JSON.stringify(obj, null, 2));
            fs.writeFileSync(`${base}.hex`, buf.toString("hex"));
        } catch (e) {
            // Don't let trace failures break the actual response path.
            fs.appendFileSync(path.join(WIRE_TRACE_DIR, "_errors.log"),
                `${new Date().toISOString()} ${(e as Error).message}\n`);
        }
    }

    return buf;
}

// Used by router.ts for two failure modes:
//   1. Decoded request has no *Req field (unrecognized proto).
//   2. Request has a known reqField but no handler is registered.
// In both cases the response must still carry the matching inner *Rsp field
// (even empty) because Clover.ServerConnection.ProcessResponsePacket uses
// reflection to GetValue the rsp slot on the response and NREs if it's null.
// Returning an error result code lets the client take the no-body branch
// inside its OnPacketRsp* handler instead of trying to populate live state.
export function buildErrorResponse(request: any, sessionId: string): Buffer {
    const reqField = Object.keys(request ?? {}).find(
        k => k.endsWith("Req") || k.startsWith("req"),
    );
    const meta = reqField ? REQ_TO_RSP[reqField] : undefined;

    if (!meta) {
        // No reqField OR reqField not in proto mapping. Best-effort: echo the
        // request protocolId back so the dispatcher at least finds the slot.
        // ResultOk silences the generic "request rejected" toast the client
        // shows on error results and lets its success-path handler take an
        // empty body, which is typically a no-op (e.g. heartbeat-style
        // protocols).
        return buildMultipleResponse(
            request,
            [{ protocolId: request?.protocolId ?? 0, result: Result.ResultOk }],
            sessionId,
        );
    }

    const body: any = {
        protocolId: meta.protocolId,
        result:     Result.ResultOk,
        [meta.rspName]: {},
    };
    return buildMultipleResponse(request, [body], sessionId);
}