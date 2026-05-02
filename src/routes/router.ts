import {decodeProto, encodeProto} from "../utils/proto";
import { getHandler } from "../handler";
import { buildResponse } from "../utils/builder";



export function routeRequest(base64Proto: string): string | null {
    const decoded = decodeProto(base64Proto, true).toJSON();
    const handler = getHandler(decoded);

    if (!handler) return null; // no handler = pass through unmodified

    const rspJson = handler(decoded);
    if (!rspJson) return null; // handler didn't return anything = pass through unmodified
    var response = buildResponse(rspJson, decoded.protocolId);

    return encodeProto(JSON.stringify(response), false);
}