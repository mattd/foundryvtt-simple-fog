import test from 'ava';

import { hexToWeb } from "../../../module/js/utils.mjs";

const base16Color = "0xc6c6c6";
const webColor = "#c6c6c6";

test("returns a correct web color when provided a base16 color", t => {
    const result = hexToWeb(base16Color);
    t.is(result, webColor);
});
