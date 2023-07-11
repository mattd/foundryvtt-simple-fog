import test from 'ava';

import { webToHex } from "../../../module/js/utils.mjs";

const webColor = "#c6c6c6";
const base16Color = "0xc6c6c6";

test("returns a correct base16 color when provided a web color", t => {
    const result = webToHex(webColor);
    t.is(result, base16Color);
});
