import express from "express";

import conninfo from "./conninfo";
import manifest from "./cdn/manifest";

const app = express();
app.use(express.json());

app.get("/v1/api/conninfo", conninfo);
app.get("/v1/api/cdn/manifest", manifest);
app.use("/cdn", require("./cdn/cdnManager").default);
app.post("/capture", require("./captureManager").default);
export default app;