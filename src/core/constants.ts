// Cross-layer constants shared between core/ and db/schema/. Stays import-free
// so any module can pull from it without forming a require cycle under
// CommonJS (ts-node default), where a cycle silently leaves named exports
// `undefined` at module init.

// Server-authoritative energy regen tunables.
// Production curve: 60 per 5 min = 720/hour = 1 per 5 sec.
// Dev curve (current): 60 per 30 sec = 7200/hour. Iteration knob.
export const ENERGY_CHARGE_TICK_SEC = 30;
export const ENERGY_PER_TICK        = 60;
