import SimpleFogConfig from "../classes/SimpleFogConfig.mjs";
import BrushControls from "../classes/BrushControls.mjs";
import { simpleFogLogDebug } from "./utils.mjs";

/**
 * Add control buttons
 */
export const onGetSceneControlButtons = function (controls) {
    simpleFogLogDebug("controls.getSceneControlButtons");
    if (!game.user.isGM) return;
    controls.push({
        name: "simpleFog",
        title: game.i18n.localize("SimpleFog.sf"),
        icon: "fas fa-cloud",
        layer: "simpleFog",
        tools: [
            {
                name: "simpleFogToggle",
                title: game.i18n.localize("SimpleFog.onoff"),
                icon: "fas fa-eye",
                onClick: () => toggleSimpleFog(),
                active: canvas.simpleFog?.visible,
                toggle: true
            },
            {
                name: "brush",
                title: game.i18n.localize("SimpleFog.brushTool"),
                icon: "fas fa-paint-brush"
            },
            {
                name: "grid",
                title: game.i18n.localize("SimpleFog.gridTool"),
                icon: "fas fa-border-none"
            },
            {
                name: "polygon",
                title: game.i18n.localize("SimpleFog.polygonTool"),
                icon: "fas fa-draw-polygon"
            },
            {
                name: "box",
                title: game.i18n.localize("SimpleFog.boxTool"),
                icon: "far fa-square"
            },
            {
                name: "ellipse",
                title: game.i18n.localize("SimpleFog.ellipseTool"),
                icon: "far fa-circle"
            },
            {
                name: "sceneConfig",
                title: game.i18n.localize("SimpleFog.sceneConfig"),
                icon: "fas fa-cog",
                onClick: () => {
                    new SimpleFogConfig().render(true);
                },
                button: true
            },
            {
                name: "clearfog",
                title: game.i18n.localize("SimpleFog.reset"),
                icon: "fas fa-trash",
                onClick: () => {
                    const dg = new Dialog({
                        title: game.i18n.localize("SimpleFog.reset"),
                        content: game.i18n.localize("SimpleFog.confirmReset"),
                        buttons: {
                            reset: {
                                icon: '<i class="fas fa-trash"></i>',
                                label: "Reset",
                                callback: () => canvas.simpleFog.resetMask()
                            },
                            blank: {
                                icon: '<i class="fas fa-eye"></i>',
                                label: "Blank",
                                callback: () => canvas.simpleFog.blankMask()
                            },
                            cancel: {
                                icon: '<i class="fas fa-times"></i>',
                                label: "Cancel"
                            }
                        },
                        default: "reset"
                    });
                    dg.render(true);
                },
                button: true
            }
        ],
        activeTool: "brush"
    });
};

/**
 * Handles adding the custom brush controls pallet
 * and switching active brush flag
 */
export const onRenderSceneControls = function (controls) {
    simpleFogLogDebug("controls.renderSceneControls");
    // Switching to layer
    if (canvas.simpleFog != null) {
        if (
            controls.activeControl == "simpleFog" &&
            controls.activeTool != undefined
        ) {
            // Open brush tools if not already open
            if (!$("#simple-fog-brush-controls").length) {
                new BrushControls().render(true);
            }
            // Set active tool
            canvas.simplefog.setActiveTool(controls.activeTool);
        }
        // Switching away from layer
        else {
            // Clear active tool
            canvas.simpleFog.clearActiveTool();
            // Remove brush tools if open
            const bc = $("#simple-fog-brush-controls")[0];
            if (bc) bc.remove();
        }
    }
};

/**
 * Sets Y position of the brush controls to account for scene navigation buttons
 */
export const setBrushControlPos = function () {
    const brushControl = $("#simple-fog-brush-controls");
    const navigation = $("#navigation");
    if (brushControl.length && navigation.length) {
        const h = navigation.height();
        brushControl.css({ top: `${h + 30}px` });
        canvas.simpleFog.setActiveTool(canvas.simpleFog.activeTool);
    }
}

/**
 * Toggle Simple Fog
 */
function toggleSimpleFog() {
    simpleFogLogDebug("controls.toggleSimpleFog");
    if (
        game.settings.get("simple-fog", "confirmFogDisable") &&
        canvas.simpleFog.getSetting("visible")
    ) {
        let dg = Dialog.confirm({
            title: game.i18n.localize("SimpleFog.disableFog"),
            content: game.i18n.localize("SimpleFog.confirmDisableFog"),
            yes: () => toggleOffSimpleFog(),
            no: () => cancelToggleSimpleFog(),
            defaultYes: false,
            rejectClose: true
        });
        dg.then(undefined, cancelToggleSimpleFog);
    } else {
        toggleOffSimpleFog();
    }
}

function toggleOffSimpleFog() {
    canvas.simpleFog.toggle();

    // TODO: Determine replacement for canvas.sight.refresh()
    canvas.perception.refresh();
}

function cancelToggleSimpleFog(result = undefined) {
    ui.controls.controls.find(
        ({ name }) => name === "simpleFog"
    ).tools[0].active = true;
    ui.controls.render();
}
