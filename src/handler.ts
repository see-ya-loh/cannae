// registry.ts - auto-discovery version
import { readdirSync } from "fs";
import path from "path";
import ids from "./protocol_ids.json"
import { getProtocolVersion } from "./utils/constants";
type HandlerFn = (reqJson: any) => any;
const registry: Record<string, HandlerFn> = {};

var baseRequest = {
    protocolVersion: getProtocolVersion(),
    result: "ResultOk"
}

// loads all handlers/**.ts and expects each to export functions named handle*
for (const file of readdirSync("./src/handlers")) {
    const mod = require(`./handlers/${path.basename(file, ".ts")}`);
    for (const [name, fn] of Object.entries(mod)) {
        if (name.startsWith("handle")) {
            // handleHeartbeat -> heartBeatReq (strip "handle", lowercase first char, add "Req")
            const reqName = name[6].toLowerCase() + name.slice(7) + "Req";
            registry[reqName] = fn as HandlerFn;
            console.log(`Registered handler for ${reqName} from ${file}`);
        }
    }
}

export function getHandler(reqJson: any): HandlerFn | null {
    const reqKey = Object.keys(reqJson).find(k => k.endsWith("Req"));
    if (!reqKey) return null;
    return registry[reqKey] ?? null;
}