// HTTP /api binary heartBeatReq (protocolId=106). Sent by Cannae.Requests on
// a periodic timer. Two subtle gotchas captured here:
//
//   1. Response MUST carry the matching protocolId. Returning `{}` encodes as
//      protocolId=0, which is not in the client's static `mRspPacketTable`
//      and crashes Clover.ServerConnection.ResumeResponseDequeue with an NRE.
//
//   2. The export name MUST be `handleHeartBeat` (capital B), not
//      `handleHeartbeat`. Registry (core/registry.ts) auto-derives the
//      proto field name by lowercasing only the FIRST letter after `handle`:
//      `handleHeartBeat` -> `heartBeatReq`, which is what the .proto declares
//      (line 5380: `ReqHeartBeat heartBeatReq = 106;`). `handleHeartbeat`
//      generated `heartbeatReq`, which never matches and silently falls
//      through to the unknown-handler error path on every heartbeat tick.
export function handleHeartBeat(req: any) {
    return {
        protocolId: 106,
        heartBeatRsp: {},
    };
}
