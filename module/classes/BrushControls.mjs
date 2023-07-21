import { hexToPercent, percentToHex } from "../js/utils.mjs";

export default class BrushControls extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["form"],
            closeOnSubmit: false,
            submitOnChange: true,
            submitOnClose: true,
            popOut: false,
            editable: game.user.isGM,
            template: "modules/simple-fog/templates/brush-controls.html",
            id: "filter-config",
            title: game.i18n.localize("Simple Fog Options")
        });
    }

    /**
     * Obtain module metadata and merge it with game settings which track current
     * module visibility.
     *
     * @return {Object}   The data provided to the template when rendering the form
     */
    getData() {
        // Return data to the template
        return {
            brushSize: canvas.simpleFog.getUserSetting("brushSize"),
            brushOpacity: hexToPercent(
                canvas.simpleFog.getUserSetting("brushOpacity")
            )
        };
    }

    /**
     * Called upon form submission after form data is validated.
     *
     * @param event {Event}       The initial triggering submission event
     * @param formData {Object}   The object of validated form data with which
     *                            to update the object
     * @private
     */
    async _updateObject(event, formData) {
        canvas.simpleFog.setUserSetting("brushSize", formData.brushSize);
        await canvas.simpleFog.setUserSetting(
            "brushOpacity",
            percentToHex(formData.brushOpacity)
        );
        canvas.simpleFog.setPreviewTint();
    }
}
