const fs = require("fs");
const path = require("path");

function scanResponses(dir = ".") {
    const files = fs.readdirSync(dir).filter(f => f.startsWith("RESPONSE") && f.endsWith(".json"));

    if (files.length === 0) {
        console.log("No RESPONSE*.json files found in", dir);
        return;
    }

    console.log(`Found ${files.length} RESPONSE file(s) in ${dir}\n`);

    const counts = {};

    for (const file of files) {
        let parsed;
        try {
            parsed = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
        } catch (e) {
            console.warn(`⚠️  Skipping ${file}: invalid JSON (${e.message})`);
            continue;
        }

        const responses = parsed.responses;
        if (!Array.isArray(responses)) {
            console.warn(`⚠️  Skipping ${file}: no "responses" array`);
            continue;
        }

        for (const item of responses) {
            for (const key of Object.keys(item)) {
                if (key.endsWith("Rsp")) {
                    counts[key] = (counts[key] || 0) + 1;
                }
            }
        }
    }

    // Sort by count descending
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    if (sorted.length === 0) {
        console.log("No *Rsp fields found.");
        return;
    }

    console.log(`${"Response type".padEnd(60)} Count`);
    console.log("-".repeat(68));
    for (const [key, count] of sorted) {
        console.log(`${key.padEnd(60)} x${count}`);
    }
    console.log("-".repeat(68));
    console.log(`${String(sorted.length) + " unique response types".padEnd(60)} ${sorted.reduce((s, [, c]) => s + c, 0)} total`);
}

const dir = process.argv[2] || ".";
scanResponses(dir);