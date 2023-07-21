/* SimpleFogHUDControlLayer extends CanvasLayer
 *
 * Used as layer directly below Simple Fog for object HUD controls
 */

export default class SimpleFogHUDControlLayer extends InteractionLayer {
    constructor() {
        super();
    }

    static get layerOptions() {
        return super.layerOptions;
    }
}
