/*
 * Provides a mechanism to send whisper to GM when new version installed.
 */
import { dmToGM } from "../js/utils.mjs";

export default class SimplefogNotification {
    constructor() {}

    static checkVersion() {
        const packageVersion = game.modules.get("simplefog").version;

        if (
            game.user.isGM &&
            game.user.getFlag("simplefog", "versionNotification") !==
                packageVersion
        ) {
            // GM has never seen current version message
            dmToGM(
                game.i18n.localize("SIMPLEFOG.versionNotification"),
                undefined
            );

            // Update the saved version
            game.user.setFlag(
                "simplefog",
                "versionNotification",
                packageVersion
            );
        }
    }
}
