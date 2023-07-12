import { onInit, onReady } from "./js/setup.mjs";

Hooks.once("init", onInit);

Hooks.once("ready", onReady);

Hooks.once("canvasInit", canvas.simplefog.canvasInit);

Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag("simplefog");
});
