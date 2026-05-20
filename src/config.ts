import fs from "fs";
import path from "path";
import { parse as parseToml } from "smol-toml";

export interface CannaeConfig {
    paths: {
        logs_dir: string;
        cdn_dir: string;
        cdn_manifest_file: string;
        master_db: string;
    };
    server: {
        http_port: number;
        https_port: number;
    };
    advertised: {
        host: string;
    };
}

// Walk up from __dirname looking for the toml template. This way the same
// loader works whether we're running compiled out of dist/src or directly
// out of src via ts-node — the repo root is wherever the template sits.
function findRoot(): string {
    let dir = __dirname;
    for (let i = 0; i < 6; i++) {
        if (fs.existsSync(path.join(dir, "cannae_config.default.toml"))) {
            return dir;
        }
        const parent = path.dirname(dir);
        if (parent === dir) break;
        dir = parent;
    }
    throw new Error(`cannae_config.default.toml not found in any ancestor of ${__dirname}`);
}

const ROOT = findRoot();
export const repoRoot = ROOT;
const DEFAULT_PATH = path.join(ROOT, "cannae_config.default.toml");
const LOCAL_PATH = path.join(ROOT, "cannae_config.toml");

function deepMerge<T extends Record<string, any>>(base: T, override: Partial<T>): T {
    const out: Record<string, any> = { ...base };
    for (const [k, v] of Object.entries(override)) {
        if (v && typeof v === "object" && !Array.isArray(v) && typeof out[k] === "object") {
            out[k] = deepMerge(out[k], v as any);
        } else {
            out[k] = v;
        }
    }
    return out as T;
}

function collectPlaceholders(obj: any, prefix = ""): string[] {
    const found: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
        const p = prefix ? `${prefix}.${k}` : k;
        if (v && typeof v === "object" && !Array.isArray(v)) {
            found.push(...collectPlaceholders(v, p));
        } else if (v === "PLACEHOLDER") {
            found.push(p);
        }
    }
    return found;
}

export function loadConfig(): CannaeConfig {
    if (!fs.existsSync(DEFAULT_PATH)) {
        throw new Error(`Missing template: ${DEFAULT_PATH}`);
    }
    const base = parseToml(fs.readFileSync(DEFAULT_PATH, "utf-8")) as any;

    let merged = base;
    if (fs.existsSync(LOCAL_PATH)) {
        const local = parseToml(fs.readFileSync(LOCAL_PATH, "utf-8")) as any;
        merged = deepMerge(base, local);
    } else {
        console.warn(`[config] ${LOCAL_PATH} not found; using defaults only`);
    }

    const remaining = collectPlaceholders(merged);
    if (remaining.length) {
        throw new Error(
            `cannae_config.toml has unresolved PLACEHOLDERs:\n  ` +
            remaining.join("\n  ") +
            `\n\nCopy cannae_config.default.toml to cannae_config.toml and fill these in.`
        );
    }

    return merged as CannaeConfig;
}

export const config = loadConfig();
