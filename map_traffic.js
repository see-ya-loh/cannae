/**
 * map_traffic.js
 *
 * Scans a traffic directory for REQUEST_<name>_<n>.json + RESPONSE_<name>_<n>.json pairs,
 * maps the *Req field to the list of *Rsp fields in the responses array,
 * and saves the result to a text file.
 *
 * Usage: node map_traffic.js [traffic_dir] [output_file]
 */

const fs = require("fs");
const path = require("path");

const trafficDir = process.argv[2] || "./traffic";
const outputFile = process.argv[3] || "./traffic_map.txt";

// --- Find all REQUEST files and extract name + index ---
const allFiles = fs.readdirSync(trafficDir);

const requestFiles = allFiles
    .filter(f => f.startsWith("REQUEST_") && f.endsWith(".json"))
    .map(f => {
        const m = f.match(/^REQUEST_(.+)_(\d+)\.json$/);
        if (!m) return null;
        return { file: f, name: m[1], index: parseInt(m[2], 10) };
    })
    .filter(Boolean)
    .sort((a, b) => a.index - b.index);

if (requestFiles.length === 0) {
    console.error(`❌ No REQUEST_*.json files found in ${trafficDir}`);
    process.exit(1);
}

// --- Map req -> [rsps], tracking which pairs were missing/broken ---
// Use a Map of reqField -> Set of rspFields to deduplicate
const mapping = new Map();   // reqField -> Set<rspField>
const lines = [];            // ordered log for the text file
const stats = { pairs: 0, missing: 0, noReq: 0, noResponses: 0 };

for (const { file, name, index } of requestFiles) {
    const responseName = `RESPONSE_${name}_${index}.json`;
    const requestPath  = path.join(trafficDir, file);
    const responsePath = path.join(trafficDir, responseName);

    // --- Parse request ---
    let reqJson;
    try {
        reqJson = JSON.parse(fs.readFileSync(requestPath, "utf8"));
    } catch (e) {
        lines.push(`[${index}] ⚠️  Could not parse ${file}: ${e.message}`);
        continue;
    }

    const reqField = Object.keys(reqJson).find(k => k.endsWith("Req"));
    if (!reqField) {
        lines.push(`[${index}] ⚠️  No *Req field found in ${file} (keys: ${Object.keys(reqJson).join(", ")})`);
        stats.noReq++;
        continue;
    }

    // --- Check response file exists ---
    if (!fs.existsSync(responsePath)) {
        lines.push(`[${index}] ⚠️  ${reqField} → (no matching ${responseName})`);
        stats.missing++;
        continue;
    }

    // --- Parse response ---
    let rspJson;
    try {
        rspJson = JSON.parse(fs.readFileSync(responsePath, "utf8"));
    } catch (e) {
        lines.push(`[${index}] ⚠️  Could not parse ${responseName}: ${e.message}`);
        continue;
    }

    const responses = rspJson.responses;
    if (!Array.isArray(responses) || responses.length === 0) {
        lines.push(`[${index}] ⚠️  ${reqField} → (empty or missing responses array in ${responseName})`);
        stats.noResponses++;
        continue;
    }

    const rspFields = responses
        .flatMap(r => Object.keys(r).filter(k => k.endsWith("Rsp")));

    // Deduplicate within this response
    const uniqueRspFields = [...new Set(rspFields)];

    // Accumulate into the global map
    if (!mapping.has(reqField)) mapping.set(reqField, new Set());
    uniqueRspFields.forEach(r => mapping.get(reqField).add(r));

    lines.push(`[${index}] ${reqField} -> ${uniqueRspFields.join(", ")}`);
    stats.pairs++;
}

// --- Build deduplicated summary ---
const summaryLines = [];
summaryLines.push("=".repeat(80));
summaryLines.push("DEDUPLICATED MAP (unique req -> all observed rsp combinations)");
summaryLines.push("=".repeat(80));

const sortedKeys = [...mapping.keys()].sort();
for (const req of sortedKeys) {
    const rsps = [...mapping.get(req)].sort().join(", ");
    summaryLines.push(`${req.padEnd(55)} -> ${rsps}`);
}

// --- Compose full output ---
const output = [
    "=".repeat(80),
    `TRAFFIC MAP — generated ${new Date().toISOString()}`,
    `Directory : ${path.resolve(trafficDir)}`,
    `Pairs found: ${stats.pairs}  |  Missing response: ${stats.missing}  |  No *Req field: ${stats.noReq}`,
    "=".repeat(80),
    "",
    "CHRONOLOGICAL LOG",
    "-".repeat(80),
    ...lines,
    "",
    ...summaryLines,
].join("\n");

fs.writeFileSync(outputFile, output);
console.log(output);
console.log(`\n✅ Saved to ${outputFile}`);