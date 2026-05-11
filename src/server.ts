import express from "express";
import { loadHandlers } from "./core/registry";
import { routeRequest } from "./core/router";
import conninfo from "./routes/conninfo";
import manifest from "./routes/cdn/manifest";

const app = express();

app.use(express.raw({ type: "application/octet-stream", limit: "10mb" }));
app.get("/v1/api/conninfo", conninfo);
app.get("/v1/api/cdn/manifest", manifest);
app.use("/cdn", require("./routes/cdn/cdnManager").default);
//app.post("/api", require("./capture").default);
app.post("/api", (req, res) => {
    console.log("api call")
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

// handlers are loaded once at startup before the server accepts connections
loadHandlers();
app.listen(3000, () => console.log("Server listening on :3000"));