import type { Request } from "../types/cannae_protocol";
import { decodeProto, encodeProto } from "../utils/proto";
import { getHandler } from "./registry";
import { buildMultipleResponse, buildErrorResponse } from "./builder";
import { readFileSync } from "fs";


export function routeRequest(raw: Buffer, sessionId: string): Buffer {
    const decoded = decodeProto(raw.toString("base64"), true);
    //console.log(`decoded: ${JSON.stringify(decoded.toJSON())})}`)
    const json    = decoded.toJSON() as Request;
    console.log(json)

    const reqField = Object.keys(json).find(k => k.endsWith("Req") || k.startsWith("req"));

    if (!reqField) {
        console.warn(`[${sessionId}] No *Req field found — keys: ${Object.keys(json).join(", ")}`);
        return buildErrorResponse(json, sessionId);
    }
    console.log(reqField)
    /* if (reqField == "userLoginReq"){
        console.log("userLoginReq Captured")
        var now = Date.now()
        var jsonFile = require("../response.json")
        var jsonResponse = jsonFile
        jsonResponse.responses[0].serverTimeRsp = {
            now: now,
            utcNow: now - 32400,
            timeGap: 7200
        }
        console.log("Changed Time from Response Template")
        return Buffer.from(encodeProto(JSON.stringify(jsonResponse), false))
    } */
    console.log(`[${sessionId}] → ${reqField}`);

    const handler = getHandler(reqField);
    if (!handler) {
        console.warn(`[${sessionId}] No handler for ${reqField}`);
        return buildErrorResponse(json, sessionId);
    }

    const responses = [handler(json)].flat();
    return buildMultipleResponse(json, responses, sessionId);
}