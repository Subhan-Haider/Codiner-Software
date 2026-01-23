import { ipcMain, IpcMainInvokeEvent } from "electron";
import log from "electron-log";
import { IS_TEST_BUILD } from "../utils/test_utils";

export function createLoggedHandler(logger: log.LogFunctions) {
  return (
    channel: string,
    fn: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<any>,
    options: { logResult?: boolean; logArgs?: boolean } = { logResult: true, logArgs: true }
  ) => {
    // Remove existing handler to support HMR/reloads without error
    ipcMain.removeHandler(channel);

    ipcMain.handle(
      channel,
      async (event: IpcMainInvokeEvent, ...args: any[]) => {
        if (options.logArgs !== false) {
          logger.log(`IPC: ${channel} called with args: ${JSON.stringify(args)}`);
        } else {
          logger.log(`IPC: ${channel} called (args hidden for security)`);
        }

        try {
          const result = await fn(event, ...args);
          if (options.logResult !== false) {
            logger.log(
              `IPC: ${channel} returned: ${JSON.stringify(result)?.slice(0, 100)}...`,
            );
          } else {
            logger.log(`IPC: ${channel} returned (result hidden for security)`);
          }
          return result;
        } catch (error) {
          if (options.logArgs !== false) {
            logger.error(
              `Error in ${fn.name}: args: ${JSON.stringify(args)}`,
              error,
            );
          } else {
            logger.error(`Error in ${fn.name} (args hidden for security)`, error);
          }
          throw new Error(`[${channel}] ${error}`);
        }
      },
    );
  };
}

export function createTestOnlyLoggedHandler(logger: log.LogFunctions) {
  if (!IS_TEST_BUILD) {
    // Returns a no-op function for non-e2e test builds.
    return () => { };
  }
  return createLoggedHandler(logger);
}
