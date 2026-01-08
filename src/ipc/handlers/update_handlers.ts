import { app, net, BrowserWindow } from "electron";
import fs from "node:fs";
import path from "node:path";
import { createLoggedHandler } from "./safe_handle";
import log from "electron-log";

const logger = log.scope("update_handlers");
const handle = createLoggedHandler(logger);

export function registerUpdateHandlers() {
    handle("get-latest-release", async () => {
        logger.info("Fetching latest release from GitHub");
        return new Promise((resolve, reject) => {
            const request = net.request({
                method: "GET",
                protocol: "https:",
                hostname: "api.github.com",
                path: "/repos/Subhan-Haider/Codiner-SH/releases/latest",
                headers: {
                    "User-Agent": "Codiner",
                },
            });

            request.on("response", (response) => {
                let data = "";
                response.on("data", (chunk) => {
                    data += chunk.toString();
                });
                response.on("end", () => {
                    try {
                        if (response.statusCode !== 200) {
                            reject(new Error(`Failed to fetch release: ${response.statusCode} ${data}`));
                            return;
                        }
                        const release = JSON.parse(data);
                        resolve(release);
                    } catch (e) {
                        reject(e);
                    }
                });
            });

            request.on("error", (error) => {
                reject(error);
            });

            request.end();
        });
    });

    handle("download-update", async (event, release: any) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        if (!win) return;

        const platform = process.platform;
        let asset: any;

        if (platform === "win32") {
            asset = release.assets.find((a: any) => a.name.endsWith(".exe"));
        } else if (platform === "darwin") {
            asset = release.assets.find((a: any) => a.name.endsWith(".dmg"));
        } else if (platform === "linux") {
            asset = release.assets.find((a: any) => a.name.endsWith(".AppImage") || a.name.endsWith(".deb"));
        }

        if (!asset) {
            throw new Error(`No compatible asset found for platform ${platform}`);
        }

        const savePath = path.join(app.getPath("downloads"), asset.name);
        logger.info(`Downloading update to ${savePath} from ${asset.browser_download_url}`);

        return new Promise((resolve, reject) => {
            // GitHub release assets usually redirect to a S3 bucket, 
            // net.request handles redirects by default if not specified otherwise.
            const request = net.request(asset.browser_download_url);

            request.on("response", (response) => {
                const total = Number(response.headers["content-length"]);
                let received = 0;

                const file = fs.createWriteStream(savePath);

                response.on("data", (chunk) => {
                    received += chunk.length;
                    const percent = Math.floor((received / total) * 100);
                    win.webContents.send("update-progress", percent);
                });

                // Use pipe for efficiency
                response.on("end", () => {
                    file.end();
                });

                (response as any).pipe(file);

                file.on("finish", () => {
                    logger.info("Download complete");
                    win.webContents.send("update-done", savePath);
                    resolve({ success: true, path: savePath });
                });

                file.on("error", (err) => {
                    reject(err);
                });
            });

            request.on("error", (err) => {
                reject(err);
            });

            request.end();
        });
    });
}
