import { registerSettings } from "./settings.mjs";
import {
    simpleFogLog,
    addSimpleFogControlToggleListener,
    addSimpleFogOpacityToggleListener
} from "./utils.mjs";
import SimpleFogLayer from "../classes/SimpleFogLayer.mjs";
import SimpleFogHUDControlLayer from "../classes/SimpleFogHUDControlLayer.mjs";

export const onInit = () => {
    simpleFogLog("Initializing Simple Fog", true);

    registerSettings();

    CONFIG.Canvas.layers.simpleFog = {
        group: "interface",
        layerClass: SimpleFogLayer
    };
    CONFIG.Canvas.layers.simpleFogHUDControls = {
        group: "interface",
        layerClass: SimpleFogHUDControlLayer
    };

    Object.defineProperty(canvas, "simpleFog", {
        value: new SimpleFogLayer(),
        configurable: true,
        writable: true,
        enumerable: false
    });
    Object.defineProperty(canvas, "simpleFogHUDControls", {
        value: new SimpleFogHUDControlLayer(),
        configurable: true,
        writable: true,
        enumerable: false
    });
};

export const onReady = async () => {
    // Fix Simple Fog zIndex
    canvas.simpleFog.refreshZIndex();

    // Move object hud to tokens layer
    game.canvas.controls.hud.setParent(game.canvas.simpleFogHUDControls);

    canvas.perception.refresh();

    addSimpleFogControlToggleListener();
    addSimpleFogOpacityToggleListener();

    canvas.simpleFog.registerMouseListeners();
    canvas.simpleFog.registerKeyboardListeners();
};
