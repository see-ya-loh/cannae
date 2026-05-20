import express, { Router, Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { config } from "../../config";

const CDN_ROOT = path.join(config.paths.cdn_dir, "assets");
const HEADERS_DIR = path.join(config.paths.cdn_dir, "meta");

const router: Router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    const baseName = path.basename(req.path).split(".")[0];
    if (!baseName) return next();
    const headerFile = path.join(HEADERS_DIR, `${baseName}.headers.json`);
    if (fs.existsSync(headerFile)) {
        try {
            const headers = JSON.parse(fs.readFileSync(headerFile, "utf-8"));
            for (const [k, v] of Object.entries(headers)) {
                if (typeof v === "string") res.set(k, v);
            }
        } catch (e) {
            console.warn(`[cdn] failed to load headers for ${baseName}:`, e);
        }
    }
    next();
});

router.use(express.static(CDN_ROOT, {
    fallthrough: true,
    redirect: false,
}));

router.use((req: Request, res: Response) => {
    console.warn(`[cdn] 404 miss: ${req.path}`);
    res.status(404).send("not found");
});

export default router;
