import { createLoggedHandler } from "./safe_handle";
import log from "electron-log";
import { runShellCommand } from "../utils/runShellCommand";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const logger = log.scope("firebase_handlers");
const handle = createLoggedHandler(logger);

export function registerFirebaseHandlers() {
    handle("firebase:is-installed", async () => {
        try {
            await execAsync("firebase --version");
            return true;
        } catch {
            // Fallback check for Windows if not in PATH yet
            try {
                // Check if the file exists using fs.stat functionality (via shell for simplicity here or pure node)
                // We will try to execute it directly with full path
                await execAsync(`"C:\\Users\\setup\\AppData\\Roaming\\npm\\firebase.cmd" --version`);
                return true;
            } catch {
                return false;
            }
        }
    });

    handle("firebase:get-auth-state", async () => {
        const getOutput = async (cmd: string) => {
            try {
                return await runShellCommand(cmd);
            } catch {
                return null;
            }
        }

        try {
            // firebase login:list returns a list of logged in accounts
            let output = await getOutput("firebase login:list");

            if (!output) {
                // Try full path
                output = await getOutput(`"C:\\Users\\setup\\AppData\\Roaming\\npm\\firebase.cmd" login:list`);
            }

            if (!output) return { loggedIn: false };

            // If output contains any email, it means someone is logged in
            const hasAccount = /Logged in as (.*)/.test(output);
            const emailMatch = output.match(/Logged in as (.*)/);

            return {
                loggedIn: hasAccount,
                email: emailMatch ? emailMatch[1] : null
            };
        } catch (error) {
            logger.error("Error getting firebase auth state:", error);
            return { loggedIn: false };
        }
    });

    handle("firebase:login", async () => {
        try {
            await execAsync("firebase login");
            return true;
        } catch (error: any) {
            // Try full path
            try {
                await execAsync(`"C:\\Users\\setup\\AppData\\Roaming\\npm\\firebase.cmd" login`);
                return true;
            } catch (innerError: any) {
                logger.error("Firebase login failed:", innerError);
                throw new Error(`Firebase login failed: ${innerError.message}`);
            }
        }
    });

    handle("firebase:logout", async () => {
        try {
            await execAsync("firebase logout");
            return true;
        } catch (error: any) {
            // Try full path
            try {
                await execAsync(`"C:\\Users\\setup\\AppData\\Roaming\\npm\\firebase.cmd" logout`);
                return true;
            } catch (innerError: any) {
                logger.error("Firebase logout failed:", innerError);
                throw new Error(`Firebase logout failed: ${innerError.message}`);
            }
        }
    });

    handle("firebase:deploy", async (_, appId: number) => {
        // This would require context of the app path
        // For now, let's just implement the shell
        return "Not implemented yet - requires app path";
    });
}
