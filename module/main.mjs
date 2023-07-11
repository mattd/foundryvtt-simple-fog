import CONSTANTS from "./js/constants.mjs";
import { registerSettings } from "./js/settings.mjs";
import { initHooks, setupHooks, readyHooks } from "./js/simplefog.mjs";

Hooks.once("init", async () => {
    console.log(
        `${CONSTANTS.MODULE_NAME} | Initializing ${CONSTANTS.MODULE_NAME}`
    );
    registerSettings();
    initHooks();
});

Hooks.once("setup", function () {
    setupHooks();
});

Hooks.once("ready", async () => {
    readyHooks();
});

Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag("simplefog");
});
