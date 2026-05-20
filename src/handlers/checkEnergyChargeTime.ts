import { findByAccessToken, buildMsgUser } from "../db/schema/users";
import { applyEnergyCharge } from "../core/energy";

// HTTP /api binary checkEnergyChargeTimeReq (protocolId=101). The wire request
// is empty (`message ReqCheckEnergyChargeTime {}`), but the response carries
// a full MsgUser (`message RspCheckEnergyChargeTime { MsgUser user = 1; }`)
// from which Cannae.Manager.UserChargeManager.OnPacketRspCheckEnergyChargeTime
// (dump.cs:246803) reads energy / energy_charge_time / max_energy and updates
// its in-memory UserChargeManager.EnergyItem snapshot. The client polls this
// periodically so the lobby energy widget can resync against the server even
// when nothing else is in flight.
//
// User identity comes from the outer Request envelope's `token` field,
// matching the pattern in handlers/tutorialProgress.ts — the inner request
// message has no useful body for us to read.
export function handleCheckEnergyChargeTime(req: any): any {
    const accessToken: string = req?.token ?? "";
    const userRaw = findByAccessToken(accessToken);
    if (!userRaw) {
        console.warn(`checkEnergyChargeTimeReq: unknown token ${accessToken.slice(0, 16)}...`);
        return {
            protocolId: 101,
            result: "ErrorPacketTokenInvalid",
            checkEnergyChargeTimeRsp: {},
        };
    }
    const user = applyEnergyCharge(userRaw);
    return {
        protocolId: 101,
        checkEnergyChargeTimeRsp: { user: buildMsgUser(user) },
    };
}
