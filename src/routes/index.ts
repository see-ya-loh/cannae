import express from "express";

import conninfo from "./conninfo";
import manifest from "./cdn/manifest";

const app = express();
app.use(express.json());
app.use(express.raw({ 
    type: "application/octet-stream", 
    limit: "10mb" 
}));

app.get("/v1/api/conninfo", conninfo);
app.get("/v1/api/cdn/manifest", manifest);
app.use("/cdn", require("./cdn/cdnManager").default);
app.post("/api", require("./capture").default);
export default app;