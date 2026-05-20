import fs from "fs";
import path from "path";
import type { Request, Response } from "express";
import { config } from "../../config";

const MANIFEST_PATH = path.join(config.paths.cdn_dir, config.paths.cdn_manifest_file);
const LOG_FILE = path.join(config.paths.logs_dir, "conninfo.log");

// Hosts that the on-disk manifest hardcodes for CDN downloads. Each one is
// an external domain that does not resolve on a rootless client (the project
// goal is to drop /system/etc/hosts mappings entirely). The handler rewrites
// every occurrence to the inbound host so the client comes back to us for
// the actual file fetches against the /cdn/* static route.
const EXTERNAL_CDN_HOSTS = [
    "https://gms-api.clovergames.io",
    "https://cannae-cdn.clovergames.io",
];

let cachedSource: string | null = null;

export default function manifest(req: Request, res: Response) {
    const line = `[${new Date().toISOString()}] MANIFEST ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} from ${req.ip} UA=${req.get('user-agent')}\n`;
    process.stdout.write(line);
    fs.appendFileSync(LOG_FILE, line);
    if (cachedSource === null) {
        cachedSource = fs.readFileSync(MANIFEST_PATH, "utf-8");
    }
    const inbound = `${req.protocol}://${req.get("host")}`;
    let body = cachedSource;
    for (const host of EXTERNAL_CDN_HOSTS) {
        body = body.split(host).join(inbound);
    }
    res.set("Content-Type", "application/json");
    res.send(body);
}
