// HTTP /api binary worldMapFooterReq (protocolId=107). Polled by the client
// while the world-map footer panel is visible. Both Req and Rsp are empty in
// the proto schema (cannae_protocol.proto:5348, :8443) — explicit handler so
// the wire envelope carries protocolId=107 + ResultOk rather than relying on
// the NO_HANDLER fallback.

export function handleWorldMapFooter(_req: any): any {
    return { protocolId: 107, worldMapFooterRsp: {} };
}
