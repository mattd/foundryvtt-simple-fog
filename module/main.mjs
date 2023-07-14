import { onInit, onReady } from "./js/load.mjs";
import {
    onGetSceneControlButtons,
    onRenderSceneControls
} from "./js/controls.mjs";

Hooks.once("init", onInit);

Hooks.once("ready", onReady);

Hooks.on("getSceneControlButtons", onGetSceneControlButtons);

Hooks.on("renderSceneControls", onRenderSceneControls);

Hooks.once("canvasInit", () => {
    canvas.simplefog.canvasInit();
});

Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag("simplefog");
});
