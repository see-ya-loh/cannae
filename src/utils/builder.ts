import { getProtocolVersion } from "./constants"

var baseResponse = {
    protocolVersion : getProtocolVersion(),
    result: "ResultOk"
}


export function buildResponse(data: any, protocolId: number) {
    return {
        ...baseResponse,
        data: data,
        protocolId: protocolId
    }
}