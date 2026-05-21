import { updateEnergyState, type UserRow } from "../db/schema/users";
import { ENERGY_CHARGE_TICK_SEC, ENERGY_PER_TICK } from "./constants";

// Server-authoritative energy regen. The proto evidence is decisive:
//   message ReqCheckEnergyChargeTime {}                   // empty payload
//   message RspCheckEnergyChargeTime { MsgUser user = 1; }
// The client polls with no body and the server returns a fresh MsgUser; the
// client trusts whatever energy/energy_charge_time/max_energy come back and
// only extrapolates locally between polls (UserChargeManager.BaseEnergyItem
// at dump.cs:246272, using its own chargeSec/chargeCount loaded from master).
// The client's inter-poll extrapolation will visibly snap up at each
// `checkEnergyChargeTimeReq` response under the dev rate; expected and
// harmless for verification.

// Recomputes a user's current energy from their last server-side checkpoint
// and persists the new (energy, energy_update_date) pair when it advances.
// Idempotent — callers can invoke it before every wire response without
// extra branching. Returns either the unchanged row or a fresh copy with the
// updated fields, so the caller can pass the result straight to `buildMsgUser`.
export function applyEnergyCharge(user: UserRow): UserRow {
    const now = Math.floor(Date.now() / 1000);
    let energy = user.energy;
    // `0` is the post-migration default for pre-existing rows; treat that as
    // "first time we touched this user" and anchor the timestamp to now.
    let ts = user.energy_update_date || now;

    if (energy < user.max_energy) {
        const elapsed = Math.max(0, now - ts);
        const ticks = Math.floor(elapsed / ENERGY_CHARGE_TICK_SEC);
        if (ticks > 0) {
            const cap = user.max_energy - energy;
            const add = Math.min(cap, ticks * ENERGY_PER_TICK);
            energy += add;
            const consumedTicks = Math.ceil(add / ENERGY_PER_TICK);
            ts += consumedTicks * ENERGY_CHARGE_TICK_SEC;
            // Once banked, anchor ts to `now` so the next spend starts its
            // accumulator from a fresh point instead of trickling in a
            // backlog of ticks the moment the user dips below max.
            if (energy >= user.max_energy) ts = now;
        }
    } else {
        // Already at or above max: no regen happens, but keep the anchor
        // current so a future spend doesn't immediately reclaim hours of
        // banked ticks. Matches the Haiko_26 capture, where a fully banked
        // user ships energy_charge_time == 0 / next-update.
        ts = now;
    }

    if (energy !== user.energy || ts !== user.energy_update_date) {
        updateEnergyState.run(energy, ts, user.user_id);
        return { ...user, energy, energy_update_date: ts };
    }
    return user;
}

// Deducts `cost` energy and persists. Caller is responsible for verifying
// `user.energy >= cost` first (and surfacing ErrorEnergyNotEnough to the
// client). Anchors `energy_update_date` to now so the natural regen restarts
// from this instant, matching what `checkEnergyChargeTimeReq` would observe.
export function spendEnergy(user: UserRow, cost: number): UserRow {
    if (cost <= 0) return user;
    const energy = Math.max(0, user.energy - cost);
    const ts = Math.floor(Date.now() / 1000);
    updateEnergyState.run(energy, ts, user.user_id);
    return { ...user, energy, energy_update_date: ts };
}
