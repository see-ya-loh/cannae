/**
 * parse_protocol_ids.js
 *
 * Reads the Response message from a .proto file and generates a JSON map of:
 *   protocolId (number) -> rspFieldName (string)
 *   rspFieldName (string) -> protocolId (number)
 *
 * Usage: node parse_protocol_ids.js <proto_file> [output_json]
 */

const fs = require("fs");
const path = require("path");

const protoPath = process.argv[2] || "./proto/cannae_protocol.proto";
const outputPath = process.argv[3] || "./protocol_ids.json";

// --- Read file ---
if (!fs.existsSync(protoPath)) {
    console.error(`❌ File not found: ${protoPath}`);
    process.exit(1);
}
const content = fs.readFileSync(protoPath, "utf8");

// --- Extract Response message block (handles nested braces) ---
function extractMessageBlock(src, messageName) {
    const startRe = new RegExp(`message\\s+${messageName}\\s*\\{`);
    const startMatch = src.match(startRe);
    if (!startMatch) return null;

    let i = startMatch.index + startMatch[0].length;
    let depth = 1;
    let block = "";

    while (i < src.length && depth > 0) {
        const ch = src[i];
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
        if (depth > 0) block += ch;
        i++;
    }
    return block;
}

const responseBlock = extractMessageBlock(content, "Response");
if (!responseBlock) {
    console.error("❌ Could not find 'message Response' in proto file");
    process.exit(1);
}

// --- Parse fields ---
// Matches lines like:
//   RspServerTime serverTimeRsp = 102;
//   repeated RspFoo fooRsp = 999;
const fieldRe = /^\s*(?:repeated\s+)?(\w+)\s+(\w+)\s*=\s*(\d+)\s*;/gm;

const byId = {};       // 102 -> "serverTimeRsp"
const byName = {};     // "serverTimeRsp" -> 102
const skipped = [];    // fields that don't end in Rsp

let match;
while ((match = fieldRe.exec(responseBlock)) !== null) {
    const [, type, fieldName, fieldNumber] = match;
    const id = parseInt(fieldNumber, 10);

    if (fieldName.endsWith("Rsp")) {
        // Derive the matching Req name by convention
        const reqName = fieldName.replace(/Rsp$/, "Req");

        byId[id] = fieldName;
        byName[fieldName] = {
            protocolId: id,
            type,
            reqName,
        };
    } else {
        skipped.push(`${fieldName} = ${fieldNumber}`);
    }
}

if (Object.keys(byId).length === 0) {
    console.error("❌ No *Rsp fields found in Response message");
    process.exit(1);
}

// --- Build output ---
const output = {
    _meta: {
        source: path.resolve(protoPath),
        generatedAt: new Date().toISOString(),
        totalMapped: Object.keys(byId).length,
    },
    byId,
    byName,
};

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

// --- Log results ---
console.log(`✅ Parsed ${path.basename(protoPath)}\n`);
console.log(`${"protocolId".padEnd(14)} ${"Field name".padEnd(45)} Type`);
console.log("-".repeat(80));

Object.entries(byId)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .forEach(([id, name]) => {
        const { type } = byName[name];
        console.log(`${String(id).padEnd(14)} ${name.padEnd(45)} ${type}`);
    });

console.log("-".repeat(80));
console.log(`✅ ${Object.keys(byId).length} response types mapped → ${outputPath}`);

if (skipped.length > 0) {
    console.log(`\nSkipped (not *Rsp): ${skipped.join(", ")}`);
}