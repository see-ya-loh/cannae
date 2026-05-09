/**
 * proto_to_ts.js
 *
 * Converts .proto message definitions to TypeScript interfaces + a codec
 * helper (toProto / fromProto) so you can encode/decode proto messages
 * directly from typed TS objects.
 *
 * Usage:
 *   node proto_to_ts.js <proto_file> [output_ts_file]
 *   node proto_to_ts.js ./proto/cannae_protocol.proto ./src/types/cannae_protocol.ts
 */

const fs   = require("fs");
const path = require("path");

// ─── Proto → TS primitive map ────────────────────────────────────────────────
const PRIMITIVE_MAP = {
    double:   "number",
    float:    "number",
    int32:    "number",
    int64:    "string",   // int64 is represented as string to avoid JS precision loss
    uint32:   "number",
    uint64:   "string",
    sint32:   "number",
    sint64:   "string",
    fixed32:  "number",
    fixed64:  "string",
    sfixed32: "number",
    sfixed64: "string",
    bool:     "boolean",
    string:   "string",
    bytes:    "string",   // base64 string
};

// ─── Parser ──────────────────────────────────────────────────────────────────

function stripComments(src) {
    // remove // line comments and /* block comments */
    return src
        .replace(/\/\/[^\n]*/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "");
}

function parseProto(filePath, visited = new Set()) {
    if (visited.has(filePath)) return { messages: {}, enums: {}, imports: [] };
    visited.add(filePath);

    const src     = stripComments(fs.readFileSync(filePath, "utf8"));
    const dir     = path.dirname(filePath);
    const result  = { messages: {}, enums: {}, imports: [] };

    // collect imports and recursively parse them first
    const importRe = /import\s+"([^"]+)"/g;
    let m;
    while ((m = importRe.exec(src)) !== null) {
        const importPath = path.join(dir, m[1]);
        if (fs.existsSync(importPath)) {
            const imported = parseProto(importPath, visited);
            Object.assign(result.messages, imported.messages);
            Object.assign(result.enums,    imported.enums);
            result.imports.push(m[1]);
        } else {
            console.warn(`  ⚠️  Import not found: ${importPath}`);
        }
    }

    // parse enums
    const enumRe = /enum\s+(\w+)\s*\{([^}]+)\}/gs;
    while ((m = enumRe.exec(src)) !== null) {
        const name   = m[1];
        const body   = m[2];
        const values = [];
        const valRe  = /(\w+)\s*=\s*(-?\d+)\s*;/g;
        let v;
        while ((v = valRe.exec(body)) !== null) {
            values.push({ name: v[1], value: parseInt(v[2], 10) });
        }
        result.enums[name] = values;
    }

    // parse messages (handles one level of nesting via two passes)
    // first pass: extract top-level message blocks
    function extractMessages(source) {
        const msgs = {};
        const re   = /message\s+(\w+)\s*\{/g;
        let match;
        while ((match = re.exec(source)) !== null) {
            const name  = match[1];
            const start = match.index + match[0].length;
            let depth   = 1;
            let i       = start;
            let body    = "";
            while (i < source.length && depth > 0) {
                if (source[i] === "{") depth++;
                else if (source[i] === "}") depth--;
                if (depth > 0) body += source[i];
                i++;
            }
            msgs[name] = { body, start, end: i };
        }
        return msgs;
    }

    const rawMessages = extractMessages(src);

    for (const [name, { body }] of Object.entries(rawMessages)) {
        const fields = [];

        // also parse any nested messages inside this block
        const nestedMsgs = extractMessages(body);
        for (const [nestedName, nested] of Object.entries(nestedMsgs)) {
            // register nested messages as top-level (proto3 scoping is flat for our purposes)
            if (!result.messages[nestedName]) {
                result.messages[nestedName] = parseFields(nested.body);
            }
        }

        // strip nested message bodies before parsing fields of this message
        let flatBody = body;
        for (const { start, end } of Object.values(nestedMsgs)) {
            flatBody = flatBody.slice(0, start) + " ".repeat(end - start) + flatBody.slice(end);
        }

        result.messages[name] = parseFields(flatBody);
    }

    return result;
}

function parseFields(body) {
    const fields = [];
    // matches: [repeated] [optional] TypeName fieldName = N;
    const fieldRe = /^\s*(repeated\s+|optional\s+)?(\w+)\s+(\w+)\s*=\s*\d+\s*;/gm;
    let m;
    while ((m = fieldRe.exec(body)) !== null) {
        const repeated = !!m[1]?.trim().startsWith("repeated");
        const type     = m[2];
        const name     = m[3];
        if (type === "option" || name === "option") continue; // skip proto options
        fields.push({ name, type, repeated });
    }
    return fields;
}

// ─── Code generator ──────────────────────────────────────────────────────────

function resolveType(type, enums, messages) {
    if (PRIMITIVE_MAP[type])  return { ts: PRIMITIVE_MAP[type], kind: "primitive" };
    if (enums[type])          return { ts: type,                kind: "enum" };
    if (messages[type])       return { ts: type,                kind: "message" };
    return { ts: type, kind: "unknown" }; // external / unresolved
}

function generateEnum(name, values) {
    const lines = [`export enum ${name} {`];
    for (const { name: vName, value } of values) {
        lines.push(`  ${vName} = ${value},`);
    }
    lines.push("}");
    return lines.join("\n");
}

function generateInterface(name, fields, enums, messages) {
    const lines = [`export interface ${name} {`];
    for (const { name: fName, type, repeated } of fields) {
        const { ts, kind } = resolveType(type, enums, messages);
        const arr          = repeated ? "[]" : "";
        const comment      = kind === "unknown" ? ` // ⚠️ unresolved type` : "";
        lines.push(`  ${fName}${repeated ? "" : "?"}: ${ts}${arr};${comment}`);
    }
    lines.push("}");
    return lines.join("\n");
}

function generateCodec(messages, enums) {
    return `
// ─── Codec helpers ────────────────────────────────────────────────────────────
// Requires: npm install protobufjs
// Usage:
//   import { encode, decode } from "./codec";
//   const buf  = encode("MsgUser", myUser);
//   const user = decode<MsgUser>("MsgUser", buf);

import protobufjs from "protobufjs";

let _root: protobufjs.Root | null = null;

export function loadProto(protoPath: string): Promise<protobufjs.Root> {
    return new Promise((resolve, reject) => {
        protobufjs.load(protoPath, (err, root) => {
            if (err || !root) return reject(err);
            _root = root;
            resolve(root);
        });
    });
}

function getRoot(): protobufjs.Root {
    if (!_root) throw new Error("Proto not loaded. Call loadProto() first.");
    return _root;
}

/** Encode a typed object into raw protobuf bytes */
export function encode<T extends object>(messageName: string, obj: T): Uint8Array {
    const Type = getRoot().lookupType(messageName);
    const err  = Type.verify(obj);
    if (err) throw new Error(\`encode(\${messageName}): \${err}\`);
    return Type.encode(Type.fromObject(obj)).finish();
}

/** Decode raw protobuf bytes into a typed object */
export function decode<T>(messageName: string, buf: Uint8Array | Buffer): T {
    const Type = getRoot().lookupType(messageName);
    return Type.decode(buf).toJSON() as T;
}

/** Encode to base64 string (for HTTP transport) */
export function encodeBase64<T extends object>(messageName: string, obj: T): string {
    return Buffer.from(encode(messageName, obj)).toString("base64");
}

/** Decode from base64 string */
export function decodeBase64<T>(messageName: string, b64: string): T {
    return decode<T>(messageName, Buffer.from(b64, "base64"));
}
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const protoFile  = process.argv[2];
const outputFile = process.argv[3] || protoFile?.replace(/\.proto$/, ".ts");

if (!protoFile) {
    console.error("Usage: node proto_to_ts.js <proto_file> [output.ts]");
    process.exit(1);
}

if (!fs.existsSync(protoFile)) {
    console.error(`❌ File not found: ${protoFile}`);
    process.exit(1);
}

console.log(`\n📦 Parsing ${path.basename(protoFile)}...`);
const { messages, enums } = parseProto(path.resolve(protoFile));

const enumNames   = Object.keys(enums);
const msgNames    = Object.keys(messages);
console.log(`   Found ${msgNames.length} messages, ${enumNames.length} enums\n`);

const sections = [
    `// Auto-generated from ${path.basename(protoFile)}`,
    `// Generated at ${new Date().toISOString()}`,
    `// DO NOT EDIT MANUALLY\n`,
];

// enums first
if (enumNames.length > 0) {
    sections.push("// ─── Enums ──────────────────────────────────────────────\n");
    for (const name of enumNames.sort()) {
        sections.push(generateEnum(name, enums[name]));
        console.log(`  enum     ${name} (${enums[name].length} values)`);
    }
}

// interfaces
if (msgNames.length > 0) {
    sections.push("\n// ─── Interfaces ─────────────────────────────────────────\n");
    for (const name of msgNames.sort()) {
        sections.push(generateInterface(name, messages[name], enums, messages));
        console.log(`  interface ${name} (${messages[name].length} fields)`);
    }
}

// codec
sections.push(generateCodec(messages, enums));

fs.writeFileSync(outputFile, sections.join("\n\n"));
console.log(`\n✅ Written to ${outputFile}`);