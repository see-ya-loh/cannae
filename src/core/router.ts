import fs from "fs";
import path from "path";
import type { Request } from "../types/cannae_protocol";
import { decodeProto } from "../utils/proto";
import { getHandler } from "./registry";
import { buildMultipleResponse, buildErrorResponse } from "./builder";
import { config } from "../config";
import protocolIds from "../protocol_ids.json";

// Session 020: persist what each /api POST decoded to (proto field name,
// protocolId, seqNo, handler-hit) so post-mortem can correlate client-side
// NREs with the response that triggered them. The cannae stdout lives in a
// separate cmd window the operator can't see — this file is the only signal.
const REQ_TRACE_LOG = path.join(config.paths.logs_dir, "api_trace.log");

function trace(line: string) {
    fs.appendFileSync(REQ_TRACE_LOG, `${new Date().toISOString()} ${line}\n`);
}

// Wire wrapper -> handler-registry key. The registry stores handlers under
// `${base}Req` (where base = lowercased exportName after "handle"). Most
// wrappers already carry the "Req" suffix on-wire, but ~16 of them are bare
// (e.g. autoEquipGear, royalMissionInit, profileIconSet). For those we
// resolve via protocol_ids.json: byId[protocolId].reqName.
const PROTOCOL_ID_TO_REQ_NAME: Record<number, string> = (() => {
    const out: Record<number, string> = {};
    const byName: any = (protocolIds as any).byName ?? {};
    for (const info of Object.values(byName)) {
        const i = info as any;
        if (typeof i?.protocolId === "number" && typeof i?.reqName === "string") {
            out[i.protocolId] = i.reqName;
        }
    }
    return out;
})();

export function routeRequest(raw: Buffer, sessionId: string): Buffer {
    const decoded = decodeProto(raw.toString("base64"), true);
    const json = decoded.toJSON() as Request;
    const protocolId = (json as any).protocolId;
    const seqNo = (json as any).seqNo;

    // Prefer Req-suffix / req-prefix field name (canonical convention). Fall
    // back to protocolId lookup for bare-named wrappers like autoEquipGear.
    let reqField = Object.keys(json).find(k => k.endsWith("Req") || k.startsWith("req"));
    if (!reqField && typeof protocolId === "number") {
        reqField = PROTOCOL_ID_TO_REQ_NAME[protocolId];
    }

    if (!reqField) {
        const msg = `[${sessionId}] No *Req field found — protocolId=${protocolId} seqNo=${seqNo} keys=${Object.keys(json).join(",")}`;
        console.warn(msg);
        trace(msg);
        return buildErrorResponse(json, sessionId);
    }

    const handler = getHandler(reqField);
    if (!handler) {
        const msg = `[${sessionId}] NO_HANDLER ${reqField} protocolId=${protocolId} seqNo=${seqNo}`;
        console.warn(msg);
        trace(msg);
        return buildErrorResponse(json, sessionId);
    }

    const responses = [handler(json)].flat();
    const respProtocolIds = responses.map((r: any) => r?.protocolId ?? "MISSING").join(",");
    const msg = `[${sessionId}] ${reqField} protocolId=${protocolId} seqNo=${seqNo} -> rsp.protocolId=[${respProtocolIds}]`;
    console.log(msg);
    trace(msg);
    return buildMultipleResponse(json, responses, sessionId);
}