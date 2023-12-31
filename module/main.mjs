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

Hooks.on("updateScene", (scene, data) => {
    canvas.simpleFog.updateScene(scene, data);
});

Hooks.once("canvasInit", () => {
    canvas.simpleFog.canvasInit();
});

Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag("SimpleFog");
});
