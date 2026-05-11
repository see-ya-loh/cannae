import path from "path";
import fs from "fs";
import type { Request, Response } from "../types/cannae_protocol";

export type HandlerFn = (request: Request) => Response | Response[];

const registry = new Map<string, HandlerFn>();

export function loadHandlers(): void {
    const handlersDir = path.join(__dirname, "../handlers");
    const files = fs.readdirSync(handlersDir).filter(f => f.endsWith(".ts") || f.endsWith(".js"));

    for (const file of files) {
        const mod = require(path.join(handlersDir, file));

        for (const [exportName, fn] of Object.entries(mod)) {
            if (typeof fn !== "function") continue;
            if (!exportName.startsWith("handle"))  continue;

            // handleUserLogin -> userLogin -> userLoginReq
            const base   = exportName[6].toLowerCase() + exportName.slice(7);
            const reqKey = base + "Req";

            registry.set(reqKey, fn as HandlerFn);
            console.log(`  registered: ${reqKey} → ${file}::${exportName}`);
        }
    }

    console.log(`\n✅ ${registry.size} handlers registered\n`);
}

export function getHandler(reqField: string): HandlerFn | undefined {
    return registry.get(reqField);
}