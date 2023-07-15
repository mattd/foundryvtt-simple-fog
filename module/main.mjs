import { onInit, onReady } from "./js/load.mjs";

import {
    onGetSceneControlButtons,
    onRenderSceneControls,
    setBrushControlPos
} from "./js/controls.mjs";

Hooks.once("init", onInit);
Hooks.once("ready", onReady);

Hooks.on("getSceneControlButtons", onGetSceneControlButtons);
Hooks.on("renderSceneControls", onRenderSceneControls);
Hooks.on("renderBrushControls", setBrushControlPos);
Hooks.on("renderSceneNavigation", setBrushControlPos);

Hooks.on("ready", () => {
    canvas.simplefog.registerMouseListeners();
    canvas.simplefog.registerKeyboardListeners();
});

Hooks.on("updateScene", (scene, data) => {
    canvas.simplefog.updateScene(scene, data);
});

Hooks.once("canvasInit", () => {
    canvas.simplefog.canvasInit();
});

Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag("simplefog");
});
