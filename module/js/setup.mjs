import { registerSettings } from "./settings.mjs";
import {
    simplefogLog,
    addSimplefogControlToggleListener,
    addSimplefogOpacityToggleListener
} from "./utils.mjs";
import SimplefogLayer from "../classes/SimplefogLayer.mjs";
import SimplefogMigrations from "../classes/SimplefogMigrations.mjs";
import SimplefogHUDControlLayer from "../classes/SimplefogHUDControlLayer.mjs";
import SimplefogNotification from "../classes/SimplefogNotification.mjs";

export const onInit = () => {
    simplefogLog("Initializing simplefog", true);

    registerSettings();

    CONFIG.Canvas.layers.simplefog = {
        group: "interface",
        layerClass: SimplefogLayer
    };
    CONFIG.Canvas.layers.simplefogHUDControls = {
        group: "interface",
        layerClass: SimplefogHUDControlLayer
    };

    Object.defineProperty(canvas, "simplefog", {
        value: new SimplefogLayer(),
        configurable: true,
        writable: true,
        enumerable: false
    });
    Object.defineProperty(canvas, "simplefogHUDControls", {
        value: new SimplefogHUDControlLayer(),
        configurable: true,
        writable: true,
        enumerable: false
    });
};

export const onReady = async () => {
    // Check if any migrations need to be performed
    SimplefogMigrations.check();

    // Fix simplefog zIndex
    canvas.simplefog.refreshZIndex();

    // Move object hud to tokens layer
    game.canvas.controls.hud.setParent(game.canvas.simplefogHUDControls);

    // Check if new version; if so send DM to GM
    SimplefogNotification.checkVersion();

    canvas.perception.refresh();

    addSimplefogControlToggleListener();
    addSimplefogOpacityToggleListener();
};
