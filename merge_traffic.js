const fs = require("fs");
const path = require("path");

const srcDir  = process.argv[2];
const destDir = process.argv[3];

if (!srcDir || !destDir) {
    console.error("Usage: node merge_traffic.js <source_dir> <dest_dir>");
    process.exit(1);
}

if (!fs.existsSync(srcDir)) {
    console.error(`Source directory not found: ${srcDir}`);
    process.exit(1);
}

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created destination directory: ${destDir}`);
}

function getNextFreeIndex(dir) {
    const files = fs.readdirSync(dir);
    let max = -1;
    for (const f of files) {
        const m = f.match(/^(?:REQUEST|RESPONSE)_.+_(\d+)\.json$/);
        if (m) max = Math.max(max, parseInt(m[1], 10));
    }
    return max + 1;
}

function groupByIndex(dir) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
    const groups = new Map(); // index -> { name, request?, response? }

    for (const f of files) {
        const m = f.match(/^(REQUEST|RESPONSE)_(.+)_(\d+)\.json$/);
        if (!m) continue;
        const [, type, name, idxStr] = m;
        const idx = parseInt(idxStr, 10);

        if (!groups.has(idx)) groups.set(idx, { name, request: null, response: null });
        if (type === "REQUEST")  groups.get(idx).request  = f;
        if (type === "RESPONSE") groups.get(idx).response = f;
    }

    return [...groups.entries()].sort((a, b) => a[0] - b[0]);
}

const groups  = groupByIndex(srcDir);

if (groups.length === 0) {
    console.log("No REQUEST/RESPONSE files found in source directory.");
    process.exit(0);
}

let nextIdx = getNextFreeIndex(destDir);
console.log(`Next free index in destination: ${nextIdx}\n`);

let moved = 0;
let skipped = 0;

for (const [srcIdx, { name, request, response }] of groups) {
    const newIdx = nextIdx++;

    for (const [srcFile, prefix] of [[request, "REQUEST"], [response, "RESPONSE"]]) {
        if (!srcFile) {
            console.warn(`    No ${prefix} file for index ${srcIdx}, skipping`);
            skipped++;
            continue;
        }

        const destFile = `${prefix}_${name}_${newIdx}.json`;
        const srcPath  = path.join(srcDir, srcFile);
        const destPath = path.join(destDir, destFile);

        fs.renameSync(srcPath, destPath);
        console.log(`  ${srcFile.padEnd(40)} → ${destFile}`);
        moved++;
    }
}

console.log(`Moved ${moved} file(s), skipped ${skipped} — destination now starts at index ${nextIdx}`);