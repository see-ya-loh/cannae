// HTTP /api binary lobbyFooterReq (protocolId=105). Polled by the client
// while sitting in the lobby footer. Both Req and Rsp messages are empty in
// the proto schema (cannae_protocol.proto:4721, :7567), so this handler just
// returns the well-formed envelope — the value of having an explicit handler
// over NO_HANDLER is the protocolId being correct (NO_HANDLER's
// buildErrorResponse falls back to whatever it can derive from the request
// field name, which works for this case but is a coincidence rather than a
// guarantee).

export function handleLobbyFooter(_req: any): any {
    return { protocolId: 105, lobbyFooterRsp: {} };
}
