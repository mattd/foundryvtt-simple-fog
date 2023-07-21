import SimpleFogLayer from "../classes/SimpleFogLayer.mjs";

export const registerSettings = function () {
    game.settings.register("simple-fog", "confirmFogDisable", {
        name: game.i18n.localize("SimpleFog.confirmDisablingFog"),
        hint: game.i18n.localize("SimpleFog.confirmDisablingFogNotes"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
    game.settings.register("simple-fog", "autoEnableSceneFog", {
        // TODO: Acquire and integrate translations.
        name: "Auto Enable Scene Fog",
        hint: `
            When enabled, Simple Fog will automatically be enabled for a scene
            when it is first created.
        `,
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
    game.settings.register("simple-fog", "enableHotkeys", {
        name: game.i18n.localize("SimpleFog.enableHotkeys"),
        hint: game.i18n.localize("SimpleFog.hotkeyNotes"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
    game.settings.register("simple-fog", "hotkeyTool", {
        name: game.i18n.localize("SimpleFog.hotkeyTool"),
        hint: game.i18n.localize("SimpleFog.hotkeyToolNotes"),
        scope: "world",
        config: true,
        default: "brush",
        type: String,
        choices: {
            brush: "Brush",
            grid: "Grid",
            polygon: "Polygon",
            box: "Box",
            ellipse: "Ellipse"
        }
    });
    game.settings.register("simple-fog", "zIndex", {
        name: game.i18n.localize("SimpleFog.configurableZindex"),
        hint: game.i18n.localize("SimpleFog.configurableZindexNotes"),
        scope: "world",
        config: true,
        default: 220,
        type: Number,
        onChange: SimpleFogLayer.refreshZIndex
    });
    game.settings.register("simple-fog", "debug", {
        // TODO: Acquire and integrate translations.
        name: "Debug Mode",
        hint: `
            When enabled, Simple Fog will log additional debug information to the
            console.
        `,
        scope: "client",
        config: true,
        default: false,
        type: Boolean
    });
};
