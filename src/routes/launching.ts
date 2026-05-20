import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { config } from "../config";

const LOG_FILE = path.join(config.paths.logs_dir, "launching.log");
const GAMEBASE_URL = `http://${config.advertised.host}:${config.server.http_port}`;

const launching = (req: Request, res: Response) => {
    const msg = `[Launching] ${new Date().toISOString()} ${req.method} ${req.url} from ${req.ip}\n`;
    fs.appendFileSync(LOG_FILE, msg);
    console.log(msg.trim());

    // Reflect inbound host into hostname-bound fields so the client never sees
    // a hostname that isn't in /system/etc/hosts. Mirrors conninfo.ts.
    const apiBase = `${req.protocol}://${req.get('host')}`;
    const body = JSON.parse(JSON.stringify(launchingTemplate));
    body.launching.app.accessInfo.serverAddress = apiBase;
    body.launching.app.login.gamebaseUrl = apiBase;
    res.json(body);
};

const launchingTemplate = {
    header: {
        resultCode: 0,
        resultMessage: "SUCCESS",
        isSuccessful: true,
    },
    launching: {
        status: {
            code: 200,
            message: "ok",
        },
        app: {
            accessInfo: {
                serverAddress: "",
                csInfo: "",
            },
            relatedUrls: {
                termsUrl: "https://cdn.clovergames.io/page/en/tos.html",
                csUrl: "",
                punishRuleUrl: "",
                personalInfoCollectionUrl: "",
            },
            install: {
                url: "https://play.google.com/store/apps/details?id=com.clovergames.lordofheroes",
            },
            idP: {},
            login: {
                gamebaseUrl: GAMEBASE_URL,
            },
            typeCode: "NORMAL",
        },
        maintenance: null,
        notice: null,
    },
    tcProduct: [
        {
            appKey: "",
            strAppKey: "",
            productId: 4,
            lastUpdated: 0,
            serviceStatus: 2,
            updateDate: "2024-01-01",
        },
    ],
    tcIap: {
        id: "gamebase",
        name: "Gamebase",
        appKey: "",
    },
};

export default launching;
