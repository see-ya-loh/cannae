// HTTP /api binary getUserFamineRaidInfoReq. Polled immediately after
// userLogin so the lobby can decide whether to show the famine-raid event
// widget.
//
// Wire shape (cannae_protocol.proto:4545, :7298):
//   message ReqGetUserFamineRaidInfo {}
//   message RspGetUserFamineRaidInfo {
//       fixed32 famine_raid_time_table_uid = 1;
//       repeated MsgUserFamineRaidBattleClearHistory user_famine_raid_clear_histories = 2;
//       repeated MsgUserCharacterAI character_ai = 3;
//       MsgUserFamineRaidTimeTable user_famine_raid_time_table = 4;
//   }
//
// IMPORTANT: this protocol has DIFFERENT protocolIds for Req and Rsp —
// `getUserFamineRaidInfoReq = 1701` (cannae_protocol.proto:5637) but
// `getUserFamineRaidInfoRsp = 1731` (cannae_protocol.proto:6017). The
// response must carry protocolId=1731 because the client's
// `Clover.ServerConnection.mRspPacketTable` is keyed on the Rsp slot id; a
// reply with protocolId=1701 fails the GATE-3 TryGetValue inside
// `ProcessResponsePacket`, the cleanup of `mSentPacketInfo` is skipped, and
// every subsequent request silently stalls — identical symptom to fix C.
// The catalog in `src/protocol_ids.json` resolves the Req field name to the
// Rsp's protocolId (1731) for exactly this reason.
//
// Fresh tutorial user is not enrolled in any famine-raid season — zero uid
// + empty clear-history + empty character-ai signals "no active event" so
// the lobby widget stays hidden. user_famine_raid_time_table is left absent
// (proto3 optional sub-message defaults to null on the wire).

export function handleGetUserFamineRaidInfo(_req: any): any {
    return {
        protocolId: 1731,
        getUserFamineRaidInfoRsp: {
            famineRaidTimeTableUid:        0,
            userFamineRaidClearHistories:  [],
            characterAi:                   [],
        },
    };
}
