/* SimplefogHUDControlLayer extends CanvasLayer
 *
 * Used as layer directly below simplefog for object HUD controls
 */

export default class SimplefogHUDControlLayer extends InteractionLayer {
	  constructor(layername) {
		    super();
	  }

	  static get layerOptions() {
		    return super.layerOptions;
	  }
}
