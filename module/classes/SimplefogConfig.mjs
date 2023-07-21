import { webToHex, hexToWeb } from "../js/utils.mjs";

export default class SimpleFogConfig extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["form"],
            closeOnSubmit: false,
            submitOnChange: true,
            submitOnClose: true,
            popOut: true,
            editable: game.user.isGM,
            width: 500,
            template: "modules/simple-fog/templates/scene-config.html",
            id: "simplefog-scene-config",
            title: game.i18n.localize("Simple Fog Options")
        });
    }

    /* -------------------------------------------- */

    /**
     * Obtain module metadata and merge it with game settings which track
     * current module visibility
     * @return {Object}   The data provided to the template when rendering the
     *                    form
     */
    getData() {
        // Return data to the template
        return {
            gmColorAlpha: Math.round(
                canvas.simpleFog.getSetting("gmColorAlpha") * 100
            ),
            gmColorTint: hexToWeb(canvas.simpleFog.getSetting("gmColorTint")),
            playerColorAlpha: Math.round(
                canvas.simpleFog.getSetting("playerColorAlpha") * 100
            ),
            playerColorTint: hexToWeb(
                canvas.simpleFog.getSetting("playerColorTint")
            ),
            transition: canvas.simpleFog.getSetting("transition"),
            transitionSpeed: canvas.simpleFog.getSetting("transitionSpeed"),
            blurEnable: canvas.simpleFog.getSetting("blurEnable"),
            blurRadius: canvas.simpleFog.getSetting("blurRadius"),
            blurQuality: canvas.simpleFog.getSetting("blurQuality"),
            autoVisibility: canvas.simpleFog.getSetting("autoVisibility"),
            autoVisGM: canvas.simpleFog.getSetting("autoVisGM"),
            vThreshold: Math.round(
                canvas.simpleFog.getSetting("vThreshold") * 100
            ),
            fogImageOverlayFilePath: canvas.simpleFog.getSetting(
                "fogImageOverlayFilePath"
            ),
            fogImageOverlayGMAlpha: Math.round(
                canvas.simpleFog.getSetting("fogImageOverlayGMAlpha") * 100
            ),
            fogImageOverlayPlayerAlpha: Math.round(
                canvas.simpleFog.getSetting("fogImageOverlayPlayerAlpha") * 100
            ),
            fogImageOverlayZIndex: canvas.simpleFog.getSetting(
                "fogImageOverlayZIndex"
            ),
            fogImageOverlayZIndexOptions: {
                4000: "Color Tint Above Overlay Image",
                6000: "Overlay Image Above Color Tint"
            },
            versionNotification: canvas.simpleFog.getSetting(
                "versionNotification"
            )
        };
    }

    /* -------------------------------------------- */
    /*  Event Listeners and Handlers                */
    /* -------------------------------------------- */

    /**
     * This method is called upon form submission after form data is validated
     * @param event {Event}       The initial triggering submission event
     * @param formData {Object}   The object of validated form data with which
     *                            to update the object
     * @private
     */
    async _updateObject(event, formData) {
        Object.entries(formData).forEach(async ([key, val]) => {
            // If setting is an opacity slider, convert from 1-100 to 0-1
            if (
                [
                    "gmColorAlpha",
                    "playerColorAlpha",
                    "vThreshold",
                    "fogImageOverlayGMAlpha",
                    "fogImageOverlayPlayerAlpha"
                ].includes(key)
            ) {
                val /= 100;
            }
            // If setting is a color value, convert webcolor to hex before
            // saving
            if (["gmColorTint", "playerColorTint"].includes(key)) {
                val = webToHex(val);
            }
            // Save settings to scene
            await canvas.simpleFog.setSetting(key, val);
            // If saveDefaults button clicked, also save to user's defaults
            if (event.submitter?.name === "saveDefaults") {
                canvas.simpleFog.setUserSetting(key, val);
            }
        });

        // If save button was clicked, close app
        if (event.submitter?.name === "submit") {
            Object.values(ui.windows).forEach(val => {
                if (val.id === "simple-fog-scene-config") val.close();
            });
        }

        // Update sight layer
        // TODO: Determine replacement for canvas.sight.refresh()
        canvas.perception.refresh();
    }
}
