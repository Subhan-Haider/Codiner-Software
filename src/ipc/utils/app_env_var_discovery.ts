
import * as fs from "fs";
import * as path from "path";
import { getCodinerAppPath } from "../../paths/paths";

/**
 * Scans the codebase for environment variable usages (process.env.VARIABLE_NAME)
 * and returns a list of discovered keys.
 */
export async function discoverEnvVarsInCodebase(appPath: string): Promise<string[]> {
    const fullAppPath = getCodinerAppPath(appPath);
    const discoveredKeys = new Set<string>();

    // Extensions to scan
    const extensions = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"];

    async function scanDirectory(currentPath: string) {
        let entries: fs.Dirent[];
        try {
            entries = await fs.promises.readdir(currentPath, { withFileTypes: true });
        } catch (error) {
            return;
        }

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);

            // Skip node_modules, .git, .next, etc.
            if (entry.isDirectory()) {
                if (["node_modules", ".git", ".next", "dist", "build"].includes(entry.name)) {
                    continue;
                }
                await scanDirectory(fullPath);
                continue;
            }

            if (extensions.includes(path.extname(entry.name).toLowerCase())) {
                try {
                    const content = await fs.promises.readFile(fullPath, "utf8");

                    // Regex to find process.env.VARIABLE_NAME or process.env["VARIABLE_NAME"]
                    const dotPattern = /process\.env\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
                    const bracketPattern = /process\.env\[["']([a-zA-Z_][a-zA-Z0-9_]*)["']\]/g;
                    // Also support import.meta.env.VARIABLE_NAME (Vite)
                    const vitePattern = /import\.meta\.env\.([a-zA-Z_][a-zA-Z0-9_]*)/g;

                    let match;
                    while ((match = dotPattern.exec(content)) !== null) {
                        discoveredKeys.add(match[1]);
                    }
                    while ((match = bracketPattern.exec(content)) !== null) {
                        discoveredKeys.add(match[1]);
                    }
                    while ((match = vitePattern.exec(content)) !== null) {
                        discoveredKeys.add(match[1]);
                    }
                } catch (error) {
                    // Ignore read errors
                }
            }
        }
    }

    await scanDirectory(fullAppPath);

    // Remove common built-in ones if we want, or just return all
    const commonIgnores = ["NODE_ENV", "BASE_URL", "MODE", "DEV", "PROD", "SSR"];
    return Array.from(discoveredKeys).filter(key => !commonIgnores.includes(key)).sort();
}
