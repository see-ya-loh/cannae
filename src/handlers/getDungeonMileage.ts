// HTTP /api binary getDungeonMileageReq (protocolId=305). Polled by the
// client while the lobby / world-map footer is up. The proto schema
// (cannae_protocol.proto:4324, :6951) is `ReqGetDungeonMileage {}` and
// `RspGetDungeonMileage { uint32 dungeon_mileage = 1; }`. The dungeon-
// mileage accumulator is not yet persisted on the user row — tutorial /
// stage 1-1 path never opens the dungeon UI, so 0 is the correct fresh-user
// value. When dungeon entry handlers land, this will swap to a user-column
// read.

export function handleGetDungeonMileage(_req: any): any {
    return { protocolId: 305, getDungeonMileageRsp: { dungeonMileage: 0 } };
}
