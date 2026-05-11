import { Result, type Request, type Response } from "../types/cannae_protocol";
import { encodeProto } from "../utils/proto";
import { nextTicket, validateAndRotate } from "./session";

export function buildMultipleResponse(request: Request, responses: Response[], sessionId: string): Buffer {
    validateAndRotate(sessionId, (request as any).ticket?.ticket);

    const payload = {
        responses: responses.map(r => ({
            protocolVersion: (request as any).protocolVersion,
            reqSeqNo:        (request as any).reqSeqNo,
            result:          "ResultOk",
            ...r,
        })),
        reqSeqNo:     (request as any).reqSeqNo,
        nextTicketNo: nextTicket(sessionId),
    };

    return Buffer.from(encodeProto(JSON.stringify(payload), false), "base64");
}

export function buildErrorResponse(request: any, sessionId: string): Buffer {
    return buildMultipleResponse(
        request,
        [{ protocolId: request.protocolId, result: Result.ResultOk }],
        sessionId
    );
}