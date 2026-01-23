import { createLoggedHandler } from "./safe_handle";
import log from "electron-log";
import type { UserSettings } from "../../lib/schemas";
import { writeSettings, readSettings } from "../../main/settings";

const logger = log.scope("settings_handlers");
const handle = createLoggedHandler(logger);

export function registerSettingsHandlers() {
  handle("get-user-settings", async () => {
    const settings = readSettings();
    return settings;
  }, { logResult: false }); // Do not log potentially sensitive settings

  handle(
    "set-user-settings",
    async (_, settings: Partial<UserSettings>) => {
      writeSettings(settings);
      return readSettings();
    },
    { logArgs: false, logResult: false } // Do not log sensitive args or results
  );
}
