import express from "express";
import { WebSocketServer } from "ws";
import fs from "fs";
import path from "path";
import http from "http";
import https from "https";
import { loadHandlers } from "./core/registry";
import { routeRequest } from "./core/router";
import conninfo from "./routes/conninfo";
import manifest from "./routes/cdn/manifest";
import launching from "./routes/launching";
import { handleGamebaseWS } from "./routes/websocket";
import { config, repoRoot } from "./config";
import { initDb } from "./db/tables";

const REQUEST_LOG = path.join(config.paths.logs_dir, "all_requests.log");

const app = express();

app.use((req, _res, next) => {
    fs.appendFileSync(REQUEST_LOG,
        `${new Date().toISOString()} ${req.method} ${req.url} from ${req.ip}\n`);
    next();
});
app.use(express.raw({ type: "application/octet-stream", limit: "10mb" }));
// Routes: support both /v1/api/... and /v1//v1/api/... (due to metadata URL patching)
app.get("/v1/api/conninfo", conninfo);
app.get("/v1//v1/api/conninfo", conninfo);
app.get("/v1/api/cdn/manifest", manifest);
app.get("/v1//v1/api/cdn/manifest", manifest);
app.get("/launching/{*path}", launching);
app.use("/cdn", require("./routes/cdn/cdnManager").default);
app.post("/api", (req, res) => {
    console.log("api call");
    const sessionId = `${req.ip}:${req.socket.remotePort}`;

    try {
        const responseBuffer = routeRequest(req.body as Buffer, sessionId);
        res.set("Content-Type", "application/octet-stream");
        res.send(responseBuffer);
    } catch (err) {
        console.error(`[${sessionId}] Unhandled error:`, err);
        res.status(500).end();
    }
});

// DB must be ready before any handler queries it.
initDb();

// handlers are loaded once at startup before the server accepts connections
loadHandlers();

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });
server.on("upgrade", (req, socket, head) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    if (url.pathname === "/ws") {
        wss.handleUpgrade(req, socket, head, (ws) => { wss.emit("connection", ws, req); });
    } else {
        socket.destroy();
    }
});
wss.on("connection", handleGamebaseWS);
server.listen(config.server.http_port, () =>
    console.log(`Server listening on :${config.server.http_port} (HTTP+WS)`));

// HTTPS listener using cert/key under <repo>/certs/ (gitignored).
const certsDir = path.join(repoRoot, "certs");
const keyPath = path.join(certsDir, "key.pem");
const certPath = path.join(certsDir, "cert.pem");
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    const opts = { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) };
    const httpsServer = https.createServer(opts, app);
    httpsServer.on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
            console.log(`Port ${config.server.https_port} in use — HTTPS disabled`);
        } else {
            console.error("HTTPS error:", err);
        }
    });
    httpsServer.listen(config.server.https_port, () =>
        console.log(`Server listening on :${config.server.https_port} (HTTPS)`));
} else {
    console.log(`No cert/key found at ${certsDir} — HTTPS disabled`);
}
