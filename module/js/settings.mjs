import SimplefogLayer from "../classes/SimplefogLayer.mjs";

export const registerSettings = function () {
    game.settings.register("simplefog", "confirmFogDisable", {
        name: game.i18n.localize("SIMPLEFOG.confirmDisablingFog"),
        hint: game.i18n.localize("SIMPLEFOG.confirmDisablingFogNotes"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
    game.settings.register("simplefog", "autoEnableSceneFog", {
        // TODO: Acquire and integrate translations.
        name: "Auto Enable Scene Fog",
        hint: `
            When enabled, Simplefog will automatically be enabled for a scene
            when it is first created.
        `,
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
    game.settings.register("simplefog", "enableHotkeys", {
        name: game.i18n.localize("SIMPLEFOG.enableHotkeys"),
        hint: game.i18n.localize("SIMPLEFOG.hotkeyNotes"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
    game.settings.register("simplefog", "hotkeyTool", {
        name: game.i18n.localize("SIMPLEFOG.hotkeyTool"),
        hint: game.i18n.localize("SIMPLEFOG.hotkeyToolNotes"),
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
    game.settings.register("simplefog", "zIndex", {
        name: game.i18n.localize("SIMPLEFOG.configurableZindex"),
        hint: game.i18n.localize("SIMPLEFOG.configurableZindexNotes"),
        scope: "world",
        config: true,
        default: 220,
        type: Number,
        onChange: SimplefogLayer.refreshZIndex
    });
    game.settings.register("simplefog", "debug", {
        // TODO: Acquire and integrate translations.
        name: "Debug Mode",
        hint: `
            When enabled, Simplefog will log additional debug information to the
            console.
        `,
        scope: "client",
        config: true,
        default: false,
        type: Boolean
    });
};
