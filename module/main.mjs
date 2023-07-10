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

/**
 * Initialization helper, to set API.
 * @param api to set to game module.
 */
export function setApi(api) {
    const data = game.modules.get(CONSTANTS.MODULE_NAME);
    data.api = api;
}

/**
 * Returns the set API.
 * @returns Api from games module.
 */
export function getApi() {
    const data = game.modules.get(CONSTANTS.MODULE_NAME);
    return data.api;
}

/**
 * Initialization helper, to set Socket.
 * @param socket to set to game module.
 */
export function setSocket(socket) {
    const data = game.modules.get(CONSTANTS.MODULE_NAME);
    data.socket = socket;
}

/*
 * Returns the set socket.
 * @returns Socket from games module.
 */
export function getSocket() {
    const data = game.modules.get(CONSTANTS.MODULE_NAME);
    return data.socket;
}
