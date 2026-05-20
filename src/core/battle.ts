// In-memory map of active battles. battleStart hands the client an opaque
// uint64 battleId; battleEnd refers back to it without re-sending the
// substageUid or party. Since the round trip is short and a battle is one-
// shot (consumed on end), an in-memory map suffices — server restart drops
// every in-flight battle, which is acceptable: the client will fail the
// next battleEnd, retry, and run through battleStart again.

export interface BattleSession {
    battleId:          string;
    userId:            string;
    battleType:        string;
    substageUid:       number;     // 0 for non-story modes
    characterSlotData: any;        // echoed verbatim into battleEndRsp
    startedAt:         number;     // unix sec
}

const battleSessions = new Map<string, BattleSession>();

let nextBattleId = 100000;

export function issueBattleId(): string {
    nextBattleId += 1;
    return String(nextBattleId);
}

export function registerBattle(session: BattleSession): void {
    battleSessions.set(session.battleId, session);
}

// Single-use lookup: get + delete. battleEnd is the only consumer, and
// retries against the same battleId would be reusing a completed battle
// (which is a client-side bug, not a recoverable state on the server).
export function consumeBattle(battleId: string): BattleSession | undefined {
    const session = battleSessions.get(battleId);
    if (session) battleSessions.delete(battleId);
    return session;
}
