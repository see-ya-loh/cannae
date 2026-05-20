import { WebSocket } from "ws";
import { IncomingMessage } from "http";
import fs from "fs";
import path from "path";
import { config } from "../config";
import {
    createUser,
    findByAccessToken,
    findByIdp,
    findMostRecentGuest,
    touchLastLogin,
} from "../db/schema/users";

const WS_LOG = path.join(config.paths.logs_dir, "websocket.log");
const ADVERTISED_URL = `http://${config.advertised.host}:${config.server.http_port}`;

function log(msg: string) {
    const line = `${new Date().toISOString()} ${msg}`;
    console.log(`[WS] ${msg}`);
    fs.appendFileSync(WS_LOG, line + "\n");
}

export function handleGamebaseWS(ws: WebSocket, req: IncomingMessage) {
    const clientIp = req.socket.remoteAddress;
    log(`Connection from ${clientIp}`);

    ws.on("message", (data) => {
        const raw = data.toString();
        let msg: any;
        try {
            msg = JSON.parse(raw);
        } catch {
            log(`Invalid JSON: ${raw.slice(0, 200)}`);
            return;
        }

        const apiId: string = msg.apiId ?? "unknown";
        const txId: string = msg.headers?.["X-TCGB-Transaction-Id"] ?? "";
        log(`apiId=${apiId} txId=${txId}`);

        // Wire-shape capture for login frames until field locations are pinned.
        // Authorization header is stripped to keep token strings out of the log.
        if (apiId === "idPLogin" || apiId === "tokenLogin" || apiId === "unknown") {
            const sanitized: any = { ...msg };
            if (sanitized.headers) {
                const h = { ...sanitized.headers };
                delete h["Authorization"];
                sanitized.headers = h;
            }
            log(`raw ${apiId}: ${JSON.stringify(sanitized)}`);
        }

        let response: object;
        switch (apiId) {
            case "getLaunching":
                response = buildLaunchingResponse(txId);
                break;
            case "getLaunchingStatus":
                response = buildStatusResponse(txId);
                break;
            case "idPLogin":
                response = buildIdPLoginResponse(txId, msg);
                break;
            case "tokenLogin":
                response = buildTokenLoginResponse(txId, msg);
                break;
            case "heartbeat":
                response = buildSuccessHeader(txId);
                break;
            default:
                log(`Unknown apiId: ${apiId}`);
                response = buildSuccessHeader(txId);
                break;
        }

        const out = JSON.stringify(response);
        log(`Responding (${out.length} bytes) for apiId=${apiId}`);
        ws.send(out);
    });

    ws.on("close", (code, reason) => {
        log(`Disconnected: code=${code} reason=${reason}`);
    });

    ws.on("error", (err) => {
        log(`Error: ${err.message}`);
    });
}

function parsePayload(raw: any): any {
    if (typeof raw !== "string") return raw ?? {};
    try {
        return JSON.parse(raw);
    } catch {
        return {};
    }
}

function buildSuccessHeader(transactionId: string) {
    return {
        header: {
            isSuccessful: true,
            resultCode: 0,
            resultMessage: "Success",
            transactionId,
        },
    };
}

function buildStatusResponse(transactionId: string) {
    return {
        ...buildSuccessHeader(transactionId),
        launching: {
            status: { code: 200, message: "ok" },
        },
    };
}

function buildIdPLoginResponse(transactionId: string, req: any) {
    // Gamebase Gateway WS frames wrap the real body in a stringified JSON
    // under `payload`. The top-level msg only carries productId/apiId/headers.
    const payload = parsePayload(req?.payload);

    const idPCode: string = payload?.idPInfo?.idPCode ?? "guest";

    // member.uuid is the per-install Gamebase UUID — stable until the user
    // wipes Gamebase shared_prefs (i.e. uninstall/reinstall). deviceKey is a
    // secondary fallback if the uuid is somehow missing.
    const idPUserKey: string =
        payload?.member?.uuid ??
        payload?.member?.deviceKey ??
        "unknown-guest";

    if (idPUserKey === "unknown-guest") {
        log(`WARNING: no stable idp key found in idPLogin payload; all guests share one row`);
    }

    const now = Date.now();
    let user = findByIdp(idPCode, idPUserKey);
    // Guest reinstall fallback: if no row matches the incoming uuid but a
    // guest row exists, treat the freshly-rotated uuid as the same human
    // reinstalling the APK. Avoids leaking an orphan row every dev cycle
    // when `adb install -r` is not enough (different signing key, manual
    // data wipe, etc.). Workflow note: skipping `adb uninstall` keeps
    // Gamebase shared_prefs intact and matches via the original path.
    if (!user && idPCode === "guest") {
        user = findMostRecentGuest();
        if (user) {
            log(`idPLogin: adopted guest user_id=${user.user_id} (uuid mismatch — likely reinstall)`);
        }
    }
    if (!user) {
        user = createUser(idPCode, idPUserKey);
        log(`idPLogin: created user_id=${user.user_id} for idp=${idPCode} key=${idPUserKey}`);
    } else {
        touchLastLogin(user.user_id, now);
        log(`idPLogin: returning user_id=${user.user_id} for idp=${idPCode} key=${idPUserKey}`);
    }

    // Gamebase member.regDate/lastLoginDate are propagated to the game's
    // application code (LocalNotificationManager.CheckNewUser) which calls
    // GameTime.GetDateTimeFromUnixTime — that helper expects seconds. Passing
    // ms triggers DateTime overflow → ArgumentOutOfRange → loader hang.
    const createSec = Math.floor(user.create_date / 1000);
    const nowSec = Math.floor(now / 1000);

    return {
        ...buildSuccessHeader(transactionId),
        member: {
            userId: user.user_id,
            appId: "com.clovergames.lordofheroes",
            valid: "Y",
            regDate: createSec,
            lastLoginDate: nowSec,
            // Phase 2: also expose the token on the member object. The C#
            // LoginManager static getters (get_AccessToken / get_GamebaseId)
            // remain null after Phase 1, so try Variant A from the design.
            accessToken: user.access_token,
            accessTokenSecret: user.access_token_secret,
            authList: [
                {
                    idPCode,
                    userId: idPUserKey,
                    authKey: user.access_token_secret,
                    authSystem: "gamebase",
                    regDate: createSec,
                },
            ],
        },
        token: {
            accessToken: user.access_token,
            accessTokenSecret: user.access_token_secret,
        },
        tokenInfo: {
            accessToken: user.access_token,
            accessTokenSecret: user.access_token_secret,
            idPCode,
            regDate: createSec,
        },
    };
}

function buildTokenLoginResponse(transactionId: string, req: any) {
    // Same payload-wrapping convention as idPLogin. The exact field carrying
    // the cached token is still untested; narrow once the first real
    // `raw tokenLogin:` entry appears.
    const payload = parsePayload(req?.payload);
    // Observed wire shape: Gamebase SDK ships the cached token under
    // tokenInfo.accessToken alongside its idPCode. Keep the alternates as a
    // safety net for SDK versions that may move it.
    const accessToken: string | undefined =
        payload?.tokenInfo?.accessToken ??
        payload?.token?.accessToken ??
        payload?.member?.accessToken ??
        payload?.accessToken;

    if (!accessToken) {
        log(`tokenLogin: no accessToken in request`);
        return {
            header: {
                isSuccessful: false,
                resultCode: 3201,
                resultMessage: "tokenLogin failed: missing token",
                transactionId,
            },
        };
    }

    const user = findByAccessToken(accessToken);
    if (!user) {
        log(`tokenLogin: unknown token ${accessToken.slice(0, 16)}...`);
        return {
            header: {
                isSuccessful: false,
                resultCode: 3201,
                resultMessage: "tokenLogin failed: token unknown",
                transactionId,
            },
        };
    }

    const now = Date.now();
    touchLastLogin(user.user_id, now);
    log(`tokenLogin: returning user_id=${user.user_id}`);

    // See idPLogin: regDate/lastLoginDate must be epoch seconds, not ms.
    const createSec = Math.floor(user.create_date / 1000);
    const nowSec = Math.floor(now / 1000);

    return {
        ...buildSuccessHeader(transactionId),
        member: {
            userId: user.user_id,
            appId: "com.clovergames.lordofheroes",
            valid: "Y",
            regDate: createSec,
            lastLoginDate: nowSec,
            // Phase 2: see buildIdPLoginResponse.
            accessToken: user.access_token,
            accessTokenSecret: user.access_token_secret,
            authList: [
                {
                    idPCode: user.idp_code,
                    userId: user.idp_user_key,
                    authKey: user.access_token_secret,
                    authSystem: "gamebase",
                    regDate: createSec,
                },
            ],
        },
        token: {
            accessToken: user.access_token,
            accessTokenSecret: user.access_token_secret,
        },
        tokenInfo: {
            accessToken: user.access_token,
            accessTokenSecret: user.access_token_secret,
            idPCode: user.idp_code,
            regDate: createSec,
        },
    };
}

function buildLaunchingResponse(transactionId: string) {
    return {
        ...buildSuccessHeader(transactionId),
        launching: {
            status: { code: 200, message: "ok" },
            app: {
                accessInfo: {
                    serverAddress: ADVERTISED_URL,
                    csInfo: "",
                },
                install: {
                    url: "market://details?id=com.clovergames.lordofheroes",
                },
                login: {
                    gamebaseUrl: ADVERTISED_URL,
                },
                relatedUrls: {
                    termsUrl: "https://cdn.clovergames.io/page/en/tos.html",
                    csUrl: "",
                    punishRuleUrl: "",
                    personalInfoCollectionUrl: "",
                },
                idP: {
                    guest: { clientId: "cannae-guest" },
                    google: { clientId: "cannae-google" },
                    facebook: { clientId: "cannae-facebook" },
                    appleid: { clientId: "cannae-appleid" },
                },
                typeCode: "REAL",
                language: { defaultLanguage: "en" },
                customerService: {},
                termsService: {},
            },
            tcgbClient: {
                stability: { appKey: "dummy" },
                forceRemoteSettings: {
                    log: { appKeyIndicator: "dummy", appKeyLog: "dummy" },
                },
            },
            maintenance: null,
            notice: null,
        },
        tcProduct: {
            gamebase: { appKey: "dummy", strAppKey: "dummy" },
            iap: { appKey: "dummy" },
            push: { appKey: "dummy" },
        },
    };
}
