import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { config } from "../config";

const LOG_FILE = path.join(config.paths.logs_dir, "conninfo.log");

const conninfo = (req: Request, res: Response) => {
    const line = `[${new Date().toISOString()}] CONNINFO ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} from ${req.ip} UA=${req.get('user-agent')} headers=${JSON.stringify(req.headers)}\n`;
    process.stdout.write(line);
    fs.appendFileSync(LOG_FILE, line);
    // Reflect the inbound host back into URLs that the client will hit next.
    // This lets the rootless build (cannae-mod runtime metadata patcher) work
    // without a /system/etc/hosts entry for gms-api.clovergames.io: when the
    // client reaches us via the patched IP, every URL we hand back stays on
    // that same IP and bypasses the missing DNS record.
    const apiBase = `${req.protocol}://${req.get('host')}`;
    const body = JSON.parse(JSON.stringify(jsonResTemplate));
    body.data.data_version.url = `${apiBase}/v1/api/cdn/manifest`;
    body.url = [apiBase];
    res.json(body);
};

const jsonResTemplate = {
    "data": {
        "data_version": {
            "url": "https://gms-api.clovergames.io/v1/api/cdn/manifest",
            "version": 4540
        }
    },
    "data_protection": {
        "age": 13,
        "type": "CCPA"
    },
    "default_lang": "EN",
    "market_meta": {
        "board_server_url": "https://board.clovergames.io/v1/u-api/",
        "community_url": "https://blog.lordofheroes.com",
        "maintenance_end_time": "2026_03_10_16_00",
        "maintenance_gmt": "9",
        "maintenance_start_time": "2026_03_10_11_00"
    },
    "market_url": "https://play.google.com/store/apps/details?id=com.clovergames.lordofheroes",
    "meta": {
        "use_checksum_ignore": "true",
        "use_diff_patch": "true"
    },
    "msg": "",
    "privacy": {
        "html_url": "https://cdn.clovergames.io/production/policy/privacy/100/EN/a8b8f9f4-e371-4679-95db-e1d68e29d1f3/v4/privacy.html",
        "url": "https://cdn.clovergames.io/production/policy/privacy/100/EN/a8b8f9f4-e371-4679-95db-e1d68e29d1f3/v4/privacy.txt",
        "ver": 4
    },
    "privacy_policy": {
        "html_url": "https://cdn.clovergames.io/page/en/privacypolicy.html",
        "url": "https://cdn.clovergames.io/page/en/privacypolicy.html",
        "ver": 1
    },
    "server_type": 9,
    "state": 0,
    "terms": {
        "html_url": "https://cdn.clovergames.io/production/policy/terms/100/EN/11b41a72-0f05-47c4-82d3-634d42d28d65/v6/tos.html",
        "url": "https://cdn.clovergames.io/production/policy/terms/100/EN/11b41a72-0f05-47c4-82d3-634d42d28d65/v6/tos.txt",
        "ver": 6
    },
    "transfer_privacy": {
        "html_url": "",
        "url": "",
        "ver": "1"
    },
    "update_url": "https://play.google.com/store/apps/details?id=com.clovergames.lordofheroes",
    "url": [
        "https://gms-api.clovergames.io"
    ]
};

export default conninfo;
