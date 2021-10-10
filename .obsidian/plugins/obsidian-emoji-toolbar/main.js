'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var orderedEmoji = [
	"😀",
	"😃",
	"😄",
	"😁",
	"😆",
	"😅",
	"🤣",
	"😂",
	"🙂",
	"🙃",
	"😉",
	"😊",
	"😇",
	"🥰",
	"😍",
	"🤩",
	"😘",
	"😗",
	"☺️",
	"😚",
	"😙",
	"🥲",
	"😋",
	"😛",
	"😜",
	"🤪",
	"😝",
	"🤑",
	"🤗",
	"🤭",
	"🤫",
	"🤔",
	"🤐",
	"🤨",
	"😐",
	"😑",
	"😶",
	"😏",
	"😒",
	"🙄",
	"😬",
	"🤥",
	"😌",
	"😔",
	"😪",
	"🤤",
	"😴",
	"😷",
	"🤒",
	"🤕",
	"🤢",
	"🤮",
	"🤧",
	"🥵",
	"🥶",
	"🥴",
	"😵",
	"🤯",
	"🤠",
	"🥳",
	"🥸",
	"😎",
	"🤓",
	"🧐",
	"😕",
	"😟",
	"🙁",
	"☹️",
	"😮",
	"😯",
	"😲",
	"😳",
	"🥺",
	"😦",
	"😧",
	"😨",
	"😰",
	"😥",
	"😢",
	"😭",
	"😱",
	"😖",
	"😣",
	"😞",
	"😓",
	"😩",
	"😫",
	"🥱",
	"😤",
	"😡",
	"😠",
	"🤬",
	"😈",
	"👿",
	"💀",
	"☠️",
	"💩",
	"🤡",
	"👹",
	"👺",
	"👻",
	"👽",
	"👾",
	"🤖",
	"😺",
	"😸",
	"😹",
	"😻",
	"😼",
	"😽",
	"🙀",
	"😿",
	"😾",
	"🙈",
	"🙉",
	"🙊",
	"💋",
	"💌",
	"💘",
	"💝",
	"💖",
	"💗",
	"💓",
	"💞",
	"💕",
	"💟",
	"❣️",
	"💔",
	"❤️",
	"🧡",
	"💛",
	"💚",
	"💙",
	"💜",
	"🤎",
	"🖤",
	"🤍",
	"💯",
	"💢",
	"💥",
	"💫",
	"💦",
	"💨",
	"🕳️",
	"💣",
	"💬",
	"👁️‍🗨️",
	"🗨️",
	"🗯️",
	"💭",
	"💤",
	"👋",
	"🤚",
	"🖐️",
	"✋",
	"🖖",
	"👌",
	"🤌",
	"🤏",
	"✌️",
	"🤞",
	"🤟",
	"🤘",
	"🤙",
	"👈",
	"👉",
	"👆",
	"🖕",
	"👇",
	"☝️",
	"👍",
	"👎",
	"✊",
	"👊",
	"🤛",
	"🤜",
	"👏",
	"🙌",
	"👐",
	"🤲",
	"🤝",
	"🙏",
	"✍️",
	"💅",
	"🤳",
	"💪",
	"🦾",
	"🦿",
	"🦵",
	"🦶",
	"👂",
	"🦻",
	"👃",
	"🧠",
	"🫀",
	"🫁",
	"🦷",
	"🦴",
	"👀",
	"👁️",
	"👅",
	"👄",
	"👶",
	"🧒",
	"👦",
	"👧",
	"🧑",
	"👱",
	"👨",
	"🧔",
	"👨‍🦰",
	"👨‍🦱",
	"👨‍🦳",
	"👨‍🦲",
	"👩",
	"👩‍🦰",
	"🧑‍🦰",
	"👩‍🦱",
	"🧑‍🦱",
	"👩‍🦳",
	"🧑‍🦳",
	"👩‍🦲",
	"🧑‍🦲",
	"👱‍♀️",
	"👱‍♂️",
	"🧓",
	"👴",
	"👵",
	"🙍",
	"🙍‍♂️",
	"🙍‍♀️",
	"🙎",
	"🙎‍♂️",
	"🙎‍♀️",
	"🙅",
	"🙅‍♂️",
	"🙅‍♀️",
	"🙆",
	"🙆‍♂️",
	"🙆‍♀️",
	"💁",
	"💁‍♂️",
	"💁‍♀️",
	"🙋",
	"🙋‍♂️",
	"🙋‍♀️",
	"🧏",
	"🧏‍♂️",
	"🧏‍♀️",
	"🙇",
	"🙇‍♂️",
	"🙇‍♀️",
	"🤦",
	"🤦‍♂️",
	"🤦‍♀️",
	"🤷",
	"🤷‍♂️",
	"🤷‍♀️",
	"🧑‍⚕️",
	"👨‍⚕️",
	"👩‍⚕️",
	"🧑‍🎓",
	"👨‍🎓",
	"👩‍🎓",
	"🧑‍🏫",
	"👨‍🏫",
	"👩‍🏫",
	"🧑‍⚖️",
	"👨‍⚖️",
	"👩‍⚖️",
	"🧑‍🌾",
	"👨‍🌾",
	"👩‍🌾",
	"🧑‍🍳",
	"👨‍🍳",
	"👩‍🍳",
	"🧑‍🔧",
	"👨‍🔧",
	"👩‍🔧",
	"🧑‍🏭",
	"👨‍🏭",
	"👩‍🏭",
	"🧑‍💼",
	"👨‍💼",
	"👩‍💼",
	"🧑‍🔬",
	"👨‍🔬",
	"👩‍🔬",
	"🧑‍💻",
	"👨‍💻",
	"👩‍💻",
	"🧑‍🎤",
	"👨‍🎤",
	"👩‍🎤",
	"🧑‍🎨",
	"👨‍🎨",
	"👩‍🎨",
	"🧑‍✈️",
	"👨‍✈️",
	"👩‍✈️",
	"🧑‍🚀",
	"👨‍🚀",
	"👩‍🚀",
	"🧑‍🚒",
	"👨‍🚒",
	"👩‍🚒",
	"👮",
	"👮‍♂️",
	"👮‍♀️",
	"🕵️",
	"🕵️‍♂️",
	"🕵️‍♀️",
	"💂",
	"💂‍♂️",
	"💂‍♀️",
	"🥷",
	"👷",
	"👷‍♂️",
	"👷‍♀️",
	"🤴",
	"👸",
	"👳",
	"👳‍♂️",
	"👳‍♀️",
	"👲",
	"🧕",
	"🤵",
	"🤵‍♂️",
	"🤵‍♀️",
	"👰",
	"👰‍♂️",
	"👰‍♀️",
	"🤰",
	"🤱",
	"👩‍🍼",
	"👨‍🍼",
	"🧑‍🍼",
	"👼",
	"🎅",
	"🤶",
	"🧑‍🎄",
	"🦸",
	"🦸‍♂️",
	"🦸‍♀️",
	"🦹",
	"🦹‍♂️",
	"🦹‍♀️",
	"🧙",
	"🧙‍♂️",
	"🧙‍♀️",
	"🧚",
	"🧚‍♂️",
	"🧚‍♀️",
	"🧛",
	"🧛‍♂️",
	"🧛‍♀️",
	"🧜",
	"🧜‍♂️",
	"🧜‍♀️",
	"🧝",
	"🧝‍♂️",
	"🧝‍♀️",
	"🧞",
	"🧞‍♂️",
	"🧞‍♀️",
	"🧟",
	"🧟‍♂️",
	"🧟‍♀️",
	"💆",
	"💆‍♂️",
	"💆‍♀️",
	"💇",
	"💇‍♂️",
	"💇‍♀️",
	"🚶",
	"🚶‍♂️",
	"🚶‍♀️",
	"🧍",
	"🧍‍♂️",
	"🧍‍♀️",
	"🧎",
	"🧎‍♂️",
	"🧎‍♀️",
	"🧑‍🦯",
	"👨‍🦯",
	"👩‍🦯",
	"🧑‍🦼",
	"👨‍🦼",
	"👩‍🦼",
	"🧑‍🦽",
	"👨‍🦽",
	"👩‍🦽",
	"🏃",
	"🏃‍♂️",
	"🏃‍♀️",
	"💃",
	"🕺",
	"🕴️",
	"👯",
	"👯‍♂️",
	"👯‍♀️",
	"🧖",
	"🧖‍♂️",
	"🧖‍♀️",
	"🧗",
	"🧗‍♂️",
	"🧗‍♀️",
	"🤺",
	"🏇",
	"⛷️",
	"🏂",
	"🏌️",
	"🏌️‍♂️",
	"🏌️‍♀️",
	"🏄",
	"🏄‍♂️",
	"🏄‍♀️",
	"🚣",
	"🚣‍♂️",
	"🚣‍♀️",
	"🏊",
	"🏊‍♂️",
	"🏊‍♀️",
	"⛹️",
	"⛹️‍♂️",
	"⛹️‍♀️",
	"🏋️",
	"🏋️‍♂️",
	"🏋️‍♀️",
	"🚴",
	"🚴‍♂️",
	"🚴‍♀️",
	"🚵",
	"🚵‍♂️",
	"🚵‍♀️",
	"🤸",
	"🤸‍♂️",
	"🤸‍♀️",
	"🤼",
	"🤼‍♂️",
	"🤼‍♀️",
	"🤽",
	"🤽‍♂️",
	"🤽‍♀️",
	"🤾",
	"🤾‍♂️",
	"🤾‍♀️",
	"🤹",
	"🤹‍♂️",
	"🤹‍♀️",
	"🧘",
	"🧘‍♂️",
	"🧘‍♀️",
	"🛀",
	"🛌",
	"🧑‍🤝‍🧑",
	"👭",
	"👫",
	"👬",
	"💏",
	"👩‍❤️‍💋‍👨",
	"👨‍❤️‍💋‍👨",
	"👩‍❤️‍💋‍👩",
	"💑",
	"👩‍❤️‍👨",
	"👨‍❤️‍👨",
	"👩‍❤️‍👩",
	"👪",
	"👨‍👩‍👦",
	"👨‍👩‍👧",
	"👨‍👩‍👧‍👦",
	"👨‍👩‍👦‍👦",
	"👨‍👩‍👧‍👧",
	"👨‍👨‍👦",
	"👨‍👨‍👧",
	"👨‍👨‍👧‍👦",
	"👨‍👨‍👦‍👦",
	"👨‍👨‍👧‍👧",
	"👩‍👩‍👦",
	"👩‍👩‍👧",
	"👩‍👩‍👧‍👦",
	"👩‍👩‍👦‍👦",
	"👩‍👩‍👧‍👧",
	"👨‍👦",
	"👨‍👦‍👦",
	"👨‍👧",
	"👨‍👧‍👦",
	"👨‍👧‍👧",
	"👩‍👦",
	"👩‍👦‍👦",
	"👩‍👧",
	"👩‍👧‍👦",
	"👩‍👧‍👧",
	"🗣️",
	"👤",
	"👥",
	"🫂",
	"👣",
	"🐵",
	"🐒",
	"🦍",
	"🦧",
	"🐶",
	"🐕",
	"🦮",
	"🐕‍🦺",
	"🐩",
	"🐺",
	"🦊",
	"🦝",
	"🐱",
	"🐈",
	"🐈‍⬛",
	"🦁",
	"🐯",
	"🐅",
	"🐆",
	"🐴",
	"🐎",
	"🦄",
	"🦓",
	"🦌",
	"🦬",
	"🐮",
	"🐂",
	"🐃",
	"🐄",
	"🐷",
	"🐖",
	"🐗",
	"🐽",
	"🐏",
	"🐑",
	"🐐",
	"🐪",
	"🐫",
	"🦙",
	"🦒",
	"🐘",
	"🦣",
	"🦏",
	"🦛",
	"🐭",
	"🐁",
	"🐀",
	"🐹",
	"🐰",
	"🐇",
	"🐿️",
	"🦫",
	"🦔",
	"🦇",
	"🐻",
	"🐻‍❄️",
	"🐨",
	"🐼",
	"🦥",
	"🦦",
	"🦨",
	"🦘",
	"🦡",
	"🐾",
	"🦃",
	"🐔",
	"🐓",
	"🐣",
	"🐤",
	"🐥",
	"🐦",
	"🐧",
	"🕊️",
	"🦅",
	"🦆",
	"🦢",
	"🦉",
	"🦤",
	"🪶",
	"🦩",
	"🦚",
	"🦜",
	"🐸",
	"🐊",
	"🐢",
	"🦎",
	"🐍",
	"🐲",
	"🐉",
	"🦕",
	"🦖",
	"🐳",
	"🐋",
	"🐬",
	"🦭",
	"🐟",
	"🐠",
	"🐡",
	"🦈",
	"🐙",
	"🐚",
	"🐌",
	"🦋",
	"🐛",
	"🐜",
	"🐝",
	"🪲",
	"🐞",
	"🦗",
	"🪳",
	"🕷️",
	"🕸️",
	"🦂",
	"🦟",
	"🪰",
	"🪱",
	"🦠",
	"💐",
	"🌸",
	"💮",
	"🏵️",
	"🌹",
	"🥀",
	"🌺",
	"🌻",
	"🌼",
	"🌷",
	"🌱",
	"🪴",
	"🌲",
	"🌳",
	"🌴",
	"🌵",
	"🌾",
	"🌿",
	"☘️",
	"🍀",
	"🍁",
	"🍂",
	"🍃",
	"🍇",
	"🍈",
	"🍉",
	"🍊",
	"🍋",
	"🍌",
	"🍍",
	"🥭",
	"🍎",
	"🍏",
	"🍐",
	"🍑",
	"🍒",
	"🍓",
	"🫐",
	"🥝",
	"🍅",
	"🫒",
	"🥥",
	"🥑",
	"🍆",
	"🥔",
	"🥕",
	"🌽",
	"🌶️",
	"🫑",
	"🥒",
	"🥬",
	"🥦",
	"🧄",
	"🧅",
	"🍄",
	"🥜",
	"🌰",
	"🍞",
	"🥐",
	"🥖",
	"🫓",
	"🥨",
	"🥯",
	"🥞",
	"🧇",
	"🧀",
	"🍖",
	"🍗",
	"🥩",
	"🥓",
	"🍔",
	"🍟",
	"🍕",
	"🌭",
	"🥪",
	"🌮",
	"🌯",
	"🫔",
	"🥙",
	"🧆",
	"🥚",
	"🍳",
	"🥘",
	"🍲",
	"🫕",
	"🥣",
	"🥗",
	"🍿",
	"🧈",
	"🧂",
	"🥫",
	"🍱",
	"🍘",
	"🍙",
	"🍚",
	"🍛",
	"🍜",
	"🍝",
	"🍠",
	"🍢",
	"🍣",
	"🍤",
	"🍥",
	"🥮",
	"🍡",
	"🥟",
	"🥠",
	"🥡",
	"🦀",
	"🦞",
	"🦐",
	"🦑",
	"🦪",
	"🍦",
	"🍧",
	"🍨",
	"🍩",
	"🍪",
	"🎂",
	"🍰",
	"🧁",
	"🥧",
	"🍫",
	"🍬",
	"🍭",
	"🍮",
	"🍯",
	"🍼",
	"🥛",
	"☕",
	"🫖",
	"🍵",
	"🍶",
	"🍾",
	"🍷",
	"🍸",
	"🍹",
	"🍺",
	"🍻",
	"🥂",
	"🥃",
	"🥤",
	"🧋",
	"🧃",
	"🧉",
	"🧊",
	"🥢",
	"🍽️",
	"🍴",
	"🥄",
	"🔪",
	"🏺",
	"🌍",
	"🌎",
	"🌏",
	"🌐",
	"🗺️",
	"🗾",
	"🧭",
	"🏔️",
	"⛰️",
	"🌋",
	"🗻",
	"🏕️",
	"🏖️",
	"🏜️",
	"🏝️",
	"🏞️",
	"🏟️",
	"🏛️",
	"🏗️",
	"🧱",
	"🪨",
	"🪵",
	"🛖",
	"🏘️",
	"🏚️",
	"🏠",
	"🏡",
	"🏢",
	"🏣",
	"🏤",
	"🏥",
	"🏦",
	"🏨",
	"🏩",
	"🏪",
	"🏫",
	"🏬",
	"🏭",
	"🏯",
	"🏰",
	"💒",
	"🗼",
	"🗽",
	"⛪",
	"🕌",
	"🛕",
	"🕍",
	"⛩️",
	"🕋",
	"⛲",
	"⛺",
	"🌁",
	"🌃",
	"🏙️",
	"🌄",
	"🌅",
	"🌆",
	"🌇",
	"🌉",
	"♨️",
	"🎠",
	"🎡",
	"🎢",
	"💈",
	"🎪",
	"🚂",
	"🚃",
	"🚄",
	"🚅",
	"🚆",
	"🚇",
	"🚈",
	"🚉",
	"🚊",
	"🚝",
	"🚞",
	"🚋",
	"🚌",
	"🚍",
	"🚎",
	"🚐",
	"🚑",
	"🚒",
	"🚓",
	"🚔",
	"🚕",
	"🚖",
	"🚗",
	"🚘",
	"🚙",
	"🛻",
	"🚚",
	"🚛",
	"🚜",
	"🏎️",
	"🏍️",
	"🛵",
	"🦽",
	"🦼",
	"🛺",
	"🚲",
	"🛴",
	"🛹",
	"🛼",
	"🚏",
	"🛣️",
	"🛤️",
	"🛢️",
	"⛽",
	"🚨",
	"🚥",
	"🚦",
	"🛑",
	"🚧",
	"⚓",
	"⛵",
	"🛶",
	"🚤",
	"🛳️",
	"⛴️",
	"🛥️",
	"🚢",
	"✈️",
	"🛩️",
	"🛫",
	"🛬",
	"🪂",
	"💺",
	"🚁",
	"🚟",
	"🚠",
	"🚡",
	"🛰️",
	"🚀",
	"🛸",
	"🛎️",
	"🧳",
	"⌛",
	"⏳",
	"⌚",
	"⏰",
	"⏱️",
	"⏲️",
	"🕰️",
	"🕛",
	"🕧",
	"🕐",
	"🕜",
	"🕑",
	"🕝",
	"🕒",
	"🕞",
	"🕓",
	"🕟",
	"🕔",
	"🕠",
	"🕕",
	"🕡",
	"🕖",
	"🕢",
	"🕗",
	"🕣",
	"🕘",
	"🕤",
	"🕙",
	"🕥",
	"🕚",
	"🕦",
	"🌑",
	"🌒",
	"🌓",
	"🌔",
	"🌕",
	"🌖",
	"🌗",
	"🌘",
	"🌙",
	"🌚",
	"🌛",
	"🌜",
	"🌡️",
	"☀️",
	"🌝",
	"🌞",
	"🪐",
	"⭐",
	"🌟",
	"🌠",
	"🌌",
	"☁️",
	"⛅",
	"⛈️",
	"🌤️",
	"🌥️",
	"🌦️",
	"🌧️",
	"🌨️",
	"🌩️",
	"🌪️",
	"🌫️",
	"🌬️",
	"🌀",
	"🌈",
	"🌂",
	"☂️",
	"☔",
	"⛱️",
	"⚡",
	"❄️",
	"☃️",
	"⛄",
	"☄️",
	"🔥",
	"💧",
	"🌊",
	"🎃",
	"🎄",
	"🎆",
	"🎇",
	"🧨",
	"✨",
	"🎈",
	"🎉",
	"🎊",
	"🎋",
	"🎍",
	"🎎",
	"🎏",
	"🎐",
	"🎑",
	"🧧",
	"🎀",
	"🎁",
	"🎗️",
	"🎟️",
	"🎫",
	"🎖️",
	"🏆",
	"🏅",
	"🥇",
	"🥈",
	"🥉",
	"⚽",
	"⚾",
	"🥎",
	"🏀",
	"🏐",
	"🏈",
	"🏉",
	"🎾",
	"🥏",
	"🎳",
	"🏏",
	"🏑",
	"🏒",
	"🥍",
	"🏓",
	"🏸",
	"🥊",
	"🥋",
	"🥅",
	"⛳",
	"⛸️",
	"🎣",
	"🤿",
	"🎽",
	"🎿",
	"🛷",
	"🥌",
	"🎯",
	"🪀",
	"🪁",
	"🎱",
	"🔮",
	"🪄",
	"🧿",
	"🎮",
	"🕹️",
	"🎰",
	"🎲",
	"🧩",
	"🧸",
	"🪅",
	"🪆",
	"♠️",
	"♥️",
	"♦️",
	"♣️",
	"♟️",
	"🃏",
	"🀄",
	"🎴",
	"🎭",
	"🖼️",
	"🎨",
	"🧵",
	"🪡",
	"🧶",
	"🪢",
	"👓",
	"🕶️",
	"🥽",
	"🥼",
	"🦺",
	"👔",
	"👕",
	"👖",
	"🧣",
	"🧤",
	"🧥",
	"🧦",
	"👗",
	"👘",
	"🥻",
	"🩱",
	"🩲",
	"🩳",
	"👙",
	"👚",
	"👛",
	"👜",
	"👝",
	"🛍️",
	"🎒",
	"🩴",
	"👞",
	"👟",
	"🥾",
	"🥿",
	"👠",
	"👡",
	"🩰",
	"👢",
	"👑",
	"👒",
	"🎩",
	"🎓",
	"🧢",
	"🪖",
	"⛑️",
	"📿",
	"💄",
	"💍",
	"💎",
	"🔇",
	"🔈",
	"🔉",
	"🔊",
	"📢",
	"📣",
	"📯",
	"🔔",
	"🔕",
	"🎼",
	"🎵",
	"🎶",
	"🎙️",
	"🎚️",
	"🎛️",
	"🎤",
	"🎧",
	"📻",
	"🎷",
	"🪗",
	"🎸",
	"🎹",
	"🎺",
	"🎻",
	"🪕",
	"🥁",
	"🪘",
	"📱",
	"📲",
	"☎️",
	"📞",
	"📟",
	"📠",
	"🔋",
	"🔌",
	"💻",
	"🖥️",
	"🖨️",
	"⌨️",
	"🖱️",
	"🖲️",
	"💽",
	"💾",
	"💿",
	"📀",
	"🧮",
	"🎥",
	"🎞️",
	"📽️",
	"🎬",
	"📺",
	"📷",
	"📸",
	"📹",
	"📼",
	"🔍",
	"🔎",
	"🕯️",
	"💡",
	"🔦",
	"🏮",
	"🪔",
	"📔",
	"📕",
	"📖",
	"📗",
	"📘",
	"📙",
	"📚",
	"📓",
	"📒",
	"📃",
	"📜",
	"📄",
	"📰",
	"🗞️",
	"📑",
	"🔖",
	"🏷️",
	"💰",
	"🪙",
	"💴",
	"💵",
	"💶",
	"💷",
	"💸",
	"💳",
	"🧾",
	"💹",
	"✉️",
	"📧",
	"📨",
	"📩",
	"📤",
	"📥",
	"📦",
	"📫",
	"📪",
	"📬",
	"📭",
	"📮",
	"🗳️",
	"✏️",
	"✒️",
	"🖋️",
	"🖊️",
	"🖌️",
	"🖍️",
	"📝",
	"💼",
	"📁",
	"📂",
	"🗂️",
	"📅",
	"📆",
	"🗒️",
	"🗓️",
	"📇",
	"📈",
	"📉",
	"📊",
	"📋",
	"📌",
	"📍",
	"📎",
	"🖇️",
	"📏",
	"📐",
	"✂️",
	"🗃️",
	"🗄️",
	"🗑️",
	"🔒",
	"🔓",
	"🔏",
	"🔐",
	"🔑",
	"🗝️",
	"🔨",
	"🪓",
	"⛏️",
	"⚒️",
	"🛠️",
	"🗡️",
	"⚔️",
	"🔫",
	"🪃",
	"🏹",
	"🛡️",
	"🪚",
	"🔧",
	"🪛",
	"🔩",
	"⚙️",
	"🗜️",
	"⚖️",
	"🦯",
	"🔗",
	"⛓️",
	"🪝",
	"🧰",
	"🧲",
	"🪜",
	"⚗️",
	"🧪",
	"🧫",
	"🧬",
	"🔬",
	"🔭",
	"📡",
	"💉",
	"🩸",
	"💊",
	"🩹",
	"🩺",
	"🚪",
	"🛗",
	"🪞",
	"🪟",
	"🛏️",
	"🛋️",
	"🪑",
	"🚽",
	"🪠",
	"🚿",
	"🛁",
	"🪤",
	"🪒",
	"🧴",
	"🧷",
	"🧹",
	"🧺",
	"🧻",
	"🪣",
	"🧼",
	"🪥",
	"🧽",
	"🧯",
	"🛒",
	"🚬",
	"⚰️",
	"🪦",
	"⚱️",
	"🗿",
	"🪧",
	"🏧",
	"🚮",
	"🚰",
	"♿",
	"🚹",
	"🚺",
	"🚻",
	"🚼",
	"🚾",
	"🛂",
	"🛃",
	"🛄",
	"🛅",
	"⚠️",
	"🚸",
	"⛔",
	"🚫",
	"🚳",
	"🚭",
	"🚯",
	"🚱",
	"🚷",
	"📵",
	"🔞",
	"☢️",
	"☣️",
	"⬆️",
	"↗️",
	"➡️",
	"↘️",
	"⬇️",
	"↙️",
	"⬅️",
	"↖️",
	"↕️",
	"↔️",
	"↩️",
	"↪️",
	"⤴️",
	"⤵️",
	"🔃",
	"🔄",
	"🔙",
	"🔚",
	"🔛",
	"🔜",
	"🔝",
	"🛐",
	"⚛️",
	"🕉️",
	"✡️",
	"☸️",
	"☯️",
	"✝️",
	"☦️",
	"☪️",
	"☮️",
	"🕎",
	"🔯",
	"♈",
	"♉",
	"♊",
	"♋",
	"♌",
	"♍",
	"♎",
	"♏",
	"♐",
	"♑",
	"♒",
	"♓",
	"⛎",
	"🔀",
	"🔁",
	"🔂",
	"▶️",
	"⏩",
	"⏭️",
	"⏯️",
	"◀️",
	"⏪",
	"⏮️",
	"🔼",
	"⏫",
	"🔽",
	"⏬",
	"⏸️",
	"⏹️",
	"⏺️",
	"⏏️",
	"🎦",
	"🔅",
	"🔆",
	"📶",
	"📳",
	"📴",
	"♀️",
	"♂️",
	"⚧️",
	"✖️",
	"➕",
	"➖",
	"➗",
	"♾️",
	"‼️",
	"⁉️",
	"❓",
	"❔",
	"❕",
	"❗",
	"〰️",
	"💱",
	"💲",
	"⚕️",
	"♻️",
	"⚜️",
	"🔱",
	"📛",
	"🔰",
	"⭕",
	"✅",
	"☑️",
	"✔️",
	"❌",
	"❎",
	"➰",
	"➿",
	"〽️",
	"✳️",
	"✴️",
	"❇️",
	"©️",
	"®️",
	"™️",
	"#️⃣",
	"*️⃣",
	"0️⃣",
	"1️⃣",
	"2️⃣",
	"3️⃣",
	"4️⃣",
	"5️⃣",
	"6️⃣",
	"7️⃣",
	"8️⃣",
	"9️⃣",
	"🔟",
	"🔠",
	"🔡",
	"🔢",
	"🔣",
	"🔤",
	"🅰️",
	"🆎",
	"🅱️",
	"🆑",
	"🆒",
	"🆓",
	"ℹ️",
	"🆔",
	"Ⓜ️",
	"🆕",
	"🆖",
	"🅾️",
	"🆗",
	"🅿️",
	"🆘",
	"🆙",
	"🆚",
	"🈁",
	"🈂️",
	"🈷️",
	"🈶",
	"🈯",
	"🉐",
	"🈹",
	"🈚",
	"🈲",
	"🉑",
	"🈸",
	"🈴",
	"🈳",
	"㊗️",
	"㊙️",
	"🈺",
	"🈵",
	"🔴",
	"🟠",
	"🟡",
	"🟢",
	"🔵",
	"🟣",
	"🟤",
	"⚫",
	"⚪",
	"🟥",
	"🟧",
	"🟨",
	"🟩",
	"🟦",
	"🟪",
	"🟫",
	"⬛",
	"⬜",
	"◼️",
	"◻️",
	"◾",
	"◽",
	"▪️",
	"▫️",
	"🔶",
	"🔷",
	"🔸",
	"🔹",
	"🔺",
	"🔻",
	"💠",
	"🔘",
	"🔳",
	"🔲",
	"🏁",
	"🚩",
	"🎌",
	"🏴",
	"🏳️",
	"🏳️‍🌈",
	"🏳️‍⚧️",
	"🏴‍☠️",
	"🇦🇨",
	"🇦🇩",
	"🇦🇪",
	"🇦🇫",
	"🇦🇬",
	"🇦🇮",
	"🇦🇱",
	"🇦🇲",
	"🇦🇴",
	"🇦🇶",
	"🇦🇷",
	"🇦🇸",
	"🇦🇹",
	"🇦🇺",
	"🇦🇼",
	"🇦🇽",
	"🇦🇿",
	"🇧🇦",
	"🇧🇧",
	"🇧🇩",
	"🇧🇪",
	"🇧🇫",
	"🇧🇬",
	"🇧🇭",
	"🇧🇮",
	"🇧🇯",
	"🇧🇱",
	"🇧🇲",
	"🇧🇳",
	"🇧🇴",
	"🇧🇶",
	"🇧🇷",
	"🇧🇸",
	"🇧🇹",
	"🇧🇻",
	"🇧🇼",
	"🇧🇾",
	"🇧🇿",
	"🇨🇦",
	"🇨🇨",
	"🇨🇩",
	"🇨🇫",
	"🇨🇬",
	"🇨🇭",
	"🇨🇮",
	"🇨🇰",
	"🇨🇱",
	"🇨🇲",
	"🇨🇳",
	"🇨🇴",
	"🇨🇵",
	"🇨🇷",
	"🇨🇺",
	"🇨🇻",
	"🇨🇼",
	"🇨🇽",
	"🇨🇾",
	"🇨🇿",
	"🇩🇪",
	"🇩🇬",
	"🇩🇯",
	"🇩🇰",
	"🇩🇲",
	"🇩🇴",
	"🇩🇿",
	"🇪🇦",
	"🇪🇨",
	"🇪🇪",
	"🇪🇬",
	"🇪🇭",
	"🇪🇷",
	"🇪🇸",
	"🇪🇹",
	"🇪🇺",
	"🇫🇮",
	"🇫🇯",
	"🇫🇰",
	"🇫🇲",
	"🇫🇴",
	"🇫🇷",
	"🇬🇦",
	"🇬🇧",
	"🇬🇩",
	"🇬🇪",
	"🇬🇫",
	"🇬🇬",
	"🇬🇭",
	"🇬🇮",
	"🇬🇱",
	"🇬🇲",
	"🇬🇳",
	"🇬🇵",
	"🇬🇶",
	"🇬🇷",
	"🇬🇸",
	"🇬🇹",
	"🇬🇺",
	"🇬🇼",
	"🇬🇾",
	"🇭🇰",
	"🇭🇲",
	"🇭🇳",
	"🇭🇷",
	"🇭🇹",
	"🇭🇺",
	"🇮🇨",
	"🇮🇩",
	"🇮🇪",
	"🇮🇱",
	"🇮🇲",
	"🇮🇳",
	"🇮🇴",
	"🇮🇶",
	"🇮🇷",
	"🇮🇸",
	"🇮🇹",
	"🇯🇪",
	"🇯🇲",
	"🇯🇴",
	"🇯🇵",
	"🇰🇪",
	"🇰🇬",
	"🇰🇭",
	"🇰🇮",
	"🇰🇲",
	"🇰🇳",
	"🇰🇵",
	"🇰🇷",
	"🇰🇼",
	"🇰🇾",
	"🇰🇿",
	"🇱🇦",
	"🇱🇧",
	"🇱🇨",
	"🇱🇮",
	"🇱🇰",
	"🇱🇷",
	"🇱🇸",
	"🇱🇹",
	"🇱🇺",
	"🇱🇻",
	"🇱🇾",
	"🇲🇦",
	"🇲🇨",
	"🇲🇩",
	"🇲🇪",
	"🇲🇫",
	"🇲🇬",
	"🇲🇭",
	"🇲🇰",
	"🇲🇱",
	"🇲🇲",
	"🇲🇳",
	"🇲🇴",
	"🇲🇵",
	"🇲🇶",
	"🇲🇷",
	"🇲🇸",
	"🇲🇹",
	"🇲🇺",
	"🇲🇻",
	"🇲🇼",
	"🇲🇽",
	"🇲🇾",
	"🇲🇿",
	"🇳🇦",
	"🇳🇨",
	"🇳🇪",
	"🇳🇫",
	"🇳🇬",
	"🇳🇮",
	"🇳🇱",
	"🇳🇴",
	"🇳🇵",
	"🇳🇷",
	"🇳🇺",
	"🇳🇿",
	"🇴🇲",
	"🇵🇦",
	"🇵🇪",
	"🇵🇫",
	"🇵🇬",
	"🇵🇭",
	"🇵🇰",
	"🇵🇱",
	"🇵🇲",
	"🇵🇳",
	"🇵🇷",
	"🇵🇸",
	"🇵🇹",
	"🇵🇼",
	"🇵🇾",
	"🇶🇦",
	"🇷🇪",
	"🇷🇴",
	"🇷🇸",
	"🇷🇺",
	"🇷🇼",
	"🇸🇦",
	"🇸🇧",
	"🇸🇨",
	"🇸🇩",
	"🇸🇪",
	"🇸🇬",
	"🇸🇭",
	"🇸🇮",
	"🇸🇯",
	"🇸🇰",
	"🇸🇱",
	"🇸🇲",
	"🇸🇳",
	"🇸🇴",
	"🇸🇷",
	"🇸🇸",
	"🇸🇹",
	"🇸🇻",
	"🇸🇽",
	"🇸🇾",
	"🇸🇿",
	"🇹🇦",
	"🇹🇨",
	"🇹🇩",
	"🇹🇫",
	"🇹🇬",
	"🇹🇭",
	"🇹🇯",
	"🇹🇰",
	"🇹🇱",
	"🇹🇲",
	"🇹🇳",
	"🇹🇴",
	"🇹🇷",
	"🇹🇹",
	"🇹🇻",
	"🇹🇼",
	"🇹🇿",
	"🇺🇦",
	"🇺🇬",
	"🇺🇲",
	"🇺🇳",
	"🇺🇸",
	"🇺🇾",
	"🇺🇿",
	"🇻🇦",
	"🇻🇨",
	"🇻🇪",
	"🇻🇬",
	"🇻🇮",
	"🇻🇳",
	"🇻🇺",
	"🇼🇫",
	"🇼🇸",
	"🇽🇰",
	"🇾🇪",
	"🇾🇹",
	"🇿🇦",
	"🇿🇲",
	"🇿🇼",
	"🏴󠁧󠁢󠁥󠁮󠁧󠁿",
	"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
	"🏴󠁧󠁢󠁷󠁬󠁳󠁿"
];

var emojiNames = {
	"😀": {
	name: "grinning face",
	slug: "grinning_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😃": {
	name: "grinning face with big eyes",
	slug: "grinning_face_with_big_eyes",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😄": {
	name: "grinning face with smiling eyes",
	slug: "grinning_face_with_smiling_eyes",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😁": {
	name: "beaming face with smiling eyes",
	slug: "beaming_face_with_smiling_eyes",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😆": {
	name: "grinning squinting face",
	slug: "grinning_squinting_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😅": {
	name: "grinning face with sweat",
	slug: "grinning_face_with_sweat",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤣": {
	name: "rolling on the floor laughing",
	slug: "rolling_on_the_floor_laughing",
	group: "Smileys & Emotion",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"😂": {
	name: "face with tears of joy",
	slug: "face_with_tears_of_joy",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🙂": {
	name: "slightly smiling face",
	slug: "slightly_smiling_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🙃": {
	name: "upside-down face",
	slug: "upside_down_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😉": {
	name: "winking face",
	slug: "winking_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😊": {
	name: "smiling face with smiling eyes",
	slug: "smiling_face_with_smiling_eyes",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😇": {
	name: "smiling face with halo",
	slug: "smiling_face_with_halo",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🥰": {
	name: "smiling face with hearts",
	slug: "smiling_face_with_hearts",
	group: "Smileys & Emotion",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"😍": {
	name: "smiling face with heart-eyes",
	slug: "smiling_face_with_heart_eyes",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤩": {
	name: "star-struck",
	slug: "star_struck",
	group: "Smileys & Emotion",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"😘": {
	name: "face blowing a kiss",
	slug: "face_blowing_a_kiss",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😗": {
	name: "kissing face",
	slug: "kissing_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"☺️": {
	name: "smiling face",
	slug: "smiling_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😚": {
	name: "kissing face with closed eyes",
	slug: "kissing_face_with_closed_eyes",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😙": {
	name: "kissing face with smiling eyes",
	slug: "kissing_face_with_smiling_eyes",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🥲": {
	name: "smiling face with tear",
	slug: "smiling_face_with_tear",
	group: "Smileys & Emotion",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"😋": {
	name: "face savoring food",
	slug: "face_savoring_food",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😛": {
	name: "face with tongue",
	slug: "face_with_tongue",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😜": {
	name: "winking face with tongue",
	slug: "winking_face_with_tongue",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤪": {
	name: "zany face",
	slug: "zany_face",
	group: "Smileys & Emotion",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"😝": {
	name: "squinting face with tongue",
	slug: "squinting_face_with_tongue",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤑": {
	name: "money-mouth face",
	slug: "money_mouth_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🤗": {
	name: "hugging face",
	slug: "hugging_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🤭": {
	name: "face with hand over mouth",
	slug: "face_with_hand_over_mouth",
	group: "Smileys & Emotion",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🤫": {
	name: "shushing face",
	slug: "shushing_face",
	group: "Smileys & Emotion",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🤔": {
	name: "thinking face",
	slug: "thinking_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🤐": {
	name: "zipper-mouth face",
	slug: "zipper_mouth_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🤨": {
	name: "face with raised eyebrow",
	slug: "face_with_raised_eyebrow",
	group: "Smileys & Emotion",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"😐": {
	name: "neutral face",
	slug: "neutral_face",
	group: "Smileys & Emotion",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"😑": {
	name: "expressionless face",
	slug: "expressionless_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😶": {
	name: "face without mouth",
	slug: "face_without_mouth",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😏": {
	name: "smirking face",
	slug: "smirking_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😒": {
	name: "unamused face",
	slug: "unamused_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🙄": {
	name: "face with rolling eyes",
	slug: "face_with_rolling_eyes",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😬": {
	name: "grimacing face",
	slug: "grimacing_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🤥": {
	name: "lying face",
	slug: "lying_face",
	group: "Smileys & Emotion",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"😌": {
	name: "relieved face",
	slug: "relieved_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😔": {
	name: "pensive face",
	slug: "pensive_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😪": {
	name: "sleepy face",
	slug: "sleepy_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤤": {
	name: "drooling face",
	slug: "drooling_face",
	group: "Smileys & Emotion",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"😴": {
	name: "sleeping face",
	slug: "sleeping_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😷": {
	name: "face with medical mask",
	slug: "face_with_medical_mask",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤒": {
	name: "face with thermometer",
	slug: "face_with_thermometer",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🤕": {
	name: "face with head-bandage",
	slug: "face_with_head_bandage",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🤢": {
	name: "nauseated face",
	slug: "nauseated_face",
	group: "Smileys & Emotion",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🤮": {
	name: "face vomiting",
	slug: "face_vomiting",
	group: "Smileys & Emotion",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🤧": {
	name: "sneezing face",
	slug: "sneezing_face",
	group: "Smileys & Emotion",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥵": {
	name: "hot face",
	slug: "hot_face",
	group: "Smileys & Emotion",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🥶": {
	name: "cold face",
	slug: "cold_face",
	group: "Smileys & Emotion",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🥴": {
	name: "woozy face",
	slug: "woozy_face",
	group: "Smileys & Emotion",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"😵": {
	name: "knocked-out face",
	slug: "knocked_out_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤯": {
	name: "exploding head",
	slug: "exploding_head",
	group: "Smileys & Emotion",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🤠": {
	name: "cowboy hat face",
	slug: "cowboy_hat_face",
	group: "Smileys & Emotion",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥳": {
	name: "partying face",
	slug: "partying_face",
	group: "Smileys & Emotion",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🥸": {
	name: "disguised face",
	slug: "disguised_face",
	group: "Smileys & Emotion",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"😎": {
	name: "smiling face with sunglasses",
	slug: "smiling_face_with_sunglasses",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🤓": {
	name: "nerd face",
	slug: "nerd_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🧐": {
	name: "face with monocle",
	slug: "face_with_monocle",
	group: "Smileys & Emotion",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"😕": {
	name: "confused face",
	slug: "confused_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😟": {
	name: "worried face",
	slug: "worried_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🙁": {
	name: "slightly frowning face",
	slug: "slightly_frowning_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"☹️": {
	name: "frowning face",
	slug: "frowning_face",
	group: "Smileys & Emotion",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"😮": {
	name: "face with open mouth",
	slug: "face_with_open_mouth",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😯": {
	name: "hushed face",
	slug: "hushed_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😲": {
	name: "astonished face",
	slug: "astonished_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😳": {
	name: "flushed face",
	slug: "flushed_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥺": {
	name: "pleading face",
	slug: "pleading_face",
	group: "Smileys & Emotion",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"😦": {
	name: "frowning face with open mouth",
	slug: "frowning_face_with_open_mouth",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😧": {
	name: "anguished face",
	slug: "anguished_face",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😨": {
	name: "fearful face",
	slug: "fearful_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😰": {
	name: "anxious face with sweat",
	slug: "anxious_face_with_sweat",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😥": {
	name: "sad but relieved face",
	slug: "sad_but_relieved_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😢": {
	name: "crying face",
	slug: "crying_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😭": {
	name: "loudly crying face",
	slug: "loudly_crying_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😱": {
	name: "face screaming in fear",
	slug: "face_screaming_in_fear",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😖": {
	name: "confounded face",
	slug: "confounded_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😣": {
	name: "persevering face",
	slug: "persevering_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😞": {
	name: "disappointed face",
	slug: "disappointed_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😓": {
	name: "downcast face with sweat",
	slug: "downcast_face_with_sweat",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😩": {
	name: "weary face",
	slug: "weary_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😫": {
	name: "tired face",
	slug: "tired_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥱": {
	name: "yawning face",
	slug: "yawning_face",
	group: "Smileys & Emotion",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"😤": {
	name: "face with steam from nose",
	slug: "face_with_steam_from_nose",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😡": {
	name: "pouting face",
	slug: "pouting_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😠": {
	name: "angry face",
	slug: "angry_face",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤬": {
	name: "face with symbols on mouth",
	slug: "face_with_symbols_on_mouth",
	group: "Smileys & Emotion",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"😈": {
	name: "smiling face with horns",
	slug: "smiling_face_with_horns",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"👿": {
	name: "angry face with horns",
	slug: "angry_face_with_horns",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💀": {
	name: "skull",
	slug: "skull",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"☠️": {
	name: "skull and crossbones",
	slug: "skull_and_crossbones",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"💩": {
	name: "pile of poo",
	slug: "pile_of_poo",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤡": {
	name: "clown face",
	slug: "clown_face",
	group: "Smileys & Emotion",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"👹": {
	name: "ogre",
	slug: "ogre",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👺": {
	name: "goblin",
	slug: "goblin",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👻": {
	name: "ghost",
	slug: "ghost",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👽": {
	name: "alien",
	slug: "alien",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👾": {
	name: "alien monster",
	slug: "alien_monster",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤖": {
	name: "robot",
	slug: "robot",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"😺": {
	name: "grinning cat",
	slug: "grinning_cat",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😸": {
	name: "grinning cat with smiling eyes",
	slug: "grinning_cat_with_smiling_eyes",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😹": {
	name: "cat with tears of joy",
	slug: "cat_with_tears_of_joy",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😻": {
	name: "smiling cat with heart-eyes",
	slug: "smiling_cat_with_heart_eyes",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😼": {
	name: "cat with wry smile",
	slug: "cat_with_wry_smile",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😽": {
	name: "kissing cat",
	slug: "kissing_cat",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🙀": {
	name: "weary cat",
	slug: "weary_cat",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😿": {
	name: "crying cat",
	slug: "crying_cat",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"😾": {
	name: "pouting cat",
	slug: "pouting_cat",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🙈": {
	name: "see-no-evil monkey",
	slug: "see_no_evil_monkey",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🙉": {
	name: "hear-no-evil monkey",
	slug: "hear_no_evil_monkey",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🙊": {
	name: "speak-no-evil monkey",
	slug: "speak_no_evil_monkey",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💋": {
	name: "kiss mark",
	slug: "kiss_mark",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💌": {
	name: "love letter",
	slug: "love_letter",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💘": {
	name: "heart with arrow",
	slug: "heart_with_arrow",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💝": {
	name: "heart with ribbon",
	slug: "heart_with_ribbon",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💖": {
	name: "sparkling heart",
	slug: "sparkling_heart",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💗": {
	name: "growing heart",
	slug: "growing_heart",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💓": {
	name: "beating heart",
	slug: "beating_heart",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💞": {
	name: "revolving hearts",
	slug: "revolving_hearts",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💕": {
	name: "two hearts",
	slug: "two_hearts",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💟": {
	name: "heart decoration",
	slug: "heart_decoration",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"❣️": {
	name: "heart exclamation",
	slug: "heart_exclamation",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"💔": {
	name: "broken heart",
	slug: "broken_heart",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"❤️": {
	name: "red heart",
	slug: "red_heart",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧡": {
	name: "orange heart",
	slug: "orange_heart",
	group: "Smileys & Emotion",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"💛": {
	name: "yellow heart",
	slug: "yellow_heart",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💚": {
	name: "green heart",
	slug: "green_heart",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💙": {
	name: "blue heart",
	slug: "blue_heart",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💜": {
	name: "purple heart",
	slug: "purple_heart",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤎": {
	name: "brown heart",
	slug: "brown_heart",
	group: "Smileys & Emotion",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🖤": {
	name: "black heart",
	slug: "black_heart",
	group: "Smileys & Emotion",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🤍": {
	name: "white heart",
	slug: "white_heart",
	group: "Smileys & Emotion",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"💯": {
	name: "hundred points",
	slug: "hundred_points",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💢": {
	name: "anger symbol",
	slug: "anger_symbol",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💥": {
	name: "collision",
	slug: "collision",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💫": {
	name: "dizzy",
	slug: "dizzy",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💦": {
	name: "sweat droplets",
	slug: "sweat_droplets",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💨": {
	name: "dashing away",
	slug: "dashing_away",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕳️": {
	name: "hole",
	slug: "hole",
	group: "Smileys & Emotion",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"💣": {
	name: "bomb",
	slug: "bomb",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💬": {
	name: "speech balloon",
	slug: "speech_balloon",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👁️‍🗨️": {
	name: "eye in speech bubble",
	slug: "eye_in_speech_bubble",
	group: "Smileys & Emotion",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🗨️": {
	name: "left speech bubble",
	slug: "left_speech_bubble",
	group: "Smileys & Emotion",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🗯️": {
	name: "right anger bubble",
	slug: "right_anger_bubble",
	group: "Smileys & Emotion",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"💭": {
	name: "thought balloon",
	slug: "thought_balloon",
	group: "Smileys & Emotion",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"💤": {
	name: "zzz",
	slug: "zzz",
	group: "Smileys & Emotion",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👋": {
	name: "waving hand",
	slug: "waving_hand",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🤚": {
	name: "raised back of hand",
	slug: "raised_back_of_hand",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🖐️": {
	name: "hand with fingers splayed",
	slug: "hand_with_fingers_splayed",
	group: "People & Body",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"✋": {
	name: "raised hand",
	slug: "raised_hand",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🖖": {
	name: "vulcan salute",
	slug: "vulcan_salute",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👌": {
	name: "OK hand",
	slug: "ok_hand",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🤌": {
	name: "pinched fingers",
	slug: "pinched_fingers",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "13.0"
},
	"🤏": {
	name: "pinching hand",
	slug: "pinching_hand",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"✌️": {
	name: "victory hand",
	slug: "victory_hand",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🤞": {
	name: "crossed fingers",
	slug: "crossed_fingers",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🤟": {
	name: "love-you gesture",
	slug: "love_you_gesture",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🤘": {
	name: "sign of the horns",
	slug: "sign_of_the_horns",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🤙": {
	name: "call me hand",
	slug: "call_me_hand",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"👈": {
	name: "backhand index pointing left",
	slug: "backhand_index_pointing_left",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👉": {
	name: "backhand index pointing right",
	slug: "backhand_index_pointing_right",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👆": {
	name: "backhand index pointing up",
	slug: "backhand_index_pointing_up",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🖕": {
	name: "middle finger",
	slug: "middle_finger",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👇": {
	name: "backhand index pointing down",
	slug: "backhand_index_pointing_down",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"☝️": {
	name: "index pointing up",
	slug: "index_pointing_up",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👍": {
	name: "thumbs up",
	slug: "thumbs_up",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👎": {
	name: "thumbs down",
	slug: "thumbs_down",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"✊": {
	name: "raised fist",
	slug: "raised_fist",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👊": {
	name: "oncoming fist",
	slug: "oncoming_fist",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🤛": {
	name: "left-facing fist",
	slug: "left_facing_fist",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🤜": {
	name: "right-facing fist",
	slug: "right_facing_fist",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"👏": {
	name: "clapping hands",
	slug: "clapping_hands",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🙌": {
	name: "raising hands",
	slug: "raising_hands",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👐": {
	name: "open hands",
	slug: "open_hands",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🤲": {
	name: "palms up together",
	slug: "palms_up_together",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🤝": {
	name: "handshake",
	slug: "handshake",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🙏": {
	name: "folded hands",
	slug: "folded_hands",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"✍️": {
	name: "writing hand",
	slug: "writing_hand",
	group: "People & Body",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"💅": {
	name: "nail polish",
	slug: "nail_polish",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🤳": {
	name: "selfie",
	slug: "selfie",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"💪": {
	name: "flexed biceps",
	slug: "flexed_biceps",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🦾": {
	name: "mechanical arm",
	slug: "mechanical_arm",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🦿": {
	name: "mechanical leg",
	slug: "mechanical_leg",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🦵": {
	name: "leg",
	slug: "leg",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🦶": {
	name: "foot",
	slug: "foot",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"👂": {
	name: "ear",
	slug: "ear",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🦻": {
	name: "ear with hearing aid",
	slug: "ear_with_hearing_aid",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"👃": {
	name: "nose",
	slug: "nose",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🧠": {
	name: "brain",
	slug: "brain",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🫀": {
	name: "anatomical heart",
	slug: "anatomical_heart",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🫁": {
	name: "lungs",
	slug: "lungs",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🦷": {
	name: "tooth",
	slug: "tooth",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🦴": {
	name: "bone",
	slug: "bone",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"👀": {
	name: "eyes",
	slug: "eyes",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👁️": {
	name: "eye",
	slug: "eye",
	group: "People & Body",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"👅": {
	name: "tongue",
	slug: "tongue",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👄": {
	name: "mouth",
	slug: "mouth",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👶": {
	name: "baby",
	slug: "baby",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🧒": {
	name: "child",
	slug: "child",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"👦": {
	name: "boy",
	slug: "boy",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👧": {
	name: "girl",
	slug: "girl",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🧑": {
	name: "person",
	slug: "person",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"👱": {
	name: "person blond hair",
	slug: "person_blond_hair",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👨": {
	name: "man",
	slug: "man",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🧔": {
	name: "person beard",
	slug: "person_beard",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"👨‍🦰": {
	name: "man red hair",
	slug: "man_red_hair",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"👨‍🦱": {
	name: "man curly hair",
	slug: "man_curly_hair",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"👨‍🦳": {
	name: "man white hair",
	slug: "man_white_hair",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"👨‍🦲": {
	name: "man bald",
	slug: "man_bald",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"👩": {
	name: "woman",
	slug: "woman",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👩‍🦰": {
	name: "woman red hair",
	slug: "woman_red_hair",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🧑‍🦰": {
	name: "person red hair",
	slug: "person_red_hair",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👩‍🦱": {
	name: "woman curly hair",
	slug: "woman_curly_hair",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🧑‍🦱": {
	name: "person curly hair",
	slug: "person_curly_hair",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👩‍🦳": {
	name: "woman white hair",
	slug: "woman_white_hair",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🧑‍🦳": {
	name: "person white hair",
	slug: "person_white_hair",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👩‍🦲": {
	name: "woman bald",
	slug: "woman_bald",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🧑‍🦲": {
	name: "person bald",
	slug: "person_bald",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👱‍♀️": {
	name: "woman blond hair",
	slug: "woman_blond_hair",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👱‍♂️": {
	name: "man blond hair",
	slug: "man_blond_hair",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧓": {
	name: "older person",
	slug: "older_person",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"👴": {
	name: "old man",
	slug: "old_man",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👵": {
	name: "old woman",
	slug: "old_woman",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🙍": {
	name: "person frowning",
	slug: "person_frowning",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🙍‍♂️": {
	name: "man frowning",
	slug: "man_frowning",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🙍‍♀️": {
	name: "woman frowning",
	slug: "woman_frowning",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🙎": {
	name: "person pouting",
	slug: "person_pouting",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🙎‍♂️": {
	name: "man pouting",
	slug: "man_pouting",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🙎‍♀️": {
	name: "woman pouting",
	slug: "woman_pouting",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🙅": {
	name: "person gesturing NO",
	slug: "person_gesturing_no",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🙅‍♂️": {
	name: "man gesturing NO",
	slug: "man_gesturing_no",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🙅‍♀️": {
	name: "woman gesturing NO",
	slug: "woman_gesturing_no",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🙆": {
	name: "person gesturing OK",
	slug: "person_gesturing_ok",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🙆‍♂️": {
	name: "man gesturing OK",
	slug: "man_gesturing_ok",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🙆‍♀️": {
	name: "woman gesturing OK",
	slug: "woman_gesturing_ok",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"💁": {
	name: "person tipping hand",
	slug: "person_tipping_hand",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"💁‍♂️": {
	name: "man tipping hand",
	slug: "man_tipping_hand",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"💁‍♀️": {
	name: "woman tipping hand",
	slug: "woman_tipping_hand",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🙋": {
	name: "person raising hand",
	slug: "person_raising_hand",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🙋‍♂️": {
	name: "man raising hand",
	slug: "man_raising_hand",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🙋‍♀️": {
	name: "woman raising hand",
	slug: "woman_raising_hand",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧏": {
	name: "deaf person",
	slug: "deaf_person",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🧏‍♂️": {
	name: "deaf man",
	slug: "deaf_man",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🧏‍♀️": {
	name: "deaf woman",
	slug: "deaf_woman",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🙇": {
	name: "person bowing",
	slug: "person_bowing",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🙇‍♂️": {
	name: "man bowing",
	slug: "man_bowing",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🙇‍♀️": {
	name: "woman bowing",
	slug: "woman_bowing",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤦": {
	name: "person facepalming",
	slug: "person_facepalming",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🤦‍♂️": {
	name: "man facepalming",
	slug: "man_facepalming",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤦‍♀️": {
	name: "woman facepalming",
	slug: "woman_facepalming",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤷": {
	name: "person shrugging",
	slug: "person_shrugging",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🤷‍♂️": {
	name: "man shrugging",
	slug: "man_shrugging",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤷‍♀️": {
	name: "woman shrugging",
	slug: "woman_shrugging",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍⚕️": {
	name: "health worker",
	slug: "health_worker",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍⚕️": {
	name: "man health worker",
	slug: "man_health_worker",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍⚕️": {
	name: "woman health worker",
	slug: "woman_health_worker",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🎓": {
	name: "student",
	slug: "student",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🎓": {
	name: "man student",
	slug: "man_student",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🎓": {
	name: "woman student",
	slug: "woman_student",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🏫": {
	name: "teacher",
	slug: "teacher",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🏫": {
	name: "man teacher",
	slug: "man_teacher",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🏫": {
	name: "woman teacher",
	slug: "woman_teacher",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍⚖️": {
	name: "judge",
	slug: "judge",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍⚖️": {
	name: "man judge",
	slug: "man_judge",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍⚖️": {
	name: "woman judge",
	slug: "woman_judge",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🌾": {
	name: "farmer",
	slug: "farmer",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🌾": {
	name: "man farmer",
	slug: "man_farmer",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🌾": {
	name: "woman farmer",
	slug: "woman_farmer",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🍳": {
	name: "cook",
	slug: "cook",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🍳": {
	name: "man cook",
	slug: "man_cook",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🍳": {
	name: "woman cook",
	slug: "woman_cook",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🔧": {
	name: "mechanic",
	slug: "mechanic",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🔧": {
	name: "man mechanic",
	slug: "man_mechanic",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🔧": {
	name: "woman mechanic",
	slug: "woman_mechanic",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🏭": {
	name: "factory worker",
	slug: "factory_worker",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🏭": {
	name: "man factory worker",
	slug: "man_factory_worker",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🏭": {
	name: "woman factory worker",
	slug: "woman_factory_worker",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍💼": {
	name: "office worker",
	slug: "office_worker",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍💼": {
	name: "man office worker",
	slug: "man_office_worker",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍💼": {
	name: "woman office worker",
	slug: "woman_office_worker",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🔬": {
	name: "scientist",
	slug: "scientist",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🔬": {
	name: "man scientist",
	slug: "man_scientist",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🔬": {
	name: "woman scientist",
	slug: "woman_scientist",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍💻": {
	name: "technologist",
	slug: "technologist",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍💻": {
	name: "man technologist",
	slug: "man_technologist",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍💻": {
	name: "woman technologist",
	slug: "woman_technologist",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🎤": {
	name: "singer",
	slug: "singer",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🎤": {
	name: "man singer",
	slug: "man_singer",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🎤": {
	name: "woman singer",
	slug: "woman_singer",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🎨": {
	name: "artist",
	slug: "artist",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🎨": {
	name: "man artist",
	slug: "man_artist",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🎨": {
	name: "woman artist",
	slug: "woman_artist",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍✈️": {
	name: "pilot",
	slug: "pilot",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍✈️": {
	name: "man pilot",
	slug: "man_pilot",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍✈️": {
	name: "woman pilot",
	slug: "woman_pilot",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🚀": {
	name: "astronaut",
	slug: "astronaut",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🚀": {
	name: "man astronaut",
	slug: "man_astronaut",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🚀": {
	name: "woman astronaut",
	slug: "woman_astronaut",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🚒": {
	name: "firefighter",
	slug: "firefighter",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🚒": {
	name: "man firefighter",
	slug: "man_firefighter",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👩‍🚒": {
	name: "woman firefighter",
	slug: "woman_firefighter",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👮": {
	name: "police officer",
	slug: "police_officer",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👮‍♂️": {
	name: "man police officer",
	slug: "man_police_officer",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👮‍♀️": {
	name: "woman police officer",
	slug: "woman_police_officer",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🕵️": {
	name: "detective",
	slug: "detective",
	group: "People & Body",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "2.0"
},
	"🕵️‍♂️": {
	name: "man detective",
	slug: "man_detective",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🕵️‍♀️": {
	name: "woman detective",
	slug: "woman_detective",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"💂": {
	name: "guard",
	slug: "guard",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"💂‍♂️": {
	name: "man guard",
	slug: "man_guard",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"💂‍♀️": {
	name: "woman guard",
	slug: "woman_guard",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🥷": {
	name: "ninja",
	slug: "ninja",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "13.0"
},
	"👷": {
	name: "construction worker",
	slug: "construction_worker",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👷‍♂️": {
	name: "man construction worker",
	slug: "man_construction_worker",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👷‍♀️": {
	name: "woman construction worker",
	slug: "woman_construction_worker",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤴": {
	name: "prince",
	slug: "prince",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"👸": {
	name: "princess",
	slug: "princess",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👳": {
	name: "person wearing turban",
	slug: "person_wearing_turban",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👳‍♂️": {
	name: "man wearing turban",
	slug: "man_wearing_turban",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👳‍♀️": {
	name: "woman wearing turban",
	slug: "woman_wearing_turban",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👲": {
	name: "person with skullcap",
	slug: "person_with_skullcap",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🧕": {
	name: "woman with headscarf",
	slug: "woman_with_headscarf",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🤵": {
	name: "person in tuxedo",
	slug: "person_in_tuxedo",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🤵‍♂️": {
	name: "man in tuxedo",
	slug: "man_in_tuxedo",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "13.0"
},
	"🤵‍♀️": {
	name: "woman in tuxedo",
	slug: "woman_in_tuxedo",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "13.0"
},
	"👰": {
	name: "person with veil",
	slug: "person_with_veil",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"👰‍♂️": {
	name: "man with veil",
	slug: "man_with_veil",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "13.0"
},
	"👰‍♀️": {
	name: "woman with veil",
	slug: "woman_with_veil",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "13.0"
},
	"🤰": {
	name: "pregnant woman",
	slug: "pregnant_woman",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🤱": {
	name: "breast-feeding",
	slug: "breast_feeding",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"👩‍🍼": {
	name: "woman feeding baby",
	slug: "woman_feeding_baby",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "13.0"
},
	"👨‍🍼": {
	name: "man feeding baby",
	slug: "man_feeding_baby",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "13.0"
},
	"🧑‍🍼": {
	name: "person feeding baby",
	slug: "person_feeding_baby",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "13.0"
},
	"👼": {
	name: "baby angel",
	slug: "baby_angel",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🎅": {
	name: "Santa Claus",
	slug: "santa_claus",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🤶": {
	name: "Mrs. Claus",
	slug: "mrs_claus",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🧑‍🎄": {
	name: "mx claus",
	slug: "mx_claus",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "13.0"
},
	"🦸": {
	name: "superhero",
	slug: "superhero",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🦸‍♂️": {
	name: "man superhero",
	slug: "man_superhero",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🦸‍♀️": {
	name: "woman superhero",
	slug: "woman_superhero",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🦹": {
	name: "supervillain",
	slug: "supervillain",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🦹‍♂️": {
	name: "man supervillain",
	slug: "man_supervillain",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🦹‍♀️": {
	name: "woman supervillain",
	slug: "woman_supervillain",
	group: "People & Body",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "11.0"
},
	"🧙": {
	name: "mage",
	slug: "mage",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧙‍♂️": {
	name: "man mage",
	slug: "man_mage",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧙‍♀️": {
	name: "woman mage",
	slug: "woman_mage",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧚": {
	name: "fairy",
	slug: "fairy",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧚‍♂️": {
	name: "man fairy",
	slug: "man_fairy",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧚‍♀️": {
	name: "woman fairy",
	slug: "woman_fairy",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧛": {
	name: "vampire",
	slug: "vampire",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧛‍♂️": {
	name: "man vampire",
	slug: "man_vampire",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧛‍♀️": {
	name: "woman vampire",
	slug: "woman_vampire",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧜": {
	name: "merperson",
	slug: "merperson",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧜‍♂️": {
	name: "merman",
	slug: "merman",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧜‍♀️": {
	name: "mermaid",
	slug: "mermaid",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧝": {
	name: "elf",
	slug: "elf",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧝‍♂️": {
	name: "man elf",
	slug: "man_elf",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧝‍♀️": {
	name: "woman elf",
	slug: "woman_elf",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧞": {
	name: "genie",
	slug: "genie",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🧞‍♂️": {
	name: "man genie",
	slug: "man_genie",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🧞‍♀️": {
	name: "woman genie",
	slug: "woman_genie",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🧟": {
	name: "zombie",
	slug: "zombie",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🧟‍♂️": {
	name: "man zombie",
	slug: "man_zombie",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🧟‍♀️": {
	name: "woman zombie",
	slug: "woman_zombie",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"💆": {
	name: "person getting massage",
	slug: "person_getting_massage",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"💆‍♂️": {
	name: "man getting massage",
	slug: "man_getting_massage",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"💆‍♀️": {
	name: "woman getting massage",
	slug: "woman_getting_massage",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"💇": {
	name: "person getting haircut",
	slug: "person_getting_haircut",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"💇‍♂️": {
	name: "man getting haircut",
	slug: "man_getting_haircut",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"💇‍♀️": {
	name: "woman getting haircut",
	slug: "woman_getting_haircut",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🚶": {
	name: "person walking",
	slug: "person_walking",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🚶‍♂️": {
	name: "man walking",
	slug: "man_walking",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🚶‍♀️": {
	name: "woman walking",
	slug: "woman_walking",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧍": {
	name: "person standing",
	slug: "person_standing",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🧍‍♂️": {
	name: "man standing",
	slug: "man_standing",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🧍‍♀️": {
	name: "woman standing",
	slug: "woman_standing",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🧎": {
	name: "person kneeling",
	slug: "person_kneeling",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🧎‍♂️": {
	name: "man kneeling",
	slug: "man_kneeling",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🧎‍♀️": {
	name: "woman kneeling",
	slug: "woman_kneeling",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🧑‍🦯": {
	name: "person with white cane",
	slug: "person_with_white_cane",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🦯": {
	name: "man with white cane",
	slug: "man_with_white_cane",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"👩‍🦯": {
	name: "woman with white cane",
	slug: "woman_with_white_cane",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🧑‍🦼": {
	name: "person in motorized wheelchair",
	slug: "person_in_motorized_wheelchair",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🦼": {
	name: "man in motorized wheelchair",
	slug: "man_in_motorized_wheelchair",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"👩‍🦼": {
	name: "woman in motorized wheelchair",
	slug: "woman_in_motorized_wheelchair",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🧑‍🦽": {
	name: "person in manual wheelchair",
	slug: "person_in_manual_wheelchair",
	group: "People & Body",
	emoji_version: "12.1",
	unicode_version: "12.1",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.1"
},
	"👨‍🦽": {
	name: "man in manual wheelchair",
	slug: "man_in_manual_wheelchair",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"👩‍🦽": {
	name: "woman in manual wheelchair",
	slug: "woman_in_manual_wheelchair",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"🏃": {
	name: "person running",
	slug: "person_running",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🏃‍♂️": {
	name: "man running",
	slug: "man_running",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🏃‍♀️": {
	name: "woman running",
	slug: "woman_running",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"💃": {
	name: "woman dancing",
	slug: "woman_dancing",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🕺": {
	name: "man dancing",
	slug: "man_dancing",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🕴️": {
	name: "person in suit levitating",
	slug: "person_in_suit_levitating",
	group: "People & Body",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"👯": {
	name: "people with bunny ears",
	slug: "people_with_bunny_ears",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👯‍♂️": {
	name: "men with bunny ears",
	slug: "men_with_bunny_ears",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"👯‍♀️": {
	name: "women with bunny ears",
	slug: "women_with_bunny_ears",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"🧖": {
	name: "person in steamy room",
	slug: "person_in_steamy_room",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧖‍♂️": {
	name: "man in steamy room",
	slug: "man_in_steamy_room",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧖‍♀️": {
	name: "woman in steamy room",
	slug: "woman_in_steamy_room",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧗": {
	name: "person climbing",
	slug: "person_climbing",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧗‍♂️": {
	name: "man climbing",
	slug: "man_climbing",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧗‍♀️": {
	name: "woman climbing",
	slug: "woman_climbing",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🤺": {
	name: "person fencing",
	slug: "person_fencing",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🏇": {
	name: "horse racing",
	slug: "horse_racing",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"⛷️": {
	name: "skier",
	slug: "skier",
	group: "People & Body",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏂": {
	name: "snowboarder",
	slug: "snowboarder",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🏌️": {
	name: "person golfing",
	slug: "person_golfing",
	group: "People & Body",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🏌️‍♂️": {
	name: "man golfing",
	slug: "man_golfing",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🏌️‍♀️": {
	name: "woman golfing",
	slug: "woman_golfing",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🏄": {
	name: "person surfing",
	slug: "person_surfing",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🏄‍♂️": {
	name: "man surfing",
	slug: "man_surfing",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🏄‍♀️": {
	name: "woman surfing",
	slug: "woman_surfing",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🚣": {
	name: "person rowing boat",
	slug: "person_rowing_boat",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🚣‍♂️": {
	name: "man rowing boat",
	slug: "man_rowing_boat",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🚣‍♀️": {
	name: "woman rowing boat",
	slug: "woman_rowing_boat",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🏊": {
	name: "person swimming",
	slug: "person_swimming",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🏊‍♂️": {
	name: "man swimming",
	slug: "man_swimming",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🏊‍♀️": {
	name: "woman swimming",
	slug: "woman_swimming",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"⛹️": {
	name: "person bouncing ball",
	slug: "person_bouncing_ball",
	group: "People & Body",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "2.0"
},
	"⛹️‍♂️": {
	name: "man bouncing ball",
	slug: "man_bouncing_ball",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"⛹️‍♀️": {
	name: "woman bouncing ball",
	slug: "woman_bouncing_ball",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🏋️": {
	name: "person lifting weights",
	slug: "person_lifting_weights",
	group: "People & Body",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "2.0"
},
	"🏋️‍♂️": {
	name: "man lifting weights",
	slug: "man_lifting_weights",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🏋️‍♀️": {
	name: "woman lifting weights",
	slug: "woman_lifting_weights",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🚴": {
	name: "person biking",
	slug: "person_biking",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🚴‍♂️": {
	name: "man biking",
	slug: "man_biking",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🚴‍♀️": {
	name: "woman biking",
	slug: "woman_biking",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🚵": {
	name: "person mountain biking",
	slug: "person_mountain_biking",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🚵‍♂️": {
	name: "man mountain biking",
	slug: "man_mountain_biking",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🚵‍♀️": {
	name: "woman mountain biking",
	slug: "woman_mountain_biking",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤸": {
	name: "person cartwheeling",
	slug: "person_cartwheeling",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🤸‍♂️": {
	name: "man cartwheeling",
	slug: "man_cartwheeling",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤸‍♀️": {
	name: "woman cartwheeling",
	slug: "woman_cartwheeling",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤼": {
	name: "people wrestling",
	slug: "people_wrestling",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🤼‍♂️": {
	name: "men wrestling",
	slug: "men_wrestling",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"🤼‍♀️": {
	name: "women wrestling",
	slug: "women_wrestling",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"🤽": {
	name: "person playing water polo",
	slug: "person_playing_water_polo",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🤽‍♂️": {
	name: "man playing water polo",
	slug: "man_playing_water_polo",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤽‍♀️": {
	name: "woman playing water polo",
	slug: "woman_playing_water_polo",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤾": {
	name: "person playing handball",
	slug: "person_playing_handball",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🤾‍♂️": {
	name: "man playing handball",
	slug: "man_playing_handball",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤾‍♀️": {
	name: "woman playing handball",
	slug: "woman_playing_handball",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤹": {
	name: "person juggling",
	slug: "person_juggling",
	group: "People & Body",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "3.0"
},
	"🤹‍♂️": {
	name: "man juggling",
	slug: "man_juggling",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🤹‍♀️": {
	name: "woman juggling",
	slug: "woman_juggling",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧘": {
	name: "person in lotus position",
	slug: "person_in_lotus_position",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧘‍♂️": {
	name: "man in lotus position",
	slug: "man_in_lotus_position",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🧘‍♀️": {
	name: "woman in lotus position",
	slug: "woman_in_lotus_position",
	group: "People & Body",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "5.0"
},
	"🛀": {
	name: "person taking bath",
	slug: "person_taking_bath",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "1.0"
},
	"🛌": {
	name: "person in bed",
	slug: "person_in_bed",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "4.0"
},
	"🧑‍🤝‍🧑": {
	name: "people holding hands",
	slug: "people_holding_hands",
	group: "People & Body",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"👭": {
	name: "women holding hands",
	slug: "women_holding_hands",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"👫": {
	name: "woman and man holding hands",
	slug: "woman_and_man_holding_hands",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"👬": {
	name: "men holding hands",
	slug: "men_holding_hands",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: true,
	skin_tone_support_unicode_version: "12.0"
},
	"💏": {
	name: "kiss",
	slug: "kiss",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👩‍❤️‍💋‍👨": {
	name: "kiss woman, man",
	slug: "kiss_woman_man",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍❤️‍💋‍👨": {
	name: "kiss man, man",
	slug: "kiss_man_man",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👩‍❤️‍💋‍👩": {
	name: "kiss woman, woman",
	slug: "kiss_woman_woman",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"💑": {
	name: "couple with heart",
	slug: "couple_with_heart",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👩‍❤️‍👨": {
	name: "couple with heart woman, man",
	slug: "couple_with_heart_woman_man",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍❤️‍👨": {
	name: "couple with heart man, man",
	slug: "couple_with_heart_man_man",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👩‍❤️‍👩": {
	name: "couple with heart woman, woman",
	slug: "couple_with_heart_woman_woman",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👪": {
	name: "family",
	slug: "family",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👨‍👩‍👦": {
	name: "family man, woman, boy",
	slug: "family_man_woman_boy",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍👩‍👧": {
	name: "family man, woman, girl",
	slug: "family_man_woman_girl",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍👩‍👧‍👦": {
	name: "family man, woman, girl, boy",
	slug: "family_man_woman_girl_boy",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍👩‍👦‍👦": {
	name: "family man, woman, boy, boy",
	slug: "family_man_woman_boy_boy",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍👩‍👧‍👧": {
	name: "family man, woman, girl, girl",
	slug: "family_man_woman_girl_girl",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍👨‍👦": {
	name: "family man, man, boy",
	slug: "family_man_man_boy",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍👨‍👧": {
	name: "family man, man, girl",
	slug: "family_man_man_girl",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍👨‍👧‍👦": {
	name: "family man, man, girl, boy",
	slug: "family_man_man_girl_boy",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍👨‍👦‍👦": {
	name: "family man, man, boy, boy",
	slug: "family_man_man_boy_boy",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍👨‍👧‍👧": {
	name: "family man, man, girl, girl",
	slug: "family_man_man_girl_girl",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👩‍👩‍👦": {
	name: "family woman, woman, boy",
	slug: "family_woman_woman_boy",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👩‍👩‍👧": {
	name: "family woman, woman, girl",
	slug: "family_woman_woman_girl",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👩‍👩‍👧‍👦": {
	name: "family woman, woman, girl, boy",
	slug: "family_woman_woman_girl_boy",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👩‍👩‍👦‍👦": {
	name: "family woman, woman, boy, boy",
	slug: "family_woman_woman_boy_boy",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👩‍👩‍👧‍👧": {
	name: "family woman, woman, girl, girl",
	slug: "family_woman_woman_girl_girl",
	group: "People & Body",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"👨‍👦": {
	name: "family man, boy",
	slug: "family_man_boy",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"👨‍👦‍👦": {
	name: "family man, boy, boy",
	slug: "family_man_boy_boy",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"👨‍👧": {
	name: "family man, girl",
	slug: "family_man_girl",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"👨‍👧‍👦": {
	name: "family man, girl, boy",
	slug: "family_man_girl_boy",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"👨‍👧‍👧": {
	name: "family man, girl, girl",
	slug: "family_man_girl_girl",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"👩‍👦": {
	name: "family woman, boy",
	slug: "family_woman_boy",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"👩‍👦‍👦": {
	name: "family woman, boy, boy",
	slug: "family_woman_boy_boy",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"👩‍👧": {
	name: "family woman, girl",
	slug: "family_woman_girl",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"👩‍👧‍👦": {
	name: "family woman, girl, boy",
	slug: "family_woman_girl_boy",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"👩‍👧‍👧": {
	name: "family woman, girl, girl",
	slug: "family_woman_girl_girl",
	group: "People & Body",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"🗣️": {
	name: "speaking head",
	slug: "speaking_head",
	group: "People & Body",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"👤": {
	name: "bust in silhouette",
	slug: "bust_in_silhouette",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👥": {
	name: "busts in silhouette",
	slug: "busts_in_silhouette",
	group: "People & Body",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🫂": {
	name: "people hugging",
	slug: "people_hugging",
	group: "People & Body",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"👣": {
	name: "footprints",
	slug: "footprints",
	group: "People & Body",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐵": {
	name: "monkey face",
	slug: "monkey_face",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐒": {
	name: "monkey",
	slug: "monkey",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦍": {
	name: "gorilla",
	slug: "gorilla",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🦧": {
	name: "orangutan",
	slug: "orangutan",
	group: "Animals & Nature",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🐶": {
	name: "dog face",
	slug: "dog_face",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐕": {
	name: "dog",
	slug: "dog",
	group: "Animals & Nature",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🦮": {
	name: "guide dog",
	slug: "guide_dog",
	group: "Animals & Nature",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🐕‍🦺": {
	name: "service dog",
	slug: "service_dog",
	group: "Animals & Nature",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🐩": {
	name: "poodle",
	slug: "poodle",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐺": {
	name: "wolf",
	slug: "wolf",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦊": {
	name: "fox",
	slug: "fox",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🦝": {
	name: "raccoon",
	slug: "raccoon",
	group: "Animals & Nature",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🐱": {
	name: "cat face",
	slug: "cat_face",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐈": {
	name: "cat",
	slug: "cat",
	group: "Animals & Nature",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🐈‍⬛": {
	name: "black cat",
	slug: "black_cat",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🦁": {
	name: "lion",
	slug: "lion",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐯": {
	name: "tiger face",
	slug: "tiger_face",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐅": {
	name: "tiger",
	slug: "tiger",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐆": {
	name: "leopard",
	slug: "leopard",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐴": {
	name: "horse face",
	slug: "horse_face",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐎": {
	name: "horse",
	slug: "horse",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦄": {
	name: "unicorn",
	slug: "unicorn",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🦓": {
	name: "zebra",
	slug: "zebra",
	group: "Animals & Nature",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🦌": {
	name: "deer",
	slug: "deer",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🦬": {
	name: "bison",
	slug: "bison",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🐮": {
	name: "cow face",
	slug: "cow_face",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐂": {
	name: "ox",
	slug: "ox",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐃": {
	name: "water buffalo",
	slug: "water_buffalo",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐄": {
	name: "cow",
	slug: "cow",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐷": {
	name: "pig face",
	slug: "pig_face",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐖": {
	name: "pig",
	slug: "pig",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐗": {
	name: "boar",
	slug: "boar",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐽": {
	name: "pig nose",
	slug: "pig_nose",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐏": {
	name: "ram",
	slug: "ram",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐑": {
	name: "ewe",
	slug: "ewe",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐐": {
	name: "goat",
	slug: "goat",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐪": {
	name: "camel",
	slug: "camel",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐫": {
	name: "two-hump camel",
	slug: "two_hump_camel",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦙": {
	name: "llama",
	slug: "llama",
	group: "Animals & Nature",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🦒": {
	name: "giraffe",
	slug: "giraffe",
	group: "Animals & Nature",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🐘": {
	name: "elephant",
	slug: "elephant",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦣": {
	name: "mammoth",
	slug: "mammoth",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🦏": {
	name: "rhinoceros",
	slug: "rhinoceros",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🦛": {
	name: "hippopotamus",
	slug: "hippopotamus",
	group: "Animals & Nature",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🐭": {
	name: "mouse face",
	slug: "mouse_face",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐁": {
	name: "mouse",
	slug: "mouse",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐀": {
	name: "rat",
	slug: "rat",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐹": {
	name: "hamster",
	slug: "hamster",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐰": {
	name: "rabbit face",
	slug: "rabbit_face",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐇": {
	name: "rabbit",
	slug: "rabbit",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐿️": {
	name: "chipmunk",
	slug: "chipmunk",
	group: "Animals & Nature",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🦫": {
	name: "beaver",
	slug: "beaver",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🦔": {
	name: "hedgehog",
	slug: "hedgehog",
	group: "Animals & Nature",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🦇": {
	name: "bat",
	slug: "bat",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🐻": {
	name: "bear",
	slug: "bear",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐻‍❄️": {
	name: "polar bear",
	slug: "polar_bear",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🐨": {
	name: "koala",
	slug: "koala",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐼": {
	name: "panda",
	slug: "panda",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦥": {
	name: "sloth",
	slug: "sloth",
	group: "Animals & Nature",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🦦": {
	name: "otter",
	slug: "otter",
	group: "Animals & Nature",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🦨": {
	name: "skunk",
	slug: "skunk",
	group: "Animals & Nature",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🦘": {
	name: "kangaroo",
	slug: "kangaroo",
	group: "Animals & Nature",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🦡": {
	name: "badger",
	slug: "badger",
	group: "Animals & Nature",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🐾": {
	name: "paw prints",
	slug: "paw_prints",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦃": {
	name: "turkey",
	slug: "turkey",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐔": {
	name: "chicken",
	slug: "chicken",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐓": {
	name: "rooster",
	slug: "rooster",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐣": {
	name: "hatching chick",
	slug: "hatching_chick",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐤": {
	name: "baby chick",
	slug: "baby_chick",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐥": {
	name: "front-facing baby chick",
	slug: "front_facing_baby_chick",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐦": {
	name: "bird",
	slug: "bird",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐧": {
	name: "penguin",
	slug: "penguin",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕊️": {
	name: "dove",
	slug: "dove",
	group: "Animals & Nature",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🦅": {
	name: "eagle",
	slug: "eagle",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🦆": {
	name: "duck",
	slug: "duck",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🦢": {
	name: "swan",
	slug: "swan",
	group: "Animals & Nature",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🦉": {
	name: "owl",
	slug: "owl",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🦤": {
	name: "dodo",
	slug: "dodo",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🪶": {
	name: "feather",
	slug: "feather",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🦩": {
	name: "flamingo",
	slug: "flamingo",
	group: "Animals & Nature",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🦚": {
	name: "peacock",
	slug: "peacock",
	group: "Animals & Nature",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🦜": {
	name: "parrot",
	slug: "parrot",
	group: "Animals & Nature",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🐸": {
	name: "frog",
	slug: "frog",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐊": {
	name: "crocodile",
	slug: "crocodile",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐢": {
	name: "turtle",
	slug: "turtle",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦎": {
	name: "lizard",
	slug: "lizard",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🐍": {
	name: "snake",
	slug: "snake",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐲": {
	name: "dragon face",
	slug: "dragon_face",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐉": {
	name: "dragon",
	slug: "dragon",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🦕": {
	name: "sauropod",
	slug: "sauropod",
	group: "Animals & Nature",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🦖": {
	name: "T-Rex",
	slug: "t_rex",
	group: "Animals & Nature",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🐳": {
	name: "spouting whale",
	slug: "spouting_whale",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐋": {
	name: "whale",
	slug: "whale",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🐬": {
	name: "dolphin",
	slug: "dolphin",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦭": {
	name: "seal",
	slug: "seal",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🐟": {
	name: "fish",
	slug: "fish",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐠": {
	name: "tropical fish",
	slug: "tropical_fish",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐡": {
	name: "blowfish",
	slug: "blowfish",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦈": {
	name: "shark",
	slug: "shark",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🐙": {
	name: "octopus",
	slug: "octopus",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐚": {
	name: "spiral shell",
	slug: "spiral_shell",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐌": {
	name: "snail",
	slug: "snail",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦋": {
	name: "butterfly",
	slug: "butterfly",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🐛": {
	name: "bug",
	slug: "bug",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐜": {
	name: "ant",
	slug: "ant",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🐝": {
	name: "honeybee",
	slug: "honeybee",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪲": {
	name: "beetle",
	slug: "beetle",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🐞": {
	name: "lady beetle",
	slug: "lady_beetle",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🦗": {
	name: "cricket",
	slug: "cricket",
	group: "Animals & Nature",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🪳": {
	name: "cockroach",
	slug: "cockroach",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🕷️": {
	name: "spider",
	slug: "spider",
	group: "Animals & Nature",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕸️": {
	name: "spider web",
	slug: "spider_web",
	group: "Animals & Nature",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🦂": {
	name: "scorpion",
	slug: "scorpion",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🦟": {
	name: "mosquito",
	slug: "mosquito",
	group: "Animals & Nature",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🪰": {
	name: "fly",
	slug: "fly",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🪱": {
	name: "worm",
	slug: "worm",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🦠": {
	name: "microbe",
	slug: "microbe",
	group: "Animals & Nature",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"💐": {
	name: "bouquet",
	slug: "bouquet",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌸": {
	name: "cherry blossom",
	slug: "cherry_blossom",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💮": {
	name: "white flower",
	slug: "white_flower",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏵️": {
	name: "rosette",
	slug: "rosette",
	group: "Animals & Nature",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌹": {
	name: "rose",
	slug: "rose",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥀": {
	name: "wilted flower",
	slug: "wilted_flower",
	group: "Animals & Nature",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🌺": {
	name: "hibiscus",
	slug: "hibiscus",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌻": {
	name: "sunflower",
	slug: "sunflower",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌼": {
	name: "blossom",
	slug: "blossom",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌷": {
	name: "tulip",
	slug: "tulip",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌱": {
	name: "seedling",
	slug: "seedling",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪴": {
	name: "potted plant",
	slug: "potted_plant",
	group: "Animals & Nature",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🌲": {
	name: "evergreen tree",
	slug: "evergreen_tree",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🌳": {
	name: "deciduous tree",
	slug: "deciduous_tree",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🌴": {
	name: "palm tree",
	slug: "palm_tree",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌵": {
	name: "cactus",
	slug: "cactus",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌾": {
	name: "sheaf of rice",
	slug: "sheaf_of_rice",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌿": {
	name: "herb",
	slug: "herb",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"☘️": {
	name: "shamrock",
	slug: "shamrock",
	group: "Animals & Nature",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🍀": {
	name: "four leaf clover",
	slug: "four_leaf_clover",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍁": {
	name: "maple leaf",
	slug: "maple_leaf",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍂": {
	name: "fallen leaf",
	slug: "fallen_leaf",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍃": {
	name: "leaf fluttering in wind",
	slug: "leaf_fluttering_in_wind",
	group: "Animals & Nature",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍇": {
	name: "grapes",
	slug: "grapes",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍈": {
	name: "melon",
	slug: "melon",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍉": {
	name: "watermelon",
	slug: "watermelon",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍊": {
	name: "tangerine",
	slug: "tangerine",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍋": {
	name: "lemon",
	slug: "lemon",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🍌": {
	name: "banana",
	slug: "banana",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍍": {
	name: "pineapple",
	slug: "pineapple",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥭": {
	name: "mango",
	slug: "mango",
	group: "Food & Drink",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🍎": {
	name: "red apple",
	slug: "red_apple",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍏": {
	name: "green apple",
	slug: "green_apple",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍐": {
	name: "pear",
	slug: "pear",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🍑": {
	name: "peach",
	slug: "peach",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍒": {
	name: "cherries",
	slug: "cherries",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍓": {
	name: "strawberry",
	slug: "strawberry",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🫐": {
	name: "blueberries",
	slug: "blueberries",
	group: "Food & Drink",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🥝": {
	name: "kiwi fruit",
	slug: "kiwi_fruit",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🍅": {
	name: "tomato",
	slug: "tomato",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🫒": {
	name: "olive",
	slug: "olive",
	group: "Food & Drink",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🥥": {
	name: "coconut",
	slug: "coconut",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🥑": {
	name: "avocado",
	slug: "avocado",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🍆": {
	name: "eggplant",
	slug: "eggplant",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥔": {
	name: "potato",
	slug: "potato",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥕": {
	name: "carrot",
	slug: "carrot",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🌽": {
	name: "ear of corn",
	slug: "ear_of_corn",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌶️": {
	name: "hot pepper",
	slug: "hot_pepper",
	group: "Food & Drink",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🫑": {
	name: "bell pepper",
	slug: "bell_pepper",
	group: "Food & Drink",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🥒": {
	name: "cucumber",
	slug: "cucumber",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥬": {
	name: "leafy green",
	slug: "leafy_green",
	group: "Food & Drink",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🥦": {
	name: "broccoli",
	slug: "broccoli",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🧄": {
	name: "garlic",
	slug: "garlic",
	group: "Food & Drink",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🧅": {
	name: "onion",
	slug: "onion",
	group: "Food & Drink",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🍄": {
	name: "mushroom",
	slug: "mushroom",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥜": {
	name: "peanuts",
	slug: "peanuts",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🌰": {
	name: "chestnut",
	slug: "chestnut",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍞": {
	name: "bread",
	slug: "bread",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥐": {
	name: "croissant",
	slug: "croissant",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥖": {
	name: "baguette bread",
	slug: "baguette_bread",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🫓": {
	name: "flatbread",
	slug: "flatbread",
	group: "Food & Drink",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🥨": {
	name: "pretzel",
	slug: "pretzel",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🥯": {
	name: "bagel",
	slug: "bagel",
	group: "Food & Drink",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🥞": {
	name: "pancakes",
	slug: "pancakes",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🧇": {
	name: "waffle",
	slug: "waffle",
	group: "Food & Drink",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🧀": {
	name: "cheese wedge",
	slug: "cheese_wedge",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🍖": {
	name: "meat on bone",
	slug: "meat_on_bone",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍗": {
	name: "poultry leg",
	slug: "poultry_leg",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥩": {
	name: "cut of meat",
	slug: "cut_of_meat",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🥓": {
	name: "bacon",
	slug: "bacon",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🍔": {
	name: "hamburger",
	slug: "hamburger",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍟": {
	name: "french fries",
	slug: "french_fries",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍕": {
	name: "pizza",
	slug: "pizza",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌭": {
	name: "hot dog",
	slug: "hot_dog",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🥪": {
	name: "sandwich",
	slug: "sandwich",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🌮": {
	name: "taco",
	slug: "taco",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🌯": {
	name: "burrito",
	slug: "burrito",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🫔": {
	name: "tamale",
	slug: "tamale",
	group: "Food & Drink",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🥙": {
	name: "stuffed flatbread",
	slug: "stuffed_flatbread",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🧆": {
	name: "falafel",
	slug: "falafel",
	group: "Food & Drink",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🥚": {
	name: "egg",
	slug: "egg",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🍳": {
	name: "cooking",
	slug: "cooking",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥘": {
	name: "shallow pan of food",
	slug: "shallow_pan_of_food",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🍲": {
	name: "pot of food",
	slug: "pot_of_food",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🫕": {
	name: "fondue",
	slug: "fondue",
	group: "Food & Drink",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🥣": {
	name: "bowl with spoon",
	slug: "bowl_with_spoon",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🥗": {
	name: "green salad",
	slug: "green_salad",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🍿": {
	name: "popcorn",
	slug: "popcorn",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🧈": {
	name: "butter",
	slug: "butter",
	group: "Food & Drink",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🧂": {
	name: "salt",
	slug: "salt",
	group: "Food & Drink",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🥫": {
	name: "canned food",
	slug: "canned_food",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🍱": {
	name: "bento box",
	slug: "bento_box",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍘": {
	name: "rice cracker",
	slug: "rice_cracker",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍙": {
	name: "rice ball",
	slug: "rice_ball",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍚": {
	name: "cooked rice",
	slug: "cooked_rice",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍛": {
	name: "curry rice",
	slug: "curry_rice",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍜": {
	name: "steaming bowl",
	slug: "steaming_bowl",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍝": {
	name: "spaghetti",
	slug: "spaghetti",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍠": {
	name: "roasted sweet potato",
	slug: "roasted_sweet_potato",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍢": {
	name: "oden",
	slug: "oden",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍣": {
	name: "sushi",
	slug: "sushi",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍤": {
	name: "fried shrimp",
	slug: "fried_shrimp",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍥": {
	name: "fish cake with swirl",
	slug: "fish_cake_with_swirl",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥮": {
	name: "moon cake",
	slug: "moon_cake",
	group: "Food & Drink",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🍡": {
	name: "dango",
	slug: "dango",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥟": {
	name: "dumpling",
	slug: "dumpling",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🥠": {
	name: "fortune cookie",
	slug: "fortune_cookie",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🥡": {
	name: "takeout box",
	slug: "takeout_box",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🦀": {
	name: "crab",
	slug: "crab",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🦞": {
	name: "lobster",
	slug: "lobster",
	group: "Food & Drink",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🦐": {
	name: "shrimp",
	slug: "shrimp",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🦑": {
	name: "squid",
	slug: "squid",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🦪": {
	name: "oyster",
	slug: "oyster",
	group: "Food & Drink",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🍦": {
	name: "soft ice cream",
	slug: "soft_ice_cream",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍧": {
	name: "shaved ice",
	slug: "shaved_ice",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍨": {
	name: "ice cream",
	slug: "ice_cream",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍩": {
	name: "doughnut",
	slug: "doughnut",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍪": {
	name: "cookie",
	slug: "cookie",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎂": {
	name: "birthday cake",
	slug: "birthday_cake",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍰": {
	name: "shortcake",
	slug: "shortcake",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧁": {
	name: "cupcake",
	slug: "cupcake",
	group: "Food & Drink",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🥧": {
	name: "pie",
	slug: "pie",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🍫": {
	name: "chocolate bar",
	slug: "chocolate_bar",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍬": {
	name: "candy",
	slug: "candy",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍭": {
	name: "lollipop",
	slug: "lollipop",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍮": {
	name: "custard",
	slug: "custard",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍯": {
	name: "honey pot",
	slug: "honey_pot",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍼": {
	name: "baby bottle",
	slug: "baby_bottle",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🥛": {
	name: "glass of milk",
	slug: "glass_of_milk",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"☕": {
	name: "hot beverage",
	slug: "hot_beverage",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🫖": {
	name: "teapot",
	slug: "teapot",
	group: "Food & Drink",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🍵": {
	name: "teacup without handle",
	slug: "teacup_without_handle",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍶": {
	name: "sake",
	slug: "sake",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍾": {
	name: "bottle with popping cork",
	slug: "bottle_with_popping_cork",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🍷": {
	name: "wine glass",
	slug: "wine_glass",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍸": {
	name: "cocktail glass",
	slug: "cocktail_glass",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍹": {
	name: "tropical drink",
	slug: "tropical_drink",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍺": {
	name: "beer mug",
	slug: "beer_mug",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🍻": {
	name: "clinking beer mugs",
	slug: "clinking_beer_mugs",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥂": {
	name: "clinking glasses",
	slug: "clinking_glasses",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥃": {
	name: "tumbler glass",
	slug: "tumbler_glass",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥤": {
	name: "cup with straw",
	slug: "cup_with_straw",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🧋": {
	name: "bubble tea",
	slug: "bubble_tea",
	group: "Food & Drink",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🧃": {
	name: "beverage box",
	slug: "beverage_box",
	group: "Food & Drink",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🧉": {
	name: "mate",
	slug: "mate",
	group: "Food & Drink",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🧊": {
	name: "ice",
	slug: "ice",
	group: "Food & Drink",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🥢": {
	name: "chopsticks",
	slug: "chopsticks",
	group: "Food & Drink",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🍽️": {
	name: "fork and knife with plate",
	slug: "fork_and_knife_with_plate",
	group: "Food & Drink",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🍴": {
	name: "fork and knife",
	slug: "fork_and_knife",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥄": {
	name: "spoon",
	slug: "spoon",
	group: "Food & Drink",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🔪": {
	name: "kitchen knife",
	slug: "kitchen_knife",
	group: "Food & Drink",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏺": {
	name: "amphora",
	slug: "amphora",
	group: "Food & Drink",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🌍": {
	name: "globe showing Europe-Africa",
	slug: "globe_showing_europe_africa",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌎": {
	name: "globe showing Americas",
	slug: "globe_showing_americas",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌏": {
	name: "globe showing Asia-Australia",
	slug: "globe_showing_asia_australia",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌐": {
	name: "globe with meridians",
	slug: "globe_with_meridians",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🗺️": {
	name: "world map",
	slug: "world_map",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🗾": {
	name: "map of Japan",
	slug: "map_of_japan",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧭": {
	name: "compass",
	slug: "compass",
	group: "Travel & Places",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🏔️": {
	name: "snow-capped mountain",
	slug: "snow_capped_mountain",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⛰️": {
	name: "mountain",
	slug: "mountain",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌋": {
	name: "volcano",
	slug: "volcano",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🗻": {
	name: "mount fuji",
	slug: "mount_fuji",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏕️": {
	name: "camping",
	slug: "camping",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏖️": {
	name: "beach with umbrella",
	slug: "beach_with_umbrella",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏜️": {
	name: "desert",
	slug: "desert",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏝️": {
	name: "desert island",
	slug: "desert_island",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏞️": {
	name: "national park",
	slug: "national_park",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏟️": {
	name: "stadium",
	slug: "stadium",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏛️": {
	name: "classical building",
	slug: "classical_building",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏗️": {
	name: "building construction",
	slug: "building_construction",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🧱": {
	name: "brick",
	slug: "brick",
	group: "Travel & Places",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🪨": {
	name: "rock",
	slug: "rock",
	group: "Travel & Places",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🪵": {
	name: "wood",
	slug: "wood",
	group: "Travel & Places",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🛖": {
	name: "hut",
	slug: "hut",
	group: "Travel & Places",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🏘️": {
	name: "houses",
	slug: "houses",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏚️": {
	name: "derelict house",
	slug: "derelict_house",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏠": {
	name: "house",
	slug: "house",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏡": {
	name: "house with garden",
	slug: "house_with_garden",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏢": {
	name: "office building",
	slug: "office_building",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏣": {
	name: "Japanese post office",
	slug: "japanese_post_office",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏤": {
	name: "post office",
	slug: "post_office",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🏥": {
	name: "hospital",
	slug: "hospital",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏦": {
	name: "bank",
	slug: "bank",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏨": {
	name: "hotel",
	slug: "hotel",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏩": {
	name: "love hotel",
	slug: "love_hotel",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏪": {
	name: "convenience store",
	slug: "convenience_store",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏫": {
	name: "school",
	slug: "school",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏬": {
	name: "department store",
	slug: "department_store",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏭": {
	name: "factory",
	slug: "factory",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏯": {
	name: "Japanese castle",
	slug: "japanese_castle",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏰": {
	name: "castle",
	slug: "castle",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💒": {
	name: "wedding",
	slug: "wedding",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🗼": {
	name: "Tokyo tower",
	slug: "tokyo_tower",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🗽": {
	name: "Statue of Liberty",
	slug: "statue_of_liberty",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⛪": {
	name: "church",
	slug: "church",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕌": {
	name: "mosque",
	slug: "mosque",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🛕": {
	name: "hindu temple",
	slug: "hindu_temple",
	group: "Travel & Places",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🕍": {
	name: "synagogue",
	slug: "synagogue",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"⛩️": {
	name: "shinto shrine",
	slug: "shinto_shrine",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕋": {
	name: "kaaba",
	slug: "kaaba",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"⛲": {
	name: "fountain",
	slug: "fountain",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⛺": {
	name: "tent",
	slug: "tent",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌁": {
	name: "foggy",
	slug: "foggy",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌃": {
	name: "night with stars",
	slug: "night_with_stars",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏙️": {
	name: "cityscape",
	slug: "cityscape",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌄": {
	name: "sunrise over mountains",
	slug: "sunrise_over_mountains",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌅": {
	name: "sunrise",
	slug: "sunrise",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌆": {
	name: "cityscape at dusk",
	slug: "cityscape_at_dusk",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌇": {
	name: "sunset",
	slug: "sunset",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌉": {
	name: "bridge at night",
	slug: "bridge_at_night",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♨️": {
	name: "hot springs",
	slug: "hot_springs",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎠": {
	name: "carousel horse",
	slug: "carousel_horse",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎡": {
	name: "ferris wheel",
	slug: "ferris_wheel",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎢": {
	name: "roller coaster",
	slug: "roller_coaster",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💈": {
	name: "barber pole",
	slug: "barber_pole",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎪": {
	name: "circus tent",
	slug: "circus_tent",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚂": {
	name: "locomotive",
	slug: "locomotive",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚃": {
	name: "railway car",
	slug: "railway_car",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚄": {
	name: "high-speed train",
	slug: "high_speed_train",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚅": {
	name: "bullet train",
	slug: "bullet_train",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚆": {
	name: "train",
	slug: "train",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚇": {
	name: "metro",
	slug: "metro",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚈": {
	name: "light rail",
	slug: "light_rail",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚉": {
	name: "station",
	slug: "station",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚊": {
	name: "tram",
	slug: "tram",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚝": {
	name: "monorail",
	slug: "monorail",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚞": {
	name: "mountain railway",
	slug: "mountain_railway",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚋": {
	name: "tram car",
	slug: "tram_car",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚌": {
	name: "bus",
	slug: "bus",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚍": {
	name: "oncoming bus",
	slug: "oncoming_bus",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🚎": {
	name: "trolleybus",
	slug: "trolleybus",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚐": {
	name: "minibus",
	slug: "minibus",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚑": {
	name: "ambulance",
	slug: "ambulance",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚒": {
	name: "fire engine",
	slug: "fire_engine",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚓": {
	name: "police car",
	slug: "police_car",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚔": {
	name: "oncoming police car",
	slug: "oncoming_police_car",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🚕": {
	name: "taxi",
	slug: "taxi",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚖": {
	name: "oncoming taxi",
	slug: "oncoming_taxi",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚗": {
	name: "automobile",
	slug: "automobile",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚘": {
	name: "oncoming automobile",
	slug: "oncoming_automobile",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🚙": {
	name: "sport utility vehicle",
	slug: "sport_utility_vehicle",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛻": {
	name: "pickup truck",
	slug: "pickup_truck",
	group: "Travel & Places",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🚚": {
	name: "delivery truck",
	slug: "delivery_truck",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚛": {
	name: "articulated lorry",
	slug: "articulated_lorry",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚜": {
	name: "tractor",
	slug: "tractor",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🏎️": {
	name: "racing car",
	slug: "racing_car",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏍️": {
	name: "motorcycle",
	slug: "motorcycle",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🛵": {
	name: "motor scooter",
	slug: "motor_scooter",
	group: "Travel & Places",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🦽": {
	name: "manual wheelchair",
	slug: "manual_wheelchair",
	group: "Travel & Places",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🦼": {
	name: "motorized wheelchair",
	slug: "motorized_wheelchair",
	group: "Travel & Places",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🛺": {
	name: "auto rickshaw",
	slug: "auto_rickshaw",
	group: "Travel & Places",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🚲": {
	name: "bicycle",
	slug: "bicycle",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛴": {
	name: "kick scooter",
	slug: "kick_scooter",
	group: "Travel & Places",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🛹": {
	name: "skateboard",
	slug: "skateboard",
	group: "Travel & Places",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🛼": {
	name: "roller skate",
	slug: "roller_skate",
	group: "Travel & Places",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🚏": {
	name: "bus stop",
	slug: "bus_stop",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛣️": {
	name: "motorway",
	slug: "motorway",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🛤️": {
	name: "railway track",
	slug: "railway_track",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🛢️": {
	name: "oil drum",
	slug: "oil_drum",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⛽": {
	name: "fuel pump",
	slug: "fuel_pump",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚨": {
	name: "police car light",
	slug: "police_car_light",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚥": {
	name: "horizontal traffic light",
	slug: "horizontal_traffic_light",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚦": {
	name: "vertical traffic light",
	slug: "vertical_traffic_light",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🛑": {
	name: "stop sign",
	slug: "stop_sign",
	group: "Travel & Places",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🚧": {
	name: "construction",
	slug: "construction",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⚓": {
	name: "anchor",
	slug: "anchor",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⛵": {
	name: "sailboat",
	slug: "sailboat",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛶": {
	name: "canoe",
	slug: "canoe",
	group: "Travel & Places",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🚤": {
	name: "speedboat",
	slug: "speedboat",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛳️": {
	name: "passenger ship",
	slug: "passenger_ship",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⛴️": {
	name: "ferry",
	slug: "ferry",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🛥️": {
	name: "motor boat",
	slug: "motor_boat",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🚢": {
	name: "ship",
	slug: "ship",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"✈️": {
	name: "airplane",
	slug: "airplane",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛩️": {
	name: "small airplane",
	slug: "small_airplane",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🛫": {
	name: "airplane departure",
	slug: "airplane_departure",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🛬": {
	name: "airplane arrival",
	slug: "airplane_arrival",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🪂": {
	name: "parachute",
	slug: "parachute",
	group: "Travel & Places",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"💺": {
	name: "seat",
	slug: "seat",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚁": {
	name: "helicopter",
	slug: "helicopter",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚟": {
	name: "suspension railway",
	slug: "suspension_railway",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚠": {
	name: "mountain cableway",
	slug: "mountain_cableway",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚡": {
	name: "aerial tramway",
	slug: "aerial_tramway",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🛰️": {
	name: "satellite",
	slug: "satellite",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🚀": {
	name: "rocket",
	slug: "rocket",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛸": {
	name: "flying saucer",
	slug: "flying_saucer",
	group: "Travel & Places",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🛎️": {
	name: "bellhop bell",
	slug: "bellhop_bell",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🧳": {
	name: "luggage",
	slug: "luggage",
	group: "Travel & Places",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"⌛": {
	name: "hourglass done",
	slug: "hourglass_done",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⏳": {
	name: "hourglass not done",
	slug: "hourglass_not_done",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⌚": {
	name: "watch",
	slug: "watch",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⏰": {
	name: "alarm clock",
	slug: "alarm_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⏱️": {
	name: "stopwatch",
	slug: "stopwatch",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"⏲️": {
	name: "timer clock",
	slug: "timer_clock",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🕰️": {
	name: "mantelpiece clock",
	slug: "mantelpiece_clock",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕛": {
	name: "twelve o’clock",
	slug: "twelve_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕧": {
	name: "twelve-thirty",
	slug: "twelve_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕐": {
	name: "one o’clock",
	slug: "one_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕜": {
	name: "one-thirty",
	slug: "one_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕑": {
	name: "two o’clock",
	slug: "two_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕝": {
	name: "two-thirty",
	slug: "two_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕒": {
	name: "three o’clock",
	slug: "three_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕞": {
	name: "three-thirty",
	slug: "three_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕓": {
	name: "four o’clock",
	slug: "four_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕟": {
	name: "four-thirty",
	slug: "four_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕔": {
	name: "five o’clock",
	slug: "five_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕠": {
	name: "five-thirty",
	slug: "five_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕕": {
	name: "six o’clock",
	slug: "six_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕡": {
	name: "six-thirty",
	slug: "six_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕖": {
	name: "seven o’clock",
	slug: "seven_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕢": {
	name: "seven-thirty",
	slug: "seven_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕗": {
	name: "eight o’clock",
	slug: "eight_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕣": {
	name: "eight-thirty",
	slug: "eight_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕘": {
	name: "nine o’clock",
	slug: "nine_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕤": {
	name: "nine-thirty",
	slug: "nine_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕙": {
	name: "ten o’clock",
	slug: "ten_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕥": {
	name: "ten-thirty",
	slug: "ten_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🕚": {
	name: "eleven o’clock",
	slug: "eleven_o_clock",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕦": {
	name: "eleven-thirty",
	slug: "eleven_thirty",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌑": {
	name: "new moon",
	slug: "new_moon",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌒": {
	name: "waxing crescent moon",
	slug: "waxing_crescent_moon",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🌓": {
	name: "first quarter moon",
	slug: "first_quarter_moon",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌔": {
	name: "waxing gibbous moon",
	slug: "waxing_gibbous_moon",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌕": {
	name: "full moon",
	slug: "full_moon",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌖": {
	name: "waning gibbous moon",
	slug: "waning_gibbous_moon",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🌗": {
	name: "last quarter moon",
	slug: "last_quarter_moon",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🌘": {
	name: "waning crescent moon",
	slug: "waning_crescent_moon",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🌙": {
	name: "crescent moon",
	slug: "crescent_moon",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌚": {
	name: "new moon face",
	slug: "new_moon_face",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🌛": {
	name: "first quarter moon face",
	slug: "first_quarter_moon_face",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌜": {
	name: "last quarter moon face",
	slug: "last_quarter_moon_face",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌡️": {
	name: "thermometer",
	slug: "thermometer",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"☀️": {
	name: "sun",
	slug: "sun",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌝": {
	name: "full moon face",
	slug: "full_moon_face",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🌞": {
	name: "sun with face",
	slug: "sun_with_face",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🪐": {
	name: "ringed planet",
	slug: "ringed_planet",
	group: "Travel & Places",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"⭐": {
	name: "star",
	slug: "star",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌟": {
	name: "glowing star",
	slug: "glowing_star",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌠": {
	name: "shooting star",
	slug: "shooting_star",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌌": {
	name: "milky way",
	slug: "milky_way",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"☁️": {
	name: "cloud",
	slug: "cloud",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⛅": {
	name: "sun behind cloud",
	slug: "sun_behind_cloud",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⛈️": {
	name: "cloud with lightning and rain",
	slug: "cloud_with_lightning_and_rain",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌤️": {
	name: "sun behind small cloud",
	slug: "sun_behind_small_cloud",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌥️": {
	name: "sun behind large cloud",
	slug: "sun_behind_large_cloud",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌦️": {
	name: "sun behind rain cloud",
	slug: "sun_behind_rain_cloud",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌧️": {
	name: "cloud with rain",
	slug: "cloud_with_rain",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌨️": {
	name: "cloud with snow",
	slug: "cloud_with_snow",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌩️": {
	name: "cloud with lightning",
	slug: "cloud_with_lightning",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌪️": {
	name: "tornado",
	slug: "tornado",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌫️": {
	name: "fog",
	slug: "fog",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌬️": {
	name: "wind face",
	slug: "wind_face",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🌀": {
	name: "cyclone",
	slug: "cyclone",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌈": {
	name: "rainbow",
	slug: "rainbow",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌂": {
	name: "closed umbrella",
	slug: "closed_umbrella",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"☂️": {
	name: "umbrella",
	slug: "umbrella",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"☔": {
	name: "umbrella with rain drops",
	slug: "umbrella_with_rain_drops",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⛱️": {
	name: "umbrella on ground",
	slug: "umbrella_on_ground",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⚡": {
	name: "high voltage",
	slug: "high_voltage",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"❄️": {
	name: "snowflake",
	slug: "snowflake",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"☃️": {
	name: "snowman",
	slug: "snowman",
	group: "Travel & Places",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⛄": {
	name: "snowman without snow",
	slug: "snowman_without_snow",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"☄️": {
	name: "comet",
	slug: "comet",
	group: "Travel & Places",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔥": {
	name: "fire",
	slug: "fire",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💧": {
	name: "droplet",
	slug: "droplet",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🌊": {
	name: "water wave",
	slug: "water_wave",
	group: "Travel & Places",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎃": {
	name: "jack-o-lantern",
	slug: "jack_o_lantern",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎄": {
	name: "Christmas tree",
	slug: "christmas_tree",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎆": {
	name: "fireworks",
	slug: "fireworks",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎇": {
	name: "sparkler",
	slug: "sparkler",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧨": {
	name: "firecracker",
	slug: "firecracker",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"✨": {
	name: "sparkles",
	slug: "sparkles",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎈": {
	name: "balloon",
	slug: "balloon",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎉": {
	name: "party popper",
	slug: "party_popper",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎊": {
	name: "confetti ball",
	slug: "confetti_ball",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎋": {
	name: "tanabata tree",
	slug: "tanabata_tree",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎍": {
	name: "pine decoration",
	slug: "pine_decoration",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎎": {
	name: "Japanese dolls",
	slug: "japanese_dolls",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎏": {
	name: "carp streamer",
	slug: "carp_streamer",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎐": {
	name: "wind chime",
	slug: "wind_chime",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎑": {
	name: "moon viewing ceremony",
	slug: "moon_viewing_ceremony",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧧": {
	name: "red envelope",
	slug: "red_envelope",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🎀": {
	name: "ribbon",
	slug: "ribbon",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎁": {
	name: "wrapped gift",
	slug: "wrapped_gift",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎗️": {
	name: "reminder ribbon",
	slug: "reminder_ribbon",
	group: "Activities",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🎟️": {
	name: "admission tickets",
	slug: "admission_tickets",
	group: "Activities",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🎫": {
	name: "ticket",
	slug: "ticket",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎖️": {
	name: "military medal",
	slug: "military_medal",
	group: "Activities",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏆": {
	name: "trophy",
	slug: "trophy",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏅": {
	name: "sports medal",
	slug: "sports_medal",
	group: "Activities",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🥇": {
	name: "1st place medal",
	slug: "1st_place_medal",
	group: "Activities",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥈": {
	name: "2nd place medal",
	slug: "2nd_place_medal",
	group: "Activities",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥉": {
	name: "3rd place medal",
	slug: "3rd_place_medal",
	group: "Activities",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"⚽": {
	name: "soccer ball",
	slug: "soccer_ball",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⚾": {
	name: "baseball",
	slug: "baseball",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥎": {
	name: "softball",
	slug: "softball",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🏀": {
	name: "basketball",
	slug: "basketball",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏐": {
	name: "volleyball",
	slug: "volleyball",
	group: "Activities",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🏈": {
	name: "american football",
	slug: "american_football",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏉": {
	name: "rugby football",
	slug: "rugby_football",
	group: "Activities",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🎾": {
	name: "tennis",
	slug: "tennis",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥏": {
	name: "flying disc",
	slug: "flying_disc",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🎳": {
	name: "bowling",
	slug: "bowling",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏏": {
	name: "cricket game",
	slug: "cricket_game",
	group: "Activities",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🏑": {
	name: "field hockey",
	slug: "field_hockey",
	group: "Activities",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🏒": {
	name: "ice hockey",
	slug: "ice_hockey",
	group: "Activities",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🥍": {
	name: "lacrosse",
	slug: "lacrosse",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🏓": {
	name: "ping pong",
	slug: "ping_pong",
	group: "Activities",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🏸": {
	name: "badminton",
	slug: "badminton",
	group: "Activities",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🥊": {
	name: "boxing glove",
	slug: "boxing_glove",
	group: "Activities",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥋": {
	name: "martial arts uniform",
	slug: "martial_arts_uniform",
	group: "Activities",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🥅": {
	name: "goal net",
	slug: "goal_net",
	group: "Activities",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"⛳": {
	name: "flag in hole",
	slug: "flag_in_hole",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⛸️": {
	name: "ice skate",
	slug: "ice_skate",
	group: "Activities",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🎣": {
	name: "fishing pole",
	slug: "fishing_pole",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🤿": {
	name: "diving mask",
	slug: "diving_mask",
	group: "Activities",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🎽": {
	name: "running shirt",
	slug: "running_shirt",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎿": {
	name: "skis",
	slug: "skis",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛷": {
	name: "sled",
	slug: "sled",
	group: "Activities",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🥌": {
	name: "curling stone",
	slug: "curling_stone",
	group: "Activities",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🎯": {
	name: "direct hit",
	slug: "direct_hit",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪀": {
	name: "yo-yo",
	slug: "yo_yo",
	group: "Activities",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🪁": {
	name: "kite",
	slug: "kite",
	group: "Activities",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🎱": {
	name: "pool 8 ball",
	slug: "pool_8_ball",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔮": {
	name: "crystal ball",
	slug: "crystal_ball",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪄": {
	name: "magic wand",
	slug: "magic_wand",
	group: "Activities",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🧿": {
	name: "nazar amulet",
	slug: "nazar_amulet",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🎮": {
	name: "video game",
	slug: "video_game",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕹️": {
	name: "joystick",
	slug: "joystick",
	group: "Activities",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🎰": {
	name: "slot machine",
	slug: "slot_machine",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎲": {
	name: "game die",
	slug: "game_die",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧩": {
	name: "puzzle piece",
	slug: "puzzle_piece",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🧸": {
	name: "teddy bear",
	slug: "teddy_bear",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🪅": {
	name: "piñata",
	slug: "pinata",
	group: "Activities",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🪆": {
	name: "nesting dolls",
	slug: "nesting_dolls",
	group: "Activities",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"♠️": {
	name: "spade suit",
	slug: "spade_suit",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♥️": {
	name: "heart suit",
	slug: "heart_suit",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♦️": {
	name: "diamond suit",
	slug: "diamond_suit",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♣️": {
	name: "club suit",
	slug: "club_suit",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♟️": {
	name: "chess pawn",
	slug: "chess_pawn",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🃏": {
	name: "joker",
	slug: "joker",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🀄": {
	name: "mahjong red dragon",
	slug: "mahjong_red_dragon",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎴": {
	name: "flower playing cards",
	slug: "flower_playing_cards",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎭": {
	name: "performing arts",
	slug: "performing_arts",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🖼️": {
	name: "framed picture",
	slug: "framed_picture",
	group: "Activities",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🎨": {
	name: "artist palette",
	slug: "artist_palette",
	group: "Activities",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧵": {
	name: "thread",
	slug: "thread",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🪡": {
	name: "sewing needle",
	slug: "sewing_needle",
	group: "Activities",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🧶": {
	name: "yarn",
	slug: "yarn",
	group: "Activities",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🪢": {
	name: "knot",
	slug: "knot",
	group: "Activities",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"👓": {
	name: "glasses",
	slug: "glasses",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕶️": {
	name: "sunglasses",
	slug: "sunglasses",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🥽": {
	name: "goggles",
	slug: "goggles",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🥼": {
	name: "lab coat",
	slug: "lab_coat",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🦺": {
	name: "safety vest",
	slug: "safety_vest",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"👔": {
	name: "necktie",
	slug: "necktie",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👕": {
	name: "t-shirt",
	slug: "t_shirt",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👖": {
	name: "jeans",
	slug: "jeans",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧣": {
	name: "scarf",
	slug: "scarf",
	group: "Objects",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🧤": {
	name: "gloves",
	slug: "gloves",
	group: "Objects",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🧥": {
	name: "coat",
	slug: "coat",
	group: "Objects",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🧦": {
	name: "socks",
	slug: "socks",
	group: "Objects",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"👗": {
	name: "dress",
	slug: "dress",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👘": {
	name: "kimono",
	slug: "kimono",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥻": {
	name: "sari",
	slug: "sari",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🩱": {
	name: "one-piece swimsuit",
	slug: "one_piece_swimsuit",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🩲": {
	name: "briefs",
	slug: "briefs",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🩳": {
	name: "shorts",
	slug: "shorts",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"👙": {
	name: "bikini",
	slug: "bikini",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👚": {
	name: "woman’s clothes",
	slug: "woman_s_clothes",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👛": {
	name: "purse",
	slug: "purse",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👜": {
	name: "handbag",
	slug: "handbag",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👝": {
	name: "clutch bag",
	slug: "clutch_bag",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛍️": {
	name: "shopping bags",
	slug: "shopping_bags",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🎒": {
	name: "backpack",
	slug: "backpack",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🩴": {
	name: "thong sandal",
	slug: "thong_sandal",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"👞": {
	name: "man’s shoe",
	slug: "man_s_shoe",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👟": {
	name: "running shoe",
	slug: "running_shoe",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🥾": {
	name: "hiking boot",
	slug: "hiking_boot",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🥿": {
	name: "flat shoe",
	slug: "flat_shoe",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"👠": {
	name: "high-heeled shoe",
	slug: "high_heeled_shoe",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👡": {
	name: "woman’s sandal",
	slug: "woman_s_sandal",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🩰": {
	name: "ballet shoes",
	slug: "ballet_shoes",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"👢": {
	name: "woman’s boot",
	slug: "woman_s_boot",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👑": {
	name: "crown",
	slug: "crown",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"👒": {
	name: "woman’s hat",
	slug: "woman_s_hat",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎩": {
	name: "top hat",
	slug: "top_hat",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎓": {
	name: "graduation cap",
	slug: "graduation_cap",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧢": {
	name: "billed cap",
	slug: "billed_cap",
	group: "Objects",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🪖": {
	name: "military helmet",
	slug: "military_helmet",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"⛑️": {
	name: "rescue worker’s helmet",
	slug: "rescue_worker_s_helmet",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"📿": {
	name: "prayer beads",
	slug: "prayer_beads",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"💄": {
	name: "lipstick",
	slug: "lipstick",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💍": {
	name: "ring",
	slug: "ring",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💎": {
	name: "gem stone",
	slug: "gem_stone",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔇": {
	name: "muted speaker",
	slug: "muted_speaker",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔈": {
	name: "speaker low volume",
	slug: "speaker_low_volume",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🔉": {
	name: "speaker medium volume",
	slug: "speaker_medium_volume",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔊": {
	name: "speaker high volume",
	slug: "speaker_high_volume",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📢": {
	name: "loudspeaker",
	slug: "loudspeaker",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📣": {
	name: "megaphone",
	slug: "megaphone",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📯": {
	name: "postal horn",
	slug: "postal_horn",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔔": {
	name: "bell",
	slug: "bell",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔕": {
	name: "bell with slash",
	slug: "bell_with_slash",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🎼": {
	name: "musical score",
	slug: "musical_score",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎵": {
	name: "musical note",
	slug: "musical_note",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎶": {
	name: "musical notes",
	slug: "musical_notes",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎙️": {
	name: "studio microphone",
	slug: "studio_microphone",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🎚️": {
	name: "level slider",
	slug: "level_slider",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🎛️": {
	name: "control knobs",
	slug: "control_knobs",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🎤": {
	name: "microphone",
	slug: "microphone",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎧": {
	name: "headphone",
	slug: "headphone",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📻": {
	name: "radio",
	slug: "radio",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎷": {
	name: "saxophone",
	slug: "saxophone",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪗": {
	name: "accordion",
	slug: "accordion",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🎸": {
	name: "guitar",
	slug: "guitar",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎹": {
	name: "musical keyboard",
	slug: "musical_keyboard",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎺": {
	name: "trumpet",
	slug: "trumpet",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎻": {
	name: "violin",
	slug: "violin",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪕": {
	name: "banjo",
	slug: "banjo",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🥁": {
	name: "drum",
	slug: "drum",
	group: "Objects",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🪘": {
	name: "long drum",
	slug: "long_drum",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"📱": {
	name: "mobile phone",
	slug: "mobile_phone",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📲": {
	name: "mobile phone with arrow",
	slug: "mobile_phone_with_arrow",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"☎️": {
	name: "telephone",
	slug: "telephone",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📞": {
	name: "telephone receiver",
	slug: "telephone_receiver",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📟": {
	name: "pager",
	slug: "pager",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📠": {
	name: "fax machine",
	slug: "fax_machine",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔋": {
	name: "battery",
	slug: "battery",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔌": {
	name: "electric plug",
	slug: "electric_plug",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💻": {
	name: "laptop",
	slug: "laptop",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🖥️": {
	name: "desktop computer",
	slug: "desktop_computer",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🖨️": {
	name: "printer",
	slug: "printer",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⌨️": {
	name: "keyboard",
	slug: "keyboard",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🖱️": {
	name: "computer mouse",
	slug: "computer_mouse",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🖲️": {
	name: "trackball",
	slug: "trackball",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"💽": {
	name: "computer disk",
	slug: "computer_disk",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💾": {
	name: "floppy disk",
	slug: "floppy_disk",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💿": {
	name: "optical disk",
	slug: "optical_disk",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📀": {
	name: "dvd",
	slug: "dvd",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧮": {
	name: "abacus",
	slug: "abacus",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🎥": {
	name: "movie camera",
	slug: "movie_camera",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎞️": {
	name: "film frames",
	slug: "film_frames",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"📽️": {
	name: "film projector",
	slug: "film_projector",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🎬": {
	name: "clapper board",
	slug: "clapper_board",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📺": {
	name: "television",
	slug: "television",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📷": {
	name: "camera",
	slug: "camera",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📸": {
	name: "camera with flash",
	slug: "camera_with_flash",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"📹": {
	name: "video camera",
	slug: "video_camera",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📼": {
	name: "videocassette",
	slug: "videocassette",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔍": {
	name: "magnifying glass tilted left",
	slug: "magnifying_glass_tilted_left",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔎": {
	name: "magnifying glass tilted right",
	slug: "magnifying_glass_tilted_right",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🕯️": {
	name: "candle",
	slug: "candle",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"💡": {
	name: "light bulb",
	slug: "light_bulb",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔦": {
	name: "flashlight",
	slug: "flashlight",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏮": {
	name: "red paper lantern",
	slug: "red_paper_lantern",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪔": {
	name: "diya lamp",
	slug: "diya_lamp",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"📔": {
	name: "notebook with decorative cover",
	slug: "notebook_with_decorative_cover",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📕": {
	name: "closed book",
	slug: "closed_book",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📖": {
	name: "open book",
	slug: "open_book",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📗": {
	name: "green book",
	slug: "green_book",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📘": {
	name: "blue book",
	slug: "blue_book",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📙": {
	name: "orange book",
	slug: "orange_book",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📚": {
	name: "books",
	slug: "books",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📓": {
	name: "notebook",
	slug: "notebook",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📒": {
	name: "ledger",
	slug: "ledger",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📃": {
	name: "page with curl",
	slug: "page_with_curl",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📜": {
	name: "scroll",
	slug: "scroll",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📄": {
	name: "page facing up",
	slug: "page_facing_up",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📰": {
	name: "newspaper",
	slug: "newspaper",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🗞️": {
	name: "rolled-up newspaper",
	slug: "rolled_up_newspaper",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"📑": {
	name: "bookmark tabs",
	slug: "bookmark_tabs",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔖": {
	name: "bookmark",
	slug: "bookmark",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏷️": {
	name: "label",
	slug: "label",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"💰": {
	name: "money bag",
	slug: "money_bag",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪙": {
	name: "coin",
	slug: "coin",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"💴": {
	name: "yen banknote",
	slug: "yen_banknote",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💵": {
	name: "dollar banknote",
	slug: "dollar_banknote",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💶": {
	name: "euro banknote",
	slug: "euro_banknote",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"💷": {
	name: "pound banknote",
	slug: "pound_banknote",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"💸": {
	name: "money with wings",
	slug: "money_with_wings",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💳": {
	name: "credit card",
	slug: "credit_card",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🧾": {
	name: "receipt",
	slug: "receipt",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"💹": {
	name: "chart increasing with yen",
	slug: "chart_increasing_with_yen",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"✉️": {
	name: "envelope",
	slug: "envelope",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📧": {
	name: "e-mail",
	slug: "e_mail",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📨": {
	name: "incoming envelope",
	slug: "incoming_envelope",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📩": {
	name: "envelope with arrow",
	slug: "envelope_with_arrow",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📤": {
	name: "outbox tray",
	slug: "outbox_tray",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📥": {
	name: "inbox tray",
	slug: "inbox_tray",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📦": {
	name: "package",
	slug: "package",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📫": {
	name: "closed mailbox with raised flag",
	slug: "closed_mailbox_with_raised_flag",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📪": {
	name: "closed mailbox with lowered flag",
	slug: "closed_mailbox_with_lowered_flag",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📬": {
	name: "open mailbox with raised flag",
	slug: "open_mailbox_with_raised_flag",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"📭": {
	name: "open mailbox with lowered flag",
	slug: "open_mailbox_with_lowered_flag",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"📮": {
	name: "postbox",
	slug: "postbox",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🗳️": {
	name: "ballot box with ballot",
	slug: "ballot_box_with_ballot",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"✏️": {
	name: "pencil",
	slug: "pencil",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"✒️": {
	name: "black nib",
	slug: "black_nib",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🖋️": {
	name: "fountain pen",
	slug: "fountain_pen",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🖊️": {
	name: "pen",
	slug: "pen",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🖌️": {
	name: "paintbrush",
	slug: "paintbrush",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🖍️": {
	name: "crayon",
	slug: "crayon",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"📝": {
	name: "memo",
	slug: "memo",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💼": {
	name: "briefcase",
	slug: "briefcase",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📁": {
	name: "file folder",
	slug: "file_folder",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📂": {
	name: "open file folder",
	slug: "open_file_folder",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🗂️": {
	name: "card index dividers",
	slug: "card_index_dividers",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"📅": {
	name: "calendar",
	slug: "calendar",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📆": {
	name: "tear-off calendar",
	slug: "tear_off_calendar",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🗒️": {
	name: "spiral notepad",
	slug: "spiral_notepad",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🗓️": {
	name: "spiral calendar",
	slug: "spiral_calendar",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"📇": {
	name: "card index",
	slug: "card_index",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📈": {
	name: "chart increasing",
	slug: "chart_increasing",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📉": {
	name: "chart decreasing",
	slug: "chart_decreasing",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📊": {
	name: "bar chart",
	slug: "bar_chart",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📋": {
	name: "clipboard",
	slug: "clipboard",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📌": {
	name: "pushpin",
	slug: "pushpin",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📍": {
	name: "round pushpin",
	slug: "round_pushpin",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📎": {
	name: "paperclip",
	slug: "paperclip",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🖇️": {
	name: "linked paperclips",
	slug: "linked_paperclips",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"📏": {
	name: "straight ruler",
	slug: "straight_ruler",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📐": {
	name: "triangular ruler",
	slug: "triangular_ruler",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"✂️": {
	name: "scissors",
	slug: "scissors",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🗃️": {
	name: "card file box",
	slug: "card_file_box",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🗄️": {
	name: "file cabinet",
	slug: "file_cabinet",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🗑️": {
	name: "wastebasket",
	slug: "wastebasket",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🔒": {
	name: "locked",
	slug: "locked",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔓": {
	name: "unlocked",
	slug: "unlocked",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔏": {
	name: "locked with pen",
	slug: "locked_with_pen",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔐": {
	name: "locked with key",
	slug: "locked_with_key",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔑": {
	name: "key",
	slug: "key",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🗝️": {
	name: "old key",
	slug: "old_key",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🔨": {
	name: "hammer",
	slug: "hammer",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪓": {
	name: "axe",
	slug: "axe",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"⛏️": {
	name: "pick",
	slug: "pick",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⚒️": {
	name: "hammer and pick",
	slug: "hammer_and_pick",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🛠️": {
	name: "hammer and wrench",
	slug: "hammer_and_wrench",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🗡️": {
	name: "dagger",
	slug: "dagger",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⚔️": {
	name: "crossed swords",
	slug: "crossed_swords",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔫": {
	name: "water pistol",
	slug: "water_pistol",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪃": {
	name: "boomerang",
	slug: "boomerang",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🏹": {
	name: "bow and arrow",
	slug: "bow_and_arrow",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🛡️": {
	name: "shield",
	slug: "shield",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🪚": {
	name: "carpentry saw",
	slug: "carpentry_saw",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🔧": {
	name: "wrench",
	slug: "wrench",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪛": {
	name: "screwdriver",
	slug: "screwdriver",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🔩": {
	name: "nut and bolt",
	slug: "nut_and_bolt",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⚙️": {
	name: "gear",
	slug: "gear",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🗜️": {
	name: "clamp",
	slug: "clamp",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⚖️": {
	name: "balance scale",
	slug: "balance_scale",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🦯": {
	name: "white cane",
	slug: "white_cane",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🔗": {
	name: "link",
	slug: "link",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⛓️": {
	name: "chains",
	slug: "chains",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🪝": {
	name: "hook",
	slug: "hook",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🧰": {
	name: "toolbox",
	slug: "toolbox",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🧲": {
	name: "magnet",
	slug: "magnet",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🪜": {
	name: "ladder",
	slug: "ladder",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"⚗️": {
	name: "alembic",
	slug: "alembic",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🧪": {
	name: "test tube",
	slug: "test_tube",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🧫": {
	name: "petri dish",
	slug: "petri_dish",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🧬": {
	name: "dna",
	slug: "dna",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🔬": {
	name: "microscope",
	slug: "microscope",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔭": {
	name: "telescope",
	slug: "telescope",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"📡": {
	name: "satellite antenna",
	slug: "satellite_antenna",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💉": {
	name: "syringe",
	slug: "syringe",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🩸": {
	name: "drop of blood",
	slug: "drop_of_blood",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"💊": {
	name: "pill",
	slug: "pill",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🩹": {
	name: "adhesive bandage",
	slug: "adhesive_bandage",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🩺": {
	name: "stethoscope",
	slug: "stethoscope",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🚪": {
	name: "door",
	slug: "door",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛗": {
	name: "elevator",
	slug: "elevator",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🪞": {
	name: "mirror",
	slug: "mirror",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🪟": {
	name: "window",
	slug: "window",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🛏️": {
	name: "bed",
	slug: "bed",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🛋️": {
	name: "couch and lamp",
	slug: "couch_and_lamp",
	group: "Objects",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🪑": {
	name: "chair",
	slug: "chair",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🚽": {
	name: "toilet",
	slug: "toilet",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪠": {
	name: "plunger",
	slug: "plunger",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🚿": {
	name: "shower",
	slug: "shower",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🛁": {
	name: "bathtub",
	slug: "bathtub",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🪤": {
	name: "mouse trap",
	slug: "mouse_trap",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🪒": {
	name: "razor",
	slug: "razor",
	group: "Objects",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🧴": {
	name: "lotion bottle",
	slug: "lotion_bottle",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🧷": {
	name: "safety pin",
	slug: "safety_pin",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🧹": {
	name: "broom",
	slug: "broom",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🧺": {
	name: "basket",
	slug: "basket",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🧻": {
	name: "roll of paper",
	slug: "roll_of_paper",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🪣": {
	name: "bucket",
	slug: "bucket",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🧼": {
	name: "soap",
	slug: "soap",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🪥": {
	name: "toothbrush",
	slug: "toothbrush",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🧽": {
	name: "sponge",
	slug: "sponge",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🧯": {
	name: "fire extinguisher",
	slug: "fire_extinguisher",
	group: "Objects",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🛒": {
	name: "shopping cart",
	slug: "shopping_cart",
	group: "Objects",
	emoji_version: "3.0",
	unicode_version: "3.0",
	skin_tone_support: false
},
	"🚬": {
	name: "cigarette",
	slug: "cigarette",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⚰️": {
	name: "coffin",
	slug: "coffin",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🪦": {
	name: "headstone",
	slug: "headstone",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"⚱️": {
	name: "funeral urn",
	slug: "funeral_urn",
	group: "Objects",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🗿": {
	name: "moai",
	slug: "moai",
	group: "Objects",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🪧": {
	name: "placard",
	slug: "placard",
	group: "Objects",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🏧": {
	name: "ATM sign",
	slug: "atm_sign",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚮": {
	name: "litter in bin sign",
	slug: "litter_in_bin_sign",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚰": {
	name: "potable water",
	slug: "potable_water",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"♿": {
	name: "wheelchair symbol",
	slug: "wheelchair_symbol",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚹": {
	name: "men’s room",
	slug: "men_s_room",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚺": {
	name: "women’s room",
	slug: "women_s_room",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚻": {
	name: "restroom",
	slug: "restroom",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚼": {
	name: "baby symbol",
	slug: "baby_symbol",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚾": {
	name: "water closet",
	slug: "water_closet",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛂": {
	name: "passport control",
	slug: "passport_control",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🛃": {
	name: "customs",
	slug: "customs",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🛄": {
	name: "baggage claim",
	slug: "baggage_claim",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🛅": {
	name: "left luggage",
	slug: "left_luggage",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"⚠️": {
	name: "warning",
	slug: "warning",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚸": {
	name: "children crossing",
	slug: "children_crossing",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"⛔": {
	name: "no entry",
	slug: "no_entry",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚫": {
	name: "prohibited",
	slug: "prohibited",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚳": {
	name: "no bicycles",
	slug: "no_bicycles",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚭": {
	name: "no smoking",
	slug: "no_smoking",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚯": {
	name: "no littering",
	slug: "no_littering",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚱": {
	name: "non-potable water",
	slug: "non_potable_water",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🚷": {
	name: "no pedestrians",
	slug: "no_pedestrians",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"📵": {
	name: "no mobile phones",
	slug: "no_mobile_phones",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔞": {
	name: "no one under eighteen",
	slug: "no_one_under_eighteen",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"☢️": {
	name: "radioactive",
	slug: "radioactive",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"☣️": {
	name: "biohazard",
	slug: "biohazard",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"⬆️": {
	name: "up arrow",
	slug: "up_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"↗️": {
	name: "up-right arrow",
	slug: "up_right_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"➡️": {
	name: "right arrow",
	slug: "right_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"↘️": {
	name: "down-right arrow",
	slug: "down_right_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⬇️": {
	name: "down arrow",
	slug: "down_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"↙️": {
	name: "down-left arrow",
	slug: "down_left_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⬅️": {
	name: "left arrow",
	slug: "left_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"↖️": {
	name: "up-left arrow",
	slug: "up_left_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"↕️": {
	name: "up-down arrow",
	slug: "up_down_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"↔️": {
	name: "left-right arrow",
	slug: "left_right_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"↩️": {
	name: "right arrow curving left",
	slug: "right_arrow_curving_left",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"↪️": {
	name: "left arrow curving right",
	slug: "left_arrow_curving_right",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⤴️": {
	name: "right arrow curving up",
	slug: "right_arrow_curving_up",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⤵️": {
	name: "right arrow curving down",
	slug: "right_arrow_curving_down",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔃": {
	name: "clockwise vertical arrows",
	slug: "clockwise_vertical_arrows",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔄": {
	name: "counterclockwise arrows button",
	slug: "counterclockwise_arrows_button",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔙": {
	name: "BACK arrow",
	slug: "back_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔚": {
	name: "END arrow",
	slug: "end_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔛": {
	name: "ON! arrow",
	slug: "on_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔜": {
	name: "SOON arrow",
	slug: "soon_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔝": {
	name: "TOP arrow",
	slug: "top_arrow",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🛐": {
	name: "place of worship",
	slug: "place_of_worship",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"⚛️": {
	name: "atom symbol",
	slug: "atom_symbol",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🕉️": {
	name: "om",
	slug: "om",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"✡️": {
	name: "star of David",
	slug: "star_of_david",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"☸️": {
	name: "wheel of dharma",
	slug: "wheel_of_dharma",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"☯️": {
	name: "yin yang",
	slug: "yin_yang",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"✝️": {
	name: "latin cross",
	slug: "latin_cross",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"☦️": {
	name: "orthodox cross",
	slug: "orthodox_cross",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"☪️": {
	name: "star and crescent",
	slug: "star_and_crescent",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"☮️": {
	name: "peace symbol",
	slug: "peace_symbol",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🕎": {
	name: "menorah",
	slug: "menorah",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔯": {
	name: "dotted six-pointed star",
	slug: "dotted_six_pointed_star",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♈": {
	name: "Aries",
	slug: "aries",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♉": {
	name: "Taurus",
	slug: "taurus",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♊": {
	name: "Gemini",
	slug: "gemini",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♋": {
	name: "Cancer",
	slug: "cancer",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♌": {
	name: "Leo",
	slug: "leo",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♍": {
	name: "Virgo",
	slug: "virgo",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♎": {
	name: "Libra",
	slug: "libra",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♏": {
	name: "Scorpio",
	slug: "scorpio",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♐": {
	name: "Sagittarius",
	slug: "sagittarius",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♑": {
	name: "Capricorn",
	slug: "capricorn",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♒": {
	name: "Aquarius",
	slug: "aquarius",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♓": {
	name: "Pisces",
	slug: "pisces",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⛎": {
	name: "Ophiuchus",
	slug: "ophiuchus",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔀": {
	name: "shuffle tracks button",
	slug: "shuffle_tracks_button",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔁": {
	name: "repeat button",
	slug: "repeat_button",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔂": {
	name: "repeat single button",
	slug: "repeat_single_button",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"▶️": {
	name: "play button",
	slug: "play_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⏩": {
	name: "fast-forward button",
	slug: "fast_forward_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⏭️": {
	name: "next track button",
	slug: "next_track_button",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⏯️": {
	name: "play or pause button",
	slug: "play_or_pause_button",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"◀️": {
	name: "reverse button",
	slug: "reverse_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⏪": {
	name: "fast reverse button",
	slug: "fast_reverse_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⏮️": {
	name: "last track button",
	slug: "last_track_button",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🔼": {
	name: "upwards button",
	slug: "upwards_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⏫": {
	name: "fast up button",
	slug: "fast_up_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔽": {
	name: "downwards button",
	slug: "downwards_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⏬": {
	name: "fast down button",
	slug: "fast_down_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⏸️": {
	name: "pause button",
	slug: "pause_button",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⏹️": {
	name: "stop button",
	slug: "stop_button",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⏺️": {
	name: "record button",
	slug: "record_button",
	group: "Symbols",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"⏏️": {
	name: "eject button",
	slug: "eject_button",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🎦": {
	name: "cinema",
	slug: "cinema",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔅": {
	name: "dim button",
	slug: "dim_button",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔆": {
	name: "bright button",
	slug: "bright_button",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"📶": {
	name: "antenna bars",
	slug: "antenna_bars",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📳": {
	name: "vibration mode",
	slug: "vibration_mode",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📴": {
	name: "mobile phone off",
	slug: "mobile_phone_off",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♀️": {
	name: "female sign",
	slug: "female_sign",
	group: "Symbols",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"♂️": {
	name: "male sign",
	slug: "male_sign",
	group: "Symbols",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"⚧️": {
	name: "transgender symbol",
	slug: "transgender_symbol",
	group: "Symbols",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"✖️": {
	name: "multiply",
	slug: "multiply",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"➕": {
	name: "plus",
	slug: "plus",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"➖": {
	name: "minus",
	slug: "minus",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"➗": {
	name: "divide",
	slug: "divide",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"♾️": {
	name: "infinity",
	slug: "infinity",
	group: "Symbols",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"‼️": {
	name: "double exclamation mark",
	slug: "double_exclamation_mark",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⁉️": {
	name: "exclamation question mark",
	slug: "exclamation_question_mark",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"❓": {
	name: "red question mark",
	slug: "red_question_mark",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"❔": {
	name: "white question mark",
	slug: "white_question_mark",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"❕": {
	name: "white exclamation mark",
	slug: "white_exclamation_mark",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"❗": {
	name: "red exclamation mark",
	slug: "red_exclamation_mark",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"〰️": {
	name: "wavy dash",
	slug: "wavy_dash",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💱": {
	name: "currency exchange",
	slug: "currency_exchange",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💲": {
	name: "heavy dollar sign",
	slug: "heavy_dollar_sign",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⚕️": {
	name: "medical symbol",
	slug: "medical_symbol",
	group: "Symbols",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"♻️": {
	name: "recycling symbol",
	slug: "recycling_symbol",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⚜️": {
	name: "fleur-de-lis",
	slug: "fleur_de_lis",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🔱": {
	name: "trident emblem",
	slug: "trident_emblem",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"📛": {
	name: "name badge",
	slug: "name_badge",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔰": {
	name: "Japanese symbol for beginner",
	slug: "japanese_symbol_for_beginner",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⭕": {
	name: "hollow red circle",
	slug: "hollow_red_circle",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"✅": {
	name: "check mark button",
	slug: "check_mark_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"☑️": {
	name: "check box with check",
	slug: "check_box_with_check",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"✔️": {
	name: "check mark",
	slug: "check_mark",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"❌": {
	name: "cross mark",
	slug: "cross_mark",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"❎": {
	name: "cross mark button",
	slug: "cross_mark_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"➰": {
	name: "curly loop",
	slug: "curly_loop",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"➿": {
	name: "double curly loop",
	slug: "double_curly_loop",
	group: "Symbols",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"〽️": {
	name: "part alternation mark",
	slug: "part_alternation_mark",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"✳️": {
	name: "eight-spoked asterisk",
	slug: "eight_spoked_asterisk",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"✴️": {
	name: "eight-pointed star",
	slug: "eight_pointed_star",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"❇️": {
	name: "sparkle",
	slug: "sparkle",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"©️": {
	name: "copyright",
	slug: "copyright",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"®️": {
	name: "registered",
	slug: "registered",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"™️": {
	name: "trade mark",
	slug: "trade_mark",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"#️⃣": {
	name: "keycap #",
	slug: "keycap_",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"*️⃣": {
	name: "keycap *",
	slug: "keycap_",
	group: "Symbols",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"0️⃣": {
	name: "keycap 0",
	slug: "keycap_0",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"1️⃣": {
	name: "keycap 1",
	slug: "keycap_1",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"2️⃣": {
	name: "keycap 2",
	slug: "keycap_2",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"3️⃣": {
	name: "keycap 3",
	slug: "keycap_3",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"4️⃣": {
	name: "keycap 4",
	slug: "keycap_4",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"5️⃣": {
	name: "keycap 5",
	slug: "keycap_5",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"6️⃣": {
	name: "keycap 6",
	slug: "keycap_6",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"7️⃣": {
	name: "keycap 7",
	slug: "keycap_7",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"8️⃣": {
	name: "keycap 8",
	slug: "keycap_8",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"9️⃣": {
	name: "keycap 9",
	slug: "keycap_9",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔟": {
	name: "keycap 10",
	slug: "keycap_10",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔠": {
	name: "input latin uppercase",
	slug: "input_latin_uppercase",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔡": {
	name: "input latin lowercase",
	slug: "input_latin_lowercase",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔢": {
	name: "input numbers",
	slug: "input_numbers",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔣": {
	name: "input symbols",
	slug: "input_symbols",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔤": {
	name: "input latin letters",
	slug: "input_latin_letters",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🅰️": {
	name: "A button (blood type)",
	slug: "a_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆎": {
	name: "AB button (blood type)",
	slug: "ab_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🅱️": {
	name: "B button (blood type)",
	slug: "b_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆑": {
	name: "CL button",
	slug: "cl_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆒": {
	name: "COOL button",
	slug: "cool_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆓": {
	name: "FREE button",
	slug: "free_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"ℹ️": {
	name: "information",
	slug: "information",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆔": {
	name: "ID button",
	slug: "id_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"Ⓜ️": {
	name: "circled M",
	slug: "circled_m",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆕": {
	name: "NEW button",
	slug: "new_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆖": {
	name: "NG button",
	slug: "ng_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🅾️": {
	name: "O button (blood type)",
	slug: "o_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆗": {
	name: "OK button",
	slug: "ok_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🅿️": {
	name: "P button",
	slug: "p_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆘": {
	name: "SOS button",
	slug: "sos_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆙": {
	name: "UP! button",
	slug: "up_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🆚": {
	name: "VS button",
	slug: "vs_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈁": {
	name: "Japanese “here” button",
	slug: "japanese_here_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈂️": {
	name: "Japanese “service charge” button",
	slug: "japanese_service_charge_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈷️": {
	name: "Japanese “monthly amount” button",
	slug: "japanese_monthly_amount_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈶": {
	name: "Japanese “not free of charge” button",
	slug: "japanese_not_free_of_charge_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈯": {
	name: "Japanese “reserved” button",
	slug: "japanese_reserved_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🉐": {
	name: "Japanese “bargain” button",
	slug: "japanese_bargain_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈹": {
	name: "Japanese “discount” button",
	slug: "japanese_discount_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈚": {
	name: "Japanese “free of charge” button",
	slug: "japanese_free_of_charge_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈲": {
	name: "Japanese “prohibited” button",
	slug: "japanese_prohibited_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🉑": {
	name: "Japanese “acceptable” button",
	slug: "japanese_acceptable_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈸": {
	name: "Japanese “application” button",
	slug: "japanese_application_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈴": {
	name: "Japanese “passing grade” button",
	slug: "japanese_passing_grade_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈳": {
	name: "Japanese “vacancy” button",
	slug: "japanese_vacancy_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"㊗️": {
	name: "Japanese “congratulations” button",
	slug: "japanese_congratulations_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"㊙️": {
	name: "Japanese “secret” button",
	slug: "japanese_secret_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈺": {
	name: "Japanese “open for business” button",
	slug: "japanese_open_for_business_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🈵": {
	name: "Japanese “no vacancy” button",
	slug: "japanese_no_vacancy_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔴": {
	name: "red circle",
	slug: "red_circle",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🟠": {
	name: "orange circle",
	slug: "orange_circle",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🟡": {
	name: "yellow circle",
	slug: "yellow_circle",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🟢": {
	name: "green circle",
	slug: "green_circle",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🔵": {
	name: "blue circle",
	slug: "blue_circle",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🟣": {
	name: "purple circle",
	slug: "purple_circle",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🟤": {
	name: "brown circle",
	slug: "brown_circle",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"⚫": {
	name: "black circle",
	slug: "black_circle",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⚪": {
	name: "white circle",
	slug: "white_circle",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🟥": {
	name: "red square",
	slug: "red_square",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🟧": {
	name: "orange square",
	slug: "orange_square",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🟨": {
	name: "yellow square",
	slug: "yellow_square",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🟩": {
	name: "green square",
	slug: "green_square",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🟦": {
	name: "blue square",
	slug: "blue_square",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🟪": {
	name: "purple square",
	slug: "purple_square",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"🟫": {
	name: "brown square",
	slug: "brown_square",
	group: "Symbols",
	emoji_version: "12.0",
	unicode_version: "12.0",
	skin_tone_support: false
},
	"⬛": {
	name: "black large square",
	slug: "black_large_square",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"⬜": {
	name: "white large square",
	slug: "white_large_square",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"◼️": {
	name: "black medium square",
	slug: "black_medium_square",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"◻️": {
	name: "white medium square",
	slug: "white_medium_square",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"◾": {
	name: "black medium-small square",
	slug: "black_medium_small_square",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"◽": {
	name: "white medium-small square",
	slug: "white_medium_small_square",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"▪️": {
	name: "black small square",
	slug: "black_small_square",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"▫️": {
	name: "white small square",
	slug: "white_small_square",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔶": {
	name: "large orange diamond",
	slug: "large_orange_diamond",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔷": {
	name: "large blue diamond",
	slug: "large_blue_diamond",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔸": {
	name: "small orange diamond",
	slug: "small_orange_diamond",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔹": {
	name: "small blue diamond",
	slug: "small_blue_diamond",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔺": {
	name: "red triangle pointed up",
	slug: "red_triangle_pointed_up",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔻": {
	name: "red triangle pointed down",
	slug: "red_triangle_pointed_down",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"💠": {
	name: "diamond with a dot",
	slug: "diamond_with_a_dot",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔘": {
	name: "radio button",
	slug: "radio_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔳": {
	name: "white square button",
	slug: "white_square_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🔲": {
	name: "black square button",
	slug: "black_square_button",
	group: "Symbols",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏁": {
	name: "chequered flag",
	slug: "chequered_flag",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🚩": {
	name: "triangular flag",
	slug: "triangular_flag",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🎌": {
	name: "crossed flags",
	slug: "crossed_flags",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🏴": {
	name: "black flag",
	slug: "black_flag",
	group: "Flags",
	emoji_version: "1.0",
	unicode_version: "1.0",
	skin_tone_support: false
},
	"🏳️": {
	name: "white flag",
	slug: "white_flag",
	group: "Flags",
	emoji_version: "0.7",
	unicode_version: "0.7",
	skin_tone_support: false
},
	"🏳️‍🌈": {
	name: "rainbow flag",
	slug: "rainbow_flag",
	group: "Flags",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"🏳️‍⚧️": {
	name: "transgender flag",
	slug: "transgender_flag",
	group: "Flags",
	emoji_version: "13.0",
	unicode_version: "13.0",
	skin_tone_support: false
},
	"🏴‍☠️": {
	name: "pirate flag",
	slug: "pirate_flag",
	group: "Flags",
	emoji_version: "11.0",
	unicode_version: "11.0",
	skin_tone_support: false
},
	"🇦🇨": {
	name: "flag Ascension Island",
	slug: "flag_ascension_island",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇩": {
	name: "flag Andorra",
	slug: "flag_andorra",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇪": {
	name: "flag United Arab Emirates",
	slug: "flag_united_arab_emirates",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇫": {
	name: "flag Afghanistan",
	slug: "flag_afghanistan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇬": {
	name: "flag Antigua & Barbuda",
	slug: "flag_antigua_barbuda",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇮": {
	name: "flag Anguilla",
	slug: "flag_anguilla",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇱": {
	name: "flag Albania",
	slug: "flag_albania",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇲": {
	name: "flag Armenia",
	slug: "flag_armenia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇴": {
	name: "flag Angola",
	slug: "flag_angola",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇶": {
	name: "flag Antarctica",
	slug: "flag_antarctica",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇷": {
	name: "flag Argentina",
	slug: "flag_argentina",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇸": {
	name: "flag American Samoa",
	slug: "flag_american_samoa",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇹": {
	name: "flag Austria",
	slug: "flag_austria",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇺": {
	name: "flag Australia",
	slug: "flag_australia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇼": {
	name: "flag Aruba",
	slug: "flag_aruba",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇽": {
	name: "flag Åland Islands",
	slug: "flag_aland_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇦🇿": {
	name: "flag Azerbaijan",
	slug: "flag_azerbaijan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇦": {
	name: "flag Bosnia & Herzegovina",
	slug: "flag_bosnia_herzegovina",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇧": {
	name: "flag Barbados",
	slug: "flag_barbados",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇩": {
	name: "flag Bangladesh",
	slug: "flag_bangladesh",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇪": {
	name: "flag Belgium",
	slug: "flag_belgium",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇫": {
	name: "flag Burkina Faso",
	slug: "flag_burkina_faso",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇬": {
	name: "flag Bulgaria",
	slug: "flag_bulgaria",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇭": {
	name: "flag Bahrain",
	slug: "flag_bahrain",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇮": {
	name: "flag Burundi",
	slug: "flag_burundi",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇯": {
	name: "flag Benin",
	slug: "flag_benin",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇱": {
	name: "flag St. Barthélemy",
	slug: "flag_st_barthelemy",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇲": {
	name: "flag Bermuda",
	slug: "flag_bermuda",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇳": {
	name: "flag Brunei",
	slug: "flag_brunei",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇴": {
	name: "flag Bolivia",
	slug: "flag_bolivia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇶": {
	name: "flag Caribbean Netherlands",
	slug: "flag_caribbean_netherlands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇷": {
	name: "flag Brazil",
	slug: "flag_brazil",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇸": {
	name: "flag Bahamas",
	slug: "flag_bahamas",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇹": {
	name: "flag Bhutan",
	slug: "flag_bhutan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇻": {
	name: "flag Bouvet Island",
	slug: "flag_bouvet_island",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇼": {
	name: "flag Botswana",
	slug: "flag_botswana",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇾": {
	name: "flag Belarus",
	slug: "flag_belarus",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇧🇿": {
	name: "flag Belize",
	slug: "flag_belize",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇦": {
	name: "flag Canada",
	slug: "flag_canada",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇨": {
	name: "flag Cocos (Keeling) Islands",
	slug: "flag_cocos_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇩": {
	name: "flag Congo - Kinshasa",
	slug: "flag_congo_kinshasa",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇫": {
	name: "flag Central African Republic",
	slug: "flag_central_african_republic",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇬": {
	name: "flag Congo - Brazzaville",
	slug: "flag_congo_brazzaville",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇭": {
	name: "flag Switzerland",
	slug: "flag_switzerland",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇮": {
	name: "flag Côte d’Ivoire",
	slug: "flag_cote_d_ivoire",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇰": {
	name: "flag Cook Islands",
	slug: "flag_cook_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇱": {
	name: "flag Chile",
	slug: "flag_chile",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇲": {
	name: "flag Cameroon",
	slug: "flag_cameroon",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇳": {
	name: "flag China",
	slug: "flag_china",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🇨🇴": {
	name: "flag Colombia",
	slug: "flag_colombia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇵": {
	name: "flag Clipperton Island",
	slug: "flag_clipperton_island",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇷": {
	name: "flag Costa Rica",
	slug: "flag_costa_rica",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇺": {
	name: "flag Cuba",
	slug: "flag_cuba",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇻": {
	name: "flag Cape Verde",
	slug: "flag_cape_verde",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇼": {
	name: "flag Curaçao",
	slug: "flag_curacao",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇽": {
	name: "flag Christmas Island",
	slug: "flag_christmas_island",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇾": {
	name: "flag Cyprus",
	slug: "flag_cyprus",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇨🇿": {
	name: "flag Czechia",
	slug: "flag_czechia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇩🇪": {
	name: "flag Germany",
	slug: "flag_germany",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🇩🇬": {
	name: "flag Diego Garcia",
	slug: "flag_diego_garcia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇩🇯": {
	name: "flag Djibouti",
	slug: "flag_djibouti",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇩🇰": {
	name: "flag Denmark",
	slug: "flag_denmark",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇩🇲": {
	name: "flag Dominica",
	slug: "flag_dominica",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇩🇴": {
	name: "flag Dominican Republic",
	slug: "flag_dominican_republic",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇩🇿": {
	name: "flag Algeria",
	slug: "flag_algeria",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇪🇦": {
	name: "flag Ceuta & Melilla",
	slug: "flag_ceuta_melilla",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇪🇨": {
	name: "flag Ecuador",
	slug: "flag_ecuador",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇪🇪": {
	name: "flag Estonia",
	slug: "flag_estonia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇪🇬": {
	name: "flag Egypt",
	slug: "flag_egypt",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇪🇭": {
	name: "flag Western Sahara",
	slug: "flag_western_sahara",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇪🇷": {
	name: "flag Eritrea",
	slug: "flag_eritrea",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇪🇸": {
	name: "flag Spain",
	slug: "flag_spain",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🇪🇹": {
	name: "flag Ethiopia",
	slug: "flag_ethiopia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇪🇺": {
	name: "flag European Union",
	slug: "flag_european_union",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇫🇮": {
	name: "flag Finland",
	slug: "flag_finland",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇫🇯": {
	name: "flag Fiji",
	slug: "flag_fiji",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇫🇰": {
	name: "flag Falkland Islands",
	slug: "flag_falkland_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇫🇲": {
	name: "flag Micronesia",
	slug: "flag_micronesia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇫🇴": {
	name: "flag Faroe Islands",
	slug: "flag_faroe_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇫🇷": {
	name: "flag France",
	slug: "flag_france",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🇬🇦": {
	name: "flag Gabon",
	slug: "flag_gabon",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇧": {
	name: "flag United Kingdom",
	slug: "flag_united_kingdom",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🇬🇩": {
	name: "flag Grenada",
	slug: "flag_grenada",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇪": {
	name: "flag Georgia",
	slug: "flag_georgia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇫": {
	name: "flag French Guiana",
	slug: "flag_french_guiana",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇬": {
	name: "flag Guernsey",
	slug: "flag_guernsey",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇭": {
	name: "flag Ghana",
	slug: "flag_ghana",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇮": {
	name: "flag Gibraltar",
	slug: "flag_gibraltar",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇱": {
	name: "flag Greenland",
	slug: "flag_greenland",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇲": {
	name: "flag Gambia",
	slug: "flag_gambia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇳": {
	name: "flag Guinea",
	slug: "flag_guinea",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇵": {
	name: "flag Guadeloupe",
	slug: "flag_guadeloupe",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇶": {
	name: "flag Equatorial Guinea",
	slug: "flag_equatorial_guinea",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇷": {
	name: "flag Greece",
	slug: "flag_greece",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇸": {
	name: "flag South Georgia & South Sandwich Islands",
	slug: "flag_south_georgia_south_sandwich_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇹": {
	name: "flag Guatemala",
	slug: "flag_guatemala",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇺": {
	name: "flag Guam",
	slug: "flag_guam",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇼": {
	name: "flag Guinea-Bissau",
	slug: "flag_guinea_bissau",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇬🇾": {
	name: "flag Guyana",
	slug: "flag_guyana",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇭🇰": {
	name: "flag Hong Kong SAR China",
	slug: "flag_hong_kong_sar_china",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇭🇲": {
	name: "flag Heard & McDonald Islands",
	slug: "flag_heard_mcdonald_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇭🇳": {
	name: "flag Honduras",
	slug: "flag_honduras",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇭🇷": {
	name: "flag Croatia",
	slug: "flag_croatia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇭🇹": {
	name: "flag Haiti",
	slug: "flag_haiti",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇭🇺": {
	name: "flag Hungary",
	slug: "flag_hungary",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇨": {
	name: "flag Canary Islands",
	slug: "flag_canary_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇩": {
	name: "flag Indonesia",
	slug: "flag_indonesia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇪": {
	name: "flag Ireland",
	slug: "flag_ireland",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇱": {
	name: "flag Israel",
	slug: "flag_israel",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇲": {
	name: "flag Isle of Man",
	slug: "flag_isle_of_man",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇳": {
	name: "flag India",
	slug: "flag_india",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇴": {
	name: "flag British Indian Ocean Territory",
	slug: "flag_british_indian_ocean_territory",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇶": {
	name: "flag Iraq",
	slug: "flag_iraq",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇷": {
	name: "flag Iran",
	slug: "flag_iran",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇸": {
	name: "flag Iceland",
	slug: "flag_iceland",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇮🇹": {
	name: "flag Italy",
	slug: "flag_italy",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🇯🇪": {
	name: "flag Jersey",
	slug: "flag_jersey",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇯🇲": {
	name: "flag Jamaica",
	slug: "flag_jamaica",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇯🇴": {
	name: "flag Jordan",
	slug: "flag_jordan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇯🇵": {
	name: "flag Japan",
	slug: "flag_japan",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🇰🇪": {
	name: "flag Kenya",
	slug: "flag_kenya",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇰🇬": {
	name: "flag Kyrgyzstan",
	slug: "flag_kyrgyzstan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇰🇭": {
	name: "flag Cambodia",
	slug: "flag_cambodia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇰🇮": {
	name: "flag Kiribati",
	slug: "flag_kiribati",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇰🇲": {
	name: "flag Comoros",
	slug: "flag_comoros",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇰🇳": {
	name: "flag St. Kitts & Nevis",
	slug: "flag_st_kitts_nevis",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇰🇵": {
	name: "flag North Korea",
	slug: "flag_north_korea",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇰🇷": {
	name: "flag South Korea",
	slug: "flag_south_korea",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🇰🇼": {
	name: "flag Kuwait",
	slug: "flag_kuwait",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇰🇾": {
	name: "flag Cayman Islands",
	slug: "flag_cayman_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇰🇿": {
	name: "flag Kazakhstan",
	slug: "flag_kazakhstan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇦": {
	name: "flag Laos",
	slug: "flag_laos",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇧": {
	name: "flag Lebanon",
	slug: "flag_lebanon",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇨": {
	name: "flag St. Lucia",
	slug: "flag_st_lucia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇮": {
	name: "flag Liechtenstein",
	slug: "flag_liechtenstein",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇰": {
	name: "flag Sri Lanka",
	slug: "flag_sri_lanka",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇷": {
	name: "flag Liberia",
	slug: "flag_liberia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇸": {
	name: "flag Lesotho",
	slug: "flag_lesotho",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇹": {
	name: "flag Lithuania",
	slug: "flag_lithuania",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇺": {
	name: "flag Luxembourg",
	slug: "flag_luxembourg",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇻": {
	name: "flag Latvia",
	slug: "flag_latvia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇱🇾": {
	name: "flag Libya",
	slug: "flag_libya",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇦": {
	name: "flag Morocco",
	slug: "flag_morocco",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇨": {
	name: "flag Monaco",
	slug: "flag_monaco",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇩": {
	name: "flag Moldova",
	slug: "flag_moldova",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇪": {
	name: "flag Montenegro",
	slug: "flag_montenegro",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇫": {
	name: "flag St. Martin",
	slug: "flag_st_martin",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇬": {
	name: "flag Madagascar",
	slug: "flag_madagascar",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇭": {
	name: "flag Marshall Islands",
	slug: "flag_marshall_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇰": {
	name: "flag North Macedonia",
	slug: "flag_north_macedonia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇱": {
	name: "flag Mali",
	slug: "flag_mali",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇲": {
	name: "flag Myanmar (Burma)",
	slug: "flag_myanmar",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇳": {
	name: "flag Mongolia",
	slug: "flag_mongolia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇴": {
	name: "flag Macao SAR China",
	slug: "flag_macao_sar_china",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇵": {
	name: "flag Northern Mariana Islands",
	slug: "flag_northern_mariana_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇶": {
	name: "flag Martinique",
	slug: "flag_martinique",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇷": {
	name: "flag Mauritania",
	slug: "flag_mauritania",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇸": {
	name: "flag Montserrat",
	slug: "flag_montserrat",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇹": {
	name: "flag Malta",
	slug: "flag_malta",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇺": {
	name: "flag Mauritius",
	slug: "flag_mauritius",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇻": {
	name: "flag Maldives",
	slug: "flag_maldives",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇼": {
	name: "flag Malawi",
	slug: "flag_malawi",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇽": {
	name: "flag Mexico",
	slug: "flag_mexico",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇾": {
	name: "flag Malaysia",
	slug: "flag_malaysia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇲🇿": {
	name: "flag Mozambique",
	slug: "flag_mozambique",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇦": {
	name: "flag Namibia",
	slug: "flag_namibia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇨": {
	name: "flag New Caledonia",
	slug: "flag_new_caledonia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇪": {
	name: "flag Niger",
	slug: "flag_niger",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇫": {
	name: "flag Norfolk Island",
	slug: "flag_norfolk_island",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇬": {
	name: "flag Nigeria",
	slug: "flag_nigeria",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇮": {
	name: "flag Nicaragua",
	slug: "flag_nicaragua",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇱": {
	name: "flag Netherlands",
	slug: "flag_netherlands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇴": {
	name: "flag Norway",
	slug: "flag_norway",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇵": {
	name: "flag Nepal",
	slug: "flag_nepal",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇷": {
	name: "flag Nauru",
	slug: "flag_nauru",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇺": {
	name: "flag Niue",
	slug: "flag_niue",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇳🇿": {
	name: "flag New Zealand",
	slug: "flag_new_zealand",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇴🇲": {
	name: "flag Oman",
	slug: "flag_oman",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇦": {
	name: "flag Panama",
	slug: "flag_panama",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇪": {
	name: "flag Peru",
	slug: "flag_peru",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇫": {
	name: "flag French Polynesia",
	slug: "flag_french_polynesia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇬": {
	name: "flag Papua New Guinea",
	slug: "flag_papua_new_guinea",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇭": {
	name: "flag Philippines",
	slug: "flag_philippines",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇰": {
	name: "flag Pakistan",
	slug: "flag_pakistan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇱": {
	name: "flag Poland",
	slug: "flag_poland",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇲": {
	name: "flag St. Pierre & Miquelon",
	slug: "flag_st_pierre_miquelon",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇳": {
	name: "flag Pitcairn Islands",
	slug: "flag_pitcairn_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇷": {
	name: "flag Puerto Rico",
	slug: "flag_puerto_rico",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇸": {
	name: "flag Palestinian Territories",
	slug: "flag_palestinian_territories",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇹": {
	name: "flag Portugal",
	slug: "flag_portugal",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇼": {
	name: "flag Palau",
	slug: "flag_palau",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇵🇾": {
	name: "flag Paraguay",
	slug: "flag_paraguay",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇶🇦": {
	name: "flag Qatar",
	slug: "flag_qatar",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇷🇪": {
	name: "flag Réunion",
	slug: "flag_reunion",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇷🇴": {
	name: "flag Romania",
	slug: "flag_romania",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇷🇸": {
	name: "flag Serbia",
	slug: "flag_serbia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇷🇺": {
	name: "flag Russia",
	slug: "flag_russia",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🇷🇼": {
	name: "flag Rwanda",
	slug: "flag_rwanda",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇦": {
	name: "flag Saudi Arabia",
	slug: "flag_saudi_arabia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇧": {
	name: "flag Solomon Islands",
	slug: "flag_solomon_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇨": {
	name: "flag Seychelles",
	slug: "flag_seychelles",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇩": {
	name: "flag Sudan",
	slug: "flag_sudan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇪": {
	name: "flag Sweden",
	slug: "flag_sweden",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇬": {
	name: "flag Singapore",
	slug: "flag_singapore",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇭": {
	name: "flag St. Helena",
	slug: "flag_st_helena",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇮": {
	name: "flag Slovenia",
	slug: "flag_slovenia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇯": {
	name: "flag Svalbard & Jan Mayen",
	slug: "flag_svalbard_jan_mayen",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇰": {
	name: "flag Slovakia",
	slug: "flag_slovakia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇱": {
	name: "flag Sierra Leone",
	slug: "flag_sierra_leone",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇲": {
	name: "flag San Marino",
	slug: "flag_san_marino",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇳": {
	name: "flag Senegal",
	slug: "flag_senegal",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇴": {
	name: "flag Somalia",
	slug: "flag_somalia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇷": {
	name: "flag Suriname",
	slug: "flag_suriname",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇸": {
	name: "flag South Sudan",
	slug: "flag_south_sudan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇹": {
	name: "flag São Tomé & Príncipe",
	slug: "flag_sao_tome_principe",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇻": {
	name: "flag El Salvador",
	slug: "flag_el_salvador",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇽": {
	name: "flag Sint Maarten",
	slug: "flag_sint_maarten",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇾": {
	name: "flag Syria",
	slug: "flag_syria",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇸🇿": {
	name: "flag Eswatini",
	slug: "flag_eswatini",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇦": {
	name: "flag Tristan da Cunha",
	slug: "flag_tristan_da_cunha",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇨": {
	name: "flag Turks & Caicos Islands",
	slug: "flag_turks_caicos_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇩": {
	name: "flag Chad",
	slug: "flag_chad",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇫": {
	name: "flag French Southern Territories",
	slug: "flag_french_southern_territories",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇬": {
	name: "flag Togo",
	slug: "flag_togo",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇭": {
	name: "flag Thailand",
	slug: "flag_thailand",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇯": {
	name: "flag Tajikistan",
	slug: "flag_tajikistan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇰": {
	name: "flag Tokelau",
	slug: "flag_tokelau",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇱": {
	name: "flag Timor-Leste",
	slug: "flag_timor_leste",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇲": {
	name: "flag Turkmenistan",
	slug: "flag_turkmenistan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇳": {
	name: "flag Tunisia",
	slug: "flag_tunisia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇴": {
	name: "flag Tonga",
	slug: "flag_tonga",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇷": {
	name: "flag Turkey",
	slug: "flag_turkey",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇹": {
	name: "flag Trinidad & Tobago",
	slug: "flag_trinidad_tobago",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇻": {
	name: "flag Tuvalu",
	slug: "flag_tuvalu",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇼": {
	name: "flag Taiwan",
	slug: "flag_taiwan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇹🇿": {
	name: "flag Tanzania",
	slug: "flag_tanzania",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇺🇦": {
	name: "flag Ukraine",
	slug: "flag_ukraine",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇺🇬": {
	name: "flag Uganda",
	slug: "flag_uganda",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇺🇲": {
	name: "flag U.S. Outlying Islands",
	slug: "flag_u_s_outlying_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇺🇳": {
	name: "flag United Nations",
	slug: "flag_united_nations",
	group: "Flags",
	emoji_version: "4.0",
	unicode_version: "4.0",
	skin_tone_support: false
},
	"🇺🇸": {
	name: "flag United States",
	slug: "flag_united_states",
	group: "Flags",
	emoji_version: "0.6",
	unicode_version: "0.6",
	skin_tone_support: false
},
	"🇺🇾": {
	name: "flag Uruguay",
	slug: "flag_uruguay",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇺🇿": {
	name: "flag Uzbekistan",
	slug: "flag_uzbekistan",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇻🇦": {
	name: "flag Vatican City",
	slug: "flag_vatican_city",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇻🇨": {
	name: "flag St. Vincent & Grenadines",
	slug: "flag_st_vincent_grenadines",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇻🇪": {
	name: "flag Venezuela",
	slug: "flag_venezuela",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇻🇬": {
	name: "flag British Virgin Islands",
	slug: "flag_british_virgin_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇻🇮": {
	name: "flag U.S. Virgin Islands",
	slug: "flag_u_s_virgin_islands",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇻🇳": {
	name: "flag Vietnam",
	slug: "flag_vietnam",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇻🇺": {
	name: "flag Vanuatu",
	slug: "flag_vanuatu",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇼🇫": {
	name: "flag Wallis & Futuna",
	slug: "flag_wallis_futuna",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇼🇸": {
	name: "flag Samoa",
	slug: "flag_samoa",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇽🇰": {
	name: "flag Kosovo",
	slug: "flag_kosovo",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇾🇪": {
	name: "flag Yemen",
	slug: "flag_yemen",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇾🇹": {
	name: "flag Mayotte",
	slug: "flag_mayotte",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇿🇦": {
	name: "flag South Africa",
	slug: "flag_south_africa",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇿🇲": {
	name: "flag Zambia",
	slug: "flag_zambia",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🇿🇼": {
	name: "flag Zimbabwe",
	slug: "flag_zimbabwe",
	group: "Flags",
	emoji_version: "2.0",
	unicode_version: "2.0",
	skin_tone_support: false
},
	"🏴󠁧󠁢󠁥󠁮󠁧󠁿": {
	name: "flag England",
	slug: "flag_england",
	group: "Flags",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🏴󠁧󠁢󠁳󠁣󠁴󠁿": {
	name: "flag Scotland",
	slug: "flag_scotland",
	group: "Flags",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
},
	"🏴󠁧󠁢󠁷󠁬󠁳󠁿": {
	name: "flag Wales",
	slug: "flag_wales",
	group: "Flags",
	emoji_version: "5.0",
	unicode_version: "5.0",
	skin_tone_support: false
}
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var location = commonjsGlobal.location || {};
/*jslint indent: 2, browser: true, bitwise: true, plusplus: true */
var twemoji = (function (
  /*! Copyright Twitter Inc. and other contributors. Licensed under MIT *//*
    https://github.com/twitter/twemoji/blob/gh-pages/LICENSE
  */

  // WARNING:   this file is generated automatically via
  //            `node scripts/build.js`
  //            please update its `createTwemoji` function
  //            at the bottom of the same file instead.

) {

  /*jshint maxparams:4 */

  var
    // the exported module object
    twemoji = {


    /////////////////////////
    //      properties     //
    /////////////////////////

      // default assets url, by default will be Twitter Inc. CDN
      base: 'https://twemoji.maxcdn.com/v/13.0.1/',

      // default assets file extensions, by default '.png'
      ext: '.png',

      // default assets/folder size, by default "72x72"
      // available via Twitter CDN: 72
      size: '72x72',

      // default class name, by default 'emoji'
      className: 'emoji',

      // basic utilities / helpers to convert code points
      // to JavaScript surrogates and vice versa
      convert: {

        /**
         * Given an HEX codepoint, returns UTF16 surrogate pairs.
         *
         * @param   string  generic codepoint, i.e. '1F4A9'
         * @return  string  codepoint transformed into utf16 surrogates pair,
         *          i.e. \uD83D\uDCA9
         *
         * @example
         *  twemoji.convert.fromCodePoint('1f1e8');
         *  // "\ud83c\udde8"
         *
         *  '1f1e8-1f1f3'.split('-').map(twemoji.convert.fromCodePoint).join('')
         *  // "\ud83c\udde8\ud83c\uddf3"
         */
        fromCodePoint: fromCodePoint,

        /**
         * Given UTF16 surrogate pairs, returns the equivalent HEX codepoint.
         *
         * @param   string  generic utf16 surrogates pair, i.e. \uD83D\uDCA9
         * @param   string  optional separator for double code points, default='-'
         * @return  string  utf16 transformed into codepoint, i.e. '1F4A9'
         *
         * @example
         *  twemoji.convert.toCodePoint('\ud83c\udde8\ud83c\uddf3');
         *  // "1f1e8-1f1f3"
         *
         *  twemoji.convert.toCodePoint('\ud83c\udde8\ud83c\uddf3', '~');
         *  // "1f1e8~1f1f3"
         */
        toCodePoint: toCodePoint
      },


    /////////////////////////
    //       methods       //
    /////////////////////////

      /**
       * User first: used to remove missing images
       * preserving the original text intent when
       * a fallback for network problems is desired.
       * Automatically added to Image nodes via DOM
       * It could be recycled for string operations via:
       *  $('img.emoji').on('error', twemoji.onerror)
       */
      onerror: function onerror() {
        if (this.parentNode) {
          this.parentNode.replaceChild(createText(this.alt, false), this);
        }
      },

      /**
       * Main method/logic to generate either <img> tags or HTMLImage nodes.
       *  "emojify" a generic text or DOM Element.
       *
       * @overloads
       *
       * String replacement for `innerHTML` or server side operations
       *  twemoji.parse(string);
       *  twemoji.parse(string, Function);
       *  twemoji.parse(string, Object);
       *
       * HTMLElement tree parsing for safer operations over existing DOM
       *  twemoji.parse(HTMLElement);
       *  twemoji.parse(HTMLElement, Function);
       *  twemoji.parse(HTMLElement, Object);
       *
       * @param   string|HTMLElement  the source to parse and enrich with emoji.
       *
       *          string              replace emoji matches with <img> tags.
       *                              Mainly used to inject emoji via `innerHTML`
       *                              It does **not** parse the string or validate it,
       *                              it simply replaces found emoji with a tag.
       *                              NOTE: be sure this won't affect security.
       *
       *          HTMLElement         walk through the DOM tree and find emoji
       *                              that are inside **text node only** (nodeType === 3)
       *                              Mainly used to put emoji in already generated DOM
       *                              without compromising surrounding nodes and
       *                              **avoiding** the usage of `innerHTML`.
       *                              NOTE: Using DOM elements instead of strings should
       *                              improve security without compromising too much
       *                              performance compared with a less safe `innerHTML`.
       *
       * @param   Function|Object  [optional]
       *                              either the callback that will be invoked or an object
       *                              with all properties to use per each found emoji.
       *
       *          Function            if specified, this will be invoked per each emoji
       *                              that has been found through the RegExp except
       *                              those follwed by the invariant \uFE0E ("as text").
       *                              Once invoked, parameters will be:
       *
       *                                iconId:string     the lower case HEX code point
       *                                                  i.e. "1f4a9"
       *
       *                                options:Object    all info for this parsing operation
       *
       *                                variant:char      the optional \uFE0F ("as image")
       *                                                  variant, in case this info
       *                                                  is anyhow meaningful.
       *                                                  By default this is ignored.
       *
       *                              If such callback will return a falsy value instead
       *                              of a valid `src` to use for the image, nothing will
       *                              actually change for that specific emoji.
       *
       *
       *          Object              if specified, an object containing the following properties
       *
       *            callback   Function  the callback to invoke per each found emoji.
       *            base       string    the base url, by default twemoji.base
       *            ext        string    the image extension, by default twemoji.ext
       *            size       string    the assets size, by default twemoji.size
       *
       * @example
       *
       *  twemoji.parse("I \u2764\uFE0F emoji!");
       *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"/> emoji!
       *
       *
       *  twemoji.parse("I \u2764\uFE0F emoji!", function(iconId, options) {
       *    return '/assets/' + iconId + '.gif';
       *  });
       *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"/> emoji!
       *
       *
       * twemoji.parse("I \u2764\uFE0F emoji!", {
       *   size: 72,
       *   callback: function(iconId, options) {
       *     return '/assets/' + options.size + '/' + iconId + options.ext;
       *   }
       * });
       *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/72x72/2764.png"/> emoji!
       *
       */
      parse: parse,

      /**
       * Given a string, invokes the callback argument
       *  per each emoji found in such string.
       * This is the most raw version used by
       *  the .parse(string) method itself.
       *
       * @param   string    generic string to parse
       * @param   Function  a generic callback that will be
       *                    invoked to replace the content.
       *                    This calback wil receive standard
       *                    String.prototype.replace(str, callback)
       *                    arguments such:
       *  callback(
       *    rawText,  // the emoji match
       *  );
       *
       *                    and others commonly received via replace.
       */
      replace: replace,

      /**
       * Simplify string tests against emoji.
       *
       * @param   string  some text that might contain emoji
       * @return  boolean true if any emoji was found, false otherwise.
       *
       * @example
       *
       *  if (twemoji.test(someContent)) {
       *    console.log("emoji All The Things!");
       *  }
       */
      test: test
    },

    // used to escape HTML special chars in attributes
    escaper = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    },

    // RegExp based on emoji's official Unicode standards
    // http://www.unicode.org/Public/UNIDATA/EmojiSources.txt
    re = /(?:\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d])|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udeeb\udeec\udef4-\udefc\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78\udd7a-\uddb4\uddb7\uddba\uddbc-\uddcb\uddd0\uddde-\uddff\ude70-\ude74\ude78-\ude7a\ude80-\ude86\ude90-\udea8\udeb0-\udeb6\udec0-\udec2\uded0-\uded6]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,

    // avoid runtime RegExp creation for not so smart,
    // not JIT based, and old browsers / engines
    UFE0Fg = /\uFE0F/g,

    // avoid using a string literal like '\u200D' here because minifiers expand it inline
    U200D = String.fromCharCode(0x200D),

    // used to find HTML special chars in attributes
    rescaper = /[&<>'"]/g,

    // nodes with type 1 which should **not** be parsed
    shouldntBeParsed = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,

    // just a private shortcut
    fromCharCode = String.fromCharCode;

  return twemoji;


  /////////////////////////
  //  private functions  //
  //     declaration     //
  /////////////////////////

  /**
   * Shortcut to create text nodes
   * @param   string  text used to create DOM text node
   * @return  Node  a DOM node with that text
   */
  function createText(text, clean) {
    return document.createTextNode(clean ? text.replace(UFE0Fg, '') : text);
  }

  /**
   * Utility function to escape html attribute text
   * @param   string  text use in HTML attribute
   * @return  string  text encoded to use in HTML attribute
   */
  function escapeHTML(s) {
    return s.replace(rescaper, replacer);
  }

  /**
   * Default callback used to generate emoji src
   *  based on Twitter CDN
   * @param   string    the emoji codepoint string
   * @param   string    the default size to use, i.e. "36x36"
   * @return  string    the image source to use
   */
  function defaultImageSrcGenerator(icon, options) {
    return ''.concat(options.base, options.size, '/', icon, options.ext);
  }

  /**
   * Given a generic DOM nodeType 1, walk through all children
   * and store every nodeType 3 (#text) found in the tree.
   * @param   Element a DOM Element with probably some text in it
   * @param   Array the list of previously discovered text nodes
   * @return  Array same list with new discovered nodes, if any
   */
  function grabAllTextNodes(node, allText) {
    var
      childNodes = node.childNodes,
      length = childNodes.length,
      subnode,
      nodeType;
    while (length--) {
      subnode = childNodes[length];
      nodeType = subnode.nodeType;
      // parse emoji only in text nodes
      if (nodeType === 3) {
        // collect them to process emoji later
        allText.push(subnode);
      }
      // ignore all nodes that are not type 1, that are svg, or that
      // should not be parsed as script, style, and others
      else if (nodeType === 1 && !('ownerSVGElement' in subnode) &&
          !shouldntBeParsed.test(subnode.nodeName.toLowerCase())) {
        grabAllTextNodes(subnode, allText);
      }
    }
    return allText;
  }

  /**
   * Used to both remove the possible variant
   *  and to convert utf16 into code points.
   *  If there is a zero-width-joiner (U+200D), leave the variants in.
   * @param   string    the raw text of the emoji match
   * @return  string    the code point
   */
  function grabTheRightIcon(rawText) {
    // if variant is present as \uFE0F
    return toCodePoint(rawText.indexOf(U200D) < 0 ?
      rawText.replace(UFE0Fg, '') :
      rawText
    );
  }

  /**
   * DOM version of the same logic / parser:
   *  emojify all found sub-text nodes placing images node instead.
   * @param   Element   generic DOM node with some text in some child node
   * @param   Object    options  containing info about how to parse
    *
    *            .callback   Function  the callback to invoke per each found emoji.
    *            .base       string    the base url, by default twemoji.base
    *            .ext        string    the image extension, by default twemoji.ext
    *            .size       string    the assets size, by default twemoji.size
    *
   * @return  Element same generic node with emoji in place, if any.
   */
  function parseNode(node, options) {
    var
      allText = grabAllTextNodes(node, []),
      length = allText.length,
      attrib,
      attrname,
      modified,
      fragment,
      subnode,
      text,
      match,
      i,
      index,
      img,
      rawText,
      iconId,
      src;
    while (length--) {
      modified = false;
      fragment = document.createDocumentFragment();
      subnode = allText[length];
      text = subnode.nodeValue;
      i = 0;
      while ((match = re.exec(text))) {
        index = match.index;
        if (index !== i) {
          fragment.appendChild(
            createText(text.slice(i, index), true)
          );
        }
        rawText = match[0];
        iconId = grabTheRightIcon(rawText);
        i = index + rawText.length;
        src = options.callback(iconId, options);
        if (iconId && src) {
          img = new Image();
          img.onerror = options.onerror;
          img.setAttribute('draggable', 'false');
          attrib = options.attributes(rawText, iconId);
          for (attrname in attrib) {
            if (
              attrib.hasOwnProperty(attrname) &&
              // don't allow any handlers to be set + don't allow overrides
              attrname.indexOf('on') !== 0 &&
              !img.hasAttribute(attrname)
            ) {
              img.setAttribute(attrname, attrib[attrname]);
            }
          }
          img.className = options.className;
          img.alt = rawText;
          img.src = src;
          modified = true;
          fragment.appendChild(img);
        }
        if (!img) fragment.appendChild(createText(rawText, false));
        img = null;
      }
      // is there actually anything to replace in here ?
      if (modified) {
        // any text left to be added ?
        if (i < text.length) {
          fragment.appendChild(
            createText(text.slice(i), true)
          );
        }
        // replace the text node only, leave intact
        // anything else surrounding such text
        subnode.parentNode.replaceChild(fragment, subnode);
      }
    }
    return node;
  }

  /**
   * String/HTML version of the same logic / parser:
   *  emojify a generic text placing images tags instead of surrogates pair.
   * @param   string    generic string with possibly some emoji in it
   * @param   Object    options  containing info about how to parse
   *
   *            .callback   Function  the callback to invoke per each found emoji.
   *            .base       string    the base url, by default twemoji.base
   *            .ext        string    the image extension, by default twemoji.ext
   *            .size       string    the assets size, by default twemoji.size
   *
   * @return  the string with <img tags> replacing all found and parsed emoji
   */
  function parseString(str, options) {
    return replace(str, function (rawText) {
      var
        ret = rawText,
        iconId = grabTheRightIcon(rawText),
        src = options.callback(iconId, options),
        attrib,
        attrname;
      if (iconId && src) {
        // recycle the match string replacing the emoji
        // with its image counter part
        ret = '<img '.concat(
          'class="', options.className, '" ',
          'draggable="false" ',
          // needs to preserve user original intent
          // when variants should be copied and pasted too
          'alt="',
          rawText,
          '"',
          ' src="',
          src,
          '"'
        );
        attrib = options.attributes(rawText, iconId);
        for (attrname in attrib) {
          if (
            attrib.hasOwnProperty(attrname) &&
            // don't allow any handlers to be set + don't allow overrides
            attrname.indexOf('on') !== 0 &&
            ret.indexOf(' ' + attrname + '=') === -1
          ) {
            ret = ret.concat(' ', attrname, '="', escapeHTML(attrib[attrname]), '"');
          }
        }
        ret = ret.concat('/>');
      }
      return ret;
    });
  }

  /**
   * Function used to actually replace HTML special chars
   * @param   string  HTML special char
   * @return  string  encoded HTML special char
   */
  function replacer(m) {
    return escaper[m];
  }

  /**
   * Default options.attribute callback
   * @return  null
   */
  function returnNull() {
    return null;
  }

  /**
   * Given a generic value, creates its squared counterpart if it's a number.
   *  As example, number 36 will return '36x36'.
   * @param   any     a generic value.
   * @return  any     a string representing asset size, i.e. "36x36"
   *                  only in case the value was a number.
   *                  Returns initial value otherwise.
   */
  function toSizeSquaredAsset(value) {
    return typeof value === 'number' ?
      value + 'x' + value :
      value;
  }


  /////////////////////////
  //  exported functions //
  //     declaration     //
  /////////////////////////

  function fromCodePoint(codepoint) {
    var code = typeof codepoint === 'string' ?
          parseInt(codepoint, 16) : codepoint;
    if (code < 0x10000) {
      return fromCharCode(code);
    }
    code -= 0x10000;
    return fromCharCode(
      0xD800 + (code >> 10),
      0xDC00 + (code & 0x3FF)
    );
  }

  function parse(what, how) {
    if (!how || typeof how === 'function') {
      how = {callback: how};
    }
    // if first argument is string, inject html <img> tags
    // otherwise use the DOM tree and parse text nodes only
    return (typeof what === 'string' ? parseString : parseNode)(what, {
      callback:   how.callback || defaultImageSrcGenerator,
      attributes: typeof how.attributes === 'function' ? how.attributes : returnNull,
      base:       typeof how.base === 'string' ? how.base : twemoji.base,
      ext:        how.ext || twemoji.ext,
      size:       how.folder || toSizeSquaredAsset(how.size || twemoji.size),
      className:  how.className || twemoji.className,
      onerror:    how.onerror || twemoji.onerror
    });
  }

  function replace(text, callback) {
    return String(text).replace(re, callback);
  }

  function test(text) {
    // IE6 needs a reset before too
    re.lastIndex = 0;
    var result = re.test(text);
    re.lastIndex = 0;
    return result;
  }

  function toCodePoint(unicodeSurrogates, sep) {
    var
      r = [],
      c = 0,
      p = 0,
      i = 0;
    while (i < unicodeSurrogates.length) {
      c = unicodeSurrogates.charCodeAt(i++);
      if (p) {
        r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
        p = 0;
      } else if (0xD800 <= c && c <= 0xDBFF) {
        p = c;
      } else {
        r.push(c.toString(16));
      }
    }
    return r.join(sep || '-');
  }

}());
if (!location.protocol) {
  twemoji.base = twemoji.base.replace(/^http:/, "");
}
var twemoji_npm = twemoji;

var indicatorStyle = 'color: var(--text-accent); width: 2.5em; text-align: center; float:left; font-weight:800;';
var DEFAULT_SETTINGS = {
    twemojiActive: true
};
var MyPlugin = /** @class */ (function (_super) {
    __extends(MyPlugin, _super);
    function MyPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyPlugin.prototype.loadEmojis = function () {
        function titleCase(string) {
            var sentence = string.toLowerCase().split('_');
            for (var i = 0; i < sentence.length; i++) {
                sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
            }
            return sentence.join(' ');
        }
        var items = orderedEmoji.map(function (name) {
            return {
                name: titleCase(emojiNames[name]["name"]),
                char: name,
                imgHtml: twemoji_npm.parse(name)
            };
        });
        return items;
    };
    MyPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.emojis = this.loadEmojis();
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addSettingTab(new SettingsTab(this.app, this));
                        if (this.settings.twemojiActive) {
                            obsidian.MarkdownPreviewRenderer.registerPostProcessor(MyPlugin.postprocessor);
                        }
                        this.addCommand({
                            id: 'emoji-picker:open-picker',
                            name: 'Open emoji picker',
                            hotkeys: [],
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        new EmojiFuzzySuggestModal(_this.app, _this.emojis, _this.settings).open();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MyPlugin.prototype.onunload = function () {
    };
    MyPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    MyPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyPlugin.postprocessor = function (el, ctx) {
        twemoji_npm.parse(el);
    };
    return MyPlugin;
}(obsidian.Plugin));
var EmojiFuzzySuggestModal = /** @class */ (function (_super) {
    __extends(EmojiFuzzySuggestModal, _super);
    function EmojiFuzzySuggestModal(app, emojis, settings) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.emojis = emojis;
        _this.settings = settings;
        return _this;
    }
    EmojiFuzzySuggestModal.prototype.getItems = function () {
        return this.emojis;
    };
    EmojiFuzzySuggestModal.prototype.getItemText = function (item) {
        return item.name;
    };
    EmojiFuzzySuggestModal.prototype.renderSuggestion = function (item, el) {
        _super.prototype.renderSuggestion.call(this, item, el);
        this.updateSuggestionElForMode(item, el);
    };
    EmojiFuzzySuggestModal.prototype.updateSuggestionElForMode = function (item, el) {
        var indicatorEl = createEl('div', {
            attr: { style: indicatorStyle },
        });
        if (this.settings.twemojiActive) {
            indicatorEl.innerHTML = item.item.imgHtml;
        }
        else {
            indicatorEl.textContent = item.item.char;
        }
        el.insertAdjacentElement('afterbegin', indicatorEl);
    };
    EmojiFuzzySuggestModal.prototype.onChooseItem = function (item, evt) {
        document.execCommand('insertText', false, item.char);
    };
    return EmojiFuzzySuggestModal;
}(obsidian.FuzzySuggestModal));
var SettingsTab = /** @class */ (function (_super) {
    __extends(SettingsTab, _super);
    function SettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h1', { text: 'Emoji Toolbar' });
        containerEl.createEl('a', { text: 'Created by oliveryh', href: 'https://github.com/oliveryh/' });
        containerEl.createEl('h2', { text: 'Settings' });
        new obsidian.Setting(containerEl)
            .setName('Twitter Emoji')
            .setDesc('Improved emoji support. Note: this applies to emoji search and preview only.')
            .addToggle(function (toggle) { return toggle
            .setValue(_this.plugin.settings.twemojiActive)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.twemojiActive = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        if (value) {
                            obsidian.MarkdownPreviewRenderer.registerPostProcessor(MyPlugin.postprocessor);
                        }
                        else {
                            obsidian.MarkdownPreviewRenderer.unregisterPostProcessor(MyPlugin.postprocessor);
                        }
                        return [2 /*return*/];
                }
            });
        }); }); });
    };
    return SettingsTab;
}(obsidian.PluginSettingTab));

module.exports = MyPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy90d2Vtb2ppL2Rpc3QvdHdlbW9qaS5ucG0uanMiLCJtYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsInZhciBsb2NhdGlvbiA9IGdsb2JhbC5sb2NhdGlvbiB8fCB7fTtcbi8qanNsaW50IGluZGVudDogMiwgYnJvd3NlcjogdHJ1ZSwgYml0d2lzZTogdHJ1ZSwgcGx1c3BsdXM6IHRydWUgKi9cbnZhciB0d2Vtb2ppID0gKGZ1bmN0aW9uIChcbiAgLyohIENvcHlyaWdodCBUd2l0dGVyIEluYy4gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycy4gTGljZW5zZWQgdW5kZXIgTUlUICovLypcbiAgICBodHRwczovL2dpdGh1Yi5jb20vdHdpdHRlci90d2Vtb2ppL2Jsb2IvZ2gtcGFnZXMvTElDRU5TRVxuICAqL1xuXG4gIC8vIFdBUk5JTkc6ICAgdGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IHZpYVxuICAvLyAgICAgICAgICAgIGBub2RlIHNjcmlwdHMvYnVpbGQuanNgXG4gIC8vICAgICAgICAgICAgcGxlYXNlIHVwZGF0ZSBpdHMgYGNyZWF0ZVR3ZW1vamlgIGZ1bmN0aW9uXG4gIC8vICAgICAgICAgICAgYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2FtZSBmaWxlIGluc3RlYWQuXG5cbikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLypqc2hpbnQgbWF4cGFyYW1zOjQgKi9cblxuICB2YXJcbiAgICAvLyB0aGUgZXhwb3J0ZWQgbW9kdWxlIG9iamVjdFxuICAgIHR3ZW1vamkgPSB7XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyAgICAgIHByb3BlcnRpZXMgICAgIC8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAvLyBkZWZhdWx0IGFzc2V0cyB1cmwsIGJ5IGRlZmF1bHQgd2lsbCBiZSBUd2l0dGVyIEluYy4gQ0ROXG4gICAgICBiYXNlOiAnaHR0cHM6Ly90d2Vtb2ppLm1heGNkbi5jb20vdi8xMy4wLjEvJyxcblxuICAgICAgLy8gZGVmYXVsdCBhc3NldHMgZmlsZSBleHRlbnNpb25zLCBieSBkZWZhdWx0ICcucG5nJ1xuICAgICAgZXh0OiAnLnBuZycsXG5cbiAgICAgIC8vIGRlZmF1bHQgYXNzZXRzL2ZvbGRlciBzaXplLCBieSBkZWZhdWx0IFwiNzJ4NzJcIlxuICAgICAgLy8gYXZhaWxhYmxlIHZpYSBUd2l0dGVyIENETjogNzJcbiAgICAgIHNpemU6ICc3Mng3MicsXG5cbiAgICAgIC8vIGRlZmF1bHQgY2xhc3MgbmFtZSwgYnkgZGVmYXVsdCAnZW1vamknXG4gICAgICBjbGFzc05hbWU6ICdlbW9qaScsXG5cbiAgICAgIC8vIGJhc2ljIHV0aWxpdGllcyAvIGhlbHBlcnMgdG8gY29udmVydCBjb2RlIHBvaW50c1xuICAgICAgLy8gdG8gSmF2YVNjcmlwdCBzdXJyb2dhdGVzIGFuZCB2aWNlIHZlcnNhXG4gICAgICBjb252ZXJ0OiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdpdmVuIGFuIEhFWCBjb2RlcG9pbnQsIHJldHVybnMgVVRGMTYgc3Vycm9nYXRlIHBhaXJzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gICBzdHJpbmcgIGdlbmVyaWMgY29kZXBvaW50LCBpLmUuICcxRjRBOSdcbiAgICAgICAgICogQHJldHVybiAgc3RyaW5nICBjb2RlcG9pbnQgdHJhbnNmb3JtZWQgaW50byB1dGYxNiBzdXJyb2dhdGVzIHBhaXIsXG4gICAgICAgICAqICAgICAgICAgIGkuZS4gXFx1RDgzRFxcdURDQTlcbiAgICAgICAgICpcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogIHR3ZW1vamkuY29udmVydC5mcm9tQ29kZVBvaW50KCcxZjFlOCcpO1xuICAgICAgICAgKiAgLy8gXCJcXHVkODNjXFx1ZGRlOFwiXG4gICAgICAgICAqXG4gICAgICAgICAqICAnMWYxZTgtMWYxZjMnLnNwbGl0KCctJykubWFwKHR3ZW1vamkuY29udmVydC5mcm9tQ29kZVBvaW50KS5qb2luKCcnKVxuICAgICAgICAgKiAgLy8gXCJcXHVkODNjXFx1ZGRlOFxcdWQ4M2NcXHVkZGYzXCJcbiAgICAgICAgICovXG4gICAgICAgIGZyb21Db2RlUG9pbnQ6IGZyb21Db2RlUG9pbnQsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdpdmVuIFVURjE2IHN1cnJvZ2F0ZSBwYWlycywgcmV0dXJucyB0aGUgZXF1aXZhbGVudCBIRVggY29kZXBvaW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gICBzdHJpbmcgIGdlbmVyaWMgdXRmMTYgc3Vycm9nYXRlcyBwYWlyLCBpLmUuIFxcdUQ4M0RcXHVEQ0E5XG4gICAgICAgICAqIEBwYXJhbSAgIHN0cmluZyAgb3B0aW9uYWwgc2VwYXJhdG9yIGZvciBkb3VibGUgY29kZSBwb2ludHMsIGRlZmF1bHQ9Jy0nXG4gICAgICAgICAqIEByZXR1cm4gIHN0cmluZyAgdXRmMTYgdHJhbnNmb3JtZWQgaW50byBjb2RlcG9pbnQsIGkuZS4gJzFGNEE5J1xuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgdHdlbW9qaS5jb252ZXJ0LnRvQ29kZVBvaW50KCdcXHVkODNjXFx1ZGRlOFxcdWQ4M2NcXHVkZGYzJyk7XG4gICAgICAgICAqICAvLyBcIjFmMWU4LTFmMWYzXCJcbiAgICAgICAgICpcbiAgICAgICAgICogIHR3ZW1vamkuY29udmVydC50b0NvZGVQb2ludCgnXFx1ZDgzY1xcdWRkZThcXHVkODNjXFx1ZGRmMycsICd+Jyk7XG4gICAgICAgICAqICAvLyBcIjFmMWU4fjFmMWYzXCJcbiAgICAgICAgICovXG4gICAgICAgIHRvQ29kZVBvaW50OiB0b0NvZGVQb2ludFxuICAgICAgfSxcblxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vICAgICAgIG1ldGhvZHMgICAgICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgIC8qKlxuICAgICAgICogVXNlciBmaXJzdDogdXNlZCB0byByZW1vdmUgbWlzc2luZyBpbWFnZXNcbiAgICAgICAqIHByZXNlcnZpbmcgdGhlIG9yaWdpbmFsIHRleHQgaW50ZW50IHdoZW5cbiAgICAgICAqIGEgZmFsbGJhY2sgZm9yIG5ldHdvcmsgcHJvYmxlbXMgaXMgZGVzaXJlZC5cbiAgICAgICAqIEF1dG9tYXRpY2FsbHkgYWRkZWQgdG8gSW1hZ2Ugbm9kZXMgdmlhIERPTVxuICAgICAgICogSXQgY291bGQgYmUgcmVjeWNsZWQgZm9yIHN0cmluZyBvcGVyYXRpb25zIHZpYTpcbiAgICAgICAqICAkKCdpbWcuZW1vamknKS5vbignZXJyb3InLCB0d2Vtb2ppLm9uZXJyb3IpXG4gICAgICAgKi9cbiAgICAgIG9uZXJyb3I6IGZ1bmN0aW9uIG9uZXJyb3IoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNyZWF0ZVRleHQodGhpcy5hbHQsIGZhbHNlKSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogTWFpbiBtZXRob2QvbG9naWMgdG8gZ2VuZXJhdGUgZWl0aGVyIDxpbWc+IHRhZ3Mgb3IgSFRNTEltYWdlIG5vZGVzLlxuICAgICAgICogIFwiZW1vamlmeVwiIGEgZ2VuZXJpYyB0ZXh0IG9yIERPTSBFbGVtZW50LlxuICAgICAgICpcbiAgICAgICAqIEBvdmVybG9hZHNcbiAgICAgICAqXG4gICAgICAgKiBTdHJpbmcgcmVwbGFjZW1lbnQgZm9yIGBpbm5lckhUTUxgIG9yIHNlcnZlciBzaWRlIG9wZXJhdGlvbnNcbiAgICAgICAqICB0d2Vtb2ppLnBhcnNlKHN0cmluZyk7XG4gICAgICAgKiAgdHdlbW9qaS5wYXJzZShzdHJpbmcsIEZ1bmN0aW9uKTtcbiAgICAgICAqICB0d2Vtb2ppLnBhcnNlKHN0cmluZywgT2JqZWN0KTtcbiAgICAgICAqXG4gICAgICAgKiBIVE1MRWxlbWVudCB0cmVlIHBhcnNpbmcgZm9yIHNhZmVyIG9wZXJhdGlvbnMgb3ZlciBleGlzdGluZyBET01cbiAgICAgICAqICB0d2Vtb2ppLnBhcnNlKEhUTUxFbGVtZW50KTtcbiAgICAgICAqICB0d2Vtb2ppLnBhcnNlKEhUTUxFbGVtZW50LCBGdW5jdGlvbik7XG4gICAgICAgKiAgdHdlbW9qaS5wYXJzZShIVE1MRWxlbWVudCwgT2JqZWN0KTtcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gICBzdHJpbmd8SFRNTEVsZW1lbnQgIHRoZSBzb3VyY2UgdG8gcGFyc2UgYW5kIGVucmljaCB3aXRoIGVtb2ppLlxuICAgICAgICpcbiAgICAgICAqICAgICAgICAgIHN0cmluZyAgICAgICAgICAgICAgcmVwbGFjZSBlbW9qaSBtYXRjaGVzIHdpdGggPGltZz4gdGFncy5cbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFpbmx5IHVzZWQgdG8gaW5qZWN0IGVtb2ppIHZpYSBgaW5uZXJIVE1MYFxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJdCBkb2VzICoqbm90KiogcGFyc2UgdGhlIHN0cmluZyBvciB2YWxpZGF0ZSBpdCxcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXQgc2ltcGx5IHJlcGxhY2VzIGZvdW5kIGVtb2ppIHdpdGggYSB0YWcuXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5PVEU6IGJlIHN1cmUgdGhpcyB3b24ndCBhZmZlY3Qgc2VjdXJpdHkuXG4gICAgICAgKlxuICAgICAgICogICAgICAgICAgSFRNTEVsZW1lbnQgICAgICAgICB3YWxrIHRocm91Z2ggdGhlIERPTSB0cmVlIGFuZCBmaW5kIGVtb2ppXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgYXJlIGluc2lkZSAqKnRleHQgbm9kZSBvbmx5KiogKG5vZGVUeXBlID09PSAzKVxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYWlubHkgdXNlZCB0byBwdXQgZW1vamkgaW4gYWxyZWFkeSBnZW5lcmF0ZWQgRE9NXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhvdXQgY29tcHJvbWlzaW5nIHN1cnJvdW5kaW5nIG5vZGVzIGFuZFxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqKmF2b2lkaW5nKiogdGhlIHVzYWdlIG9mIGBpbm5lckhUTUxgLlxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOT1RFOiBVc2luZyBET00gZWxlbWVudHMgaW5zdGVhZCBvZiBzdHJpbmdzIHNob3VsZFxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbXByb3ZlIHNlY3VyaXR5IHdpdGhvdXQgY29tcHJvbWlzaW5nIHRvbyBtdWNoXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlIGNvbXBhcmVkIHdpdGggYSBsZXNzIHNhZmUgYGlubmVySFRNTGAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtICAgRnVuY3Rpb258T2JqZWN0ICBbb3B0aW9uYWxdXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVpdGhlciB0aGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgb3IgYW4gb2JqZWN0XG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYWxsIHByb3BlcnRpZXMgdG8gdXNlIHBlciBlYWNoIGZvdW5kIGVtb2ppLlxuICAgICAgICpcbiAgICAgICAqICAgICAgICAgIEZ1bmN0aW9uICAgICAgICAgICAgaWYgc3BlY2lmaWVkLCB0aGlzIHdpbGwgYmUgaW52b2tlZCBwZXIgZWFjaCBlbW9qaVxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0IGhhcyBiZWVuIGZvdW5kIHRocm91Z2ggdGhlIFJlZ0V4cCBleGNlcHRcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhvc2UgZm9sbHdlZCBieSB0aGUgaW52YXJpYW50IFxcdUZFMEUgKFwiYXMgdGV4dFwiKS5cbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT25jZSBpbnZva2VkLCBwYXJhbWV0ZXJzIHdpbGwgYmU6XG4gICAgICAgKlxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25JZDpzdHJpbmcgICAgIHRoZSBsb3dlciBjYXNlIEhFWCBjb2RlIHBvaW50XG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaS5lLiBcIjFmNGE5XCJcbiAgICAgICAqXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczpPYmplY3QgICAgYWxsIGluZm8gZm9yIHRoaXMgcGFyc2luZyBvcGVyYXRpb25cbiAgICAgICAqXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudDpjaGFyICAgICAgdGhlIG9wdGlvbmFsIFxcdUZFMEYgKFwiYXMgaW1hZ2VcIilcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50LCBpbiBjYXNlIHRoaXMgaW5mb1xuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGFueWhvdyBtZWFuaW5nZnVsLlxuICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ5IGRlZmF1bHQgdGhpcyBpcyBpZ25vcmVkLlxuICAgICAgICpcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgc3VjaCBjYWxsYmFjayB3aWxsIHJldHVybiBhIGZhbHN5IHZhbHVlIGluc3RlYWRcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgYSB2YWxpZCBgc3JjYCB0byB1c2UgZm9yIHRoZSBpbWFnZSwgbm90aGluZyB3aWxsXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbGx5IGNoYW5nZSBmb3IgdGhhdCBzcGVjaWZpYyBlbW9qaS5cbiAgICAgICAqXG4gICAgICAgKlxuICAgICAgICogICAgICAgICAgT2JqZWN0ICAgICAgICAgICAgICBpZiBzcGVjaWZpZWQsIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllc1xuICAgICAgICpcbiAgICAgICAqICAgICAgICAgICAgY2FsbGJhY2sgICBGdW5jdGlvbiAgdGhlIGNhbGxiYWNrIHRvIGludm9rZSBwZXIgZWFjaCBmb3VuZCBlbW9qaS5cbiAgICAgICAqICAgICAgICAgICAgYmFzZSAgICAgICBzdHJpbmcgICAgdGhlIGJhc2UgdXJsLCBieSBkZWZhdWx0IHR3ZW1vamkuYmFzZVxuICAgICAgICogICAgICAgICAgICBleHQgICAgICAgIHN0cmluZyAgICB0aGUgaW1hZ2UgZXh0ZW5zaW9uLCBieSBkZWZhdWx0IHR3ZW1vamkuZXh0XG4gICAgICAgKiAgICAgICAgICAgIHNpemUgICAgICAgc3RyaW5nICAgIHRoZSBhc3NldHMgc2l6ZSwgYnkgZGVmYXVsdCB0d2Vtb2ppLnNpemVcbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICpcbiAgICAgICAqICB0d2Vtb2ppLnBhcnNlKFwiSSBcXHUyNzY0XFx1RkUwRiBlbW9qaSFcIik7XG4gICAgICAgKiAgLy8gSSA8aW1nIGNsYXNzPVwiZW1vamlcIiBkcmFnZ2FibGU9XCJmYWxzZVwiIGFsdD1cIuKdpO+4j1wiIHNyYz1cIi9hc3NldHMvMjc2NC5naWZcIi8+IGVtb2ppIVxuICAgICAgICpcbiAgICAgICAqXG4gICAgICAgKiAgdHdlbW9qaS5wYXJzZShcIkkgXFx1Mjc2NFxcdUZFMEYgZW1vamkhXCIsIGZ1bmN0aW9uKGljb25JZCwgb3B0aW9ucykge1xuICAgICAgICogICAgcmV0dXJuICcvYXNzZXRzLycgKyBpY29uSWQgKyAnLmdpZic7XG4gICAgICAgKiAgfSk7XG4gICAgICAgKiAgLy8gSSA8aW1nIGNsYXNzPVwiZW1vamlcIiBkcmFnZ2FibGU9XCJmYWxzZVwiIGFsdD1cIuKdpO+4j1wiIHNyYz1cIi9hc3NldHMvMjc2NC5naWZcIi8+IGVtb2ppIVxuICAgICAgICpcbiAgICAgICAqXG4gICAgICAgKiB0d2Vtb2ppLnBhcnNlKFwiSSBcXHUyNzY0XFx1RkUwRiBlbW9qaSFcIiwge1xuICAgICAgICogICBzaXplOiA3MixcbiAgICAgICAqICAgY2FsbGJhY2s6IGZ1bmN0aW9uKGljb25JZCwgb3B0aW9ucykge1xuICAgICAgICogICAgIHJldHVybiAnL2Fzc2V0cy8nICsgb3B0aW9ucy5zaXplICsgJy8nICsgaWNvbklkICsgb3B0aW9ucy5leHQ7XG4gICAgICAgKiAgIH1cbiAgICAgICAqIH0pO1xuICAgICAgICogIC8vIEkgPGltZyBjbGFzcz1cImVtb2ppXCIgZHJhZ2dhYmxlPVwiZmFsc2VcIiBhbHQ9XCLinaTvuI9cIiBzcmM9XCIvYXNzZXRzLzcyeDcyLzI3NjQucG5nXCIvPiBlbW9qaSFcbiAgICAgICAqXG4gICAgICAgKi9cbiAgICAgIHBhcnNlOiBwYXJzZSxcblxuICAgICAgLyoqXG4gICAgICAgKiBHaXZlbiBhIHN0cmluZywgaW52b2tlcyB0aGUgY2FsbGJhY2sgYXJndW1lbnRcbiAgICAgICAqICBwZXIgZWFjaCBlbW9qaSBmb3VuZCBpbiBzdWNoIHN0cmluZy5cbiAgICAgICAqIFRoaXMgaXMgdGhlIG1vc3QgcmF3IHZlcnNpb24gdXNlZCBieVxuICAgICAgICogIHRoZSAucGFyc2Uoc3RyaW5nKSBtZXRob2QgaXRzZWxmLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSAgIHN0cmluZyAgICBnZW5lcmljIHN0cmluZyB0byBwYXJzZVxuICAgICAgICogQHBhcmFtICAgRnVuY3Rpb24gIGEgZ2VuZXJpYyBjYWxsYmFjayB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICAgICAgICAgICAgICBpbnZva2VkIHRvIHJlcGxhY2UgdGhlIGNvbnRlbnQuXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgVGhpcyBjYWxiYWNrIHdpbCByZWNlaXZlIHN0YW5kYXJkXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKHN0ciwgY2FsbGJhY2spXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzIHN1Y2g6XG4gICAgICAgKiAgY2FsbGJhY2soXG4gICAgICAgKiAgICByYXdUZXh0LCAgLy8gdGhlIGVtb2ppIG1hdGNoXG4gICAgICAgKiAgKTtcbiAgICAgICAqXG4gICAgICAgKiAgICAgICAgICAgICAgICAgICAgYW5kIG90aGVycyBjb21tb25seSByZWNlaXZlZCB2aWEgcmVwbGFjZS5cbiAgICAgICAqL1xuICAgICAgcmVwbGFjZTogcmVwbGFjZSxcblxuICAgICAgLyoqXG4gICAgICAgKiBTaW1wbGlmeSBzdHJpbmcgdGVzdHMgYWdhaW5zdCBlbW9qaS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gICBzdHJpbmcgIHNvbWUgdGV4dCB0aGF0IG1pZ2h0IGNvbnRhaW4gZW1vamlcbiAgICAgICAqIEByZXR1cm4gIGJvb2xlYW4gdHJ1ZSBpZiBhbnkgZW1vamkgd2FzIGZvdW5kLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqXG4gICAgICAgKiAgaWYgKHR3ZW1vamkudGVzdChzb21lQ29udGVudCkpIHtcbiAgICAgICAqICAgIGNvbnNvbGUubG9nKFwiZW1vamkgQWxsIFRoZSBUaGluZ3MhXCIpO1xuICAgICAgICogIH1cbiAgICAgICAqL1xuICAgICAgdGVzdDogdGVzdFxuICAgIH0sXG5cbiAgICAvLyB1c2VkIHRvIGVzY2FwZSBIVE1MIHNwZWNpYWwgY2hhcnMgaW4gYXR0cmlidXRlc1xuICAgIGVzY2FwZXIgPSB7XG4gICAgICAnJic6ICcmYW1wOycsXG4gICAgICAnPCc6ICcmbHQ7JyxcbiAgICAgICc+JzogJyZndDsnLFxuICAgICAgXCInXCI6ICcmIzM5OycsXG4gICAgICAnXCInOiAnJnF1b3Q7J1xuICAgIH0sXG5cbiAgICAvLyBSZWdFeHAgYmFzZWQgb24gZW1vamkncyBvZmZpY2lhbCBVbmljb2RlIHN0YW5kYXJkc1xuICAgIC8vIGh0dHA6Ly93d3cudW5pY29kZS5vcmcvUHVibGljL1VOSURBVEEvRW1vamlTb3VyY2VzLnR4dFxuICAgIHJlID0gLyg/OlxcdWQ4M2RcXHVkYzY4XFx1ZDgzY1xcdWRmZmJcXHUyMDBkXFx1ZDgzZVxcdWRkMWRcXHUyMDBkXFx1ZDgzZFxcdWRjNjhcXHVkODNjW1xcdWRmZmMtXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjhcXHVkODNjXFx1ZGZmY1xcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OFxcdWQ4M2NbXFx1ZGZmYlxcdWRmZmQtXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjhcXHVkODNjXFx1ZGZmZFxcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OFxcdWQ4M2NbXFx1ZGZmYlxcdWRmZmNcXHVkZmZlXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjhcXHVkODNjXFx1ZGZmZVxcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OFxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZkXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjhcXHVkODNjXFx1ZGZmZlxcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OFxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZlXXxcXHVkODNkXFx1ZGM2OVxcdWQ4M2NcXHVkZmZiXFx1MjAwZFxcdWQ4M2VcXHVkZDFkXFx1MjAwZFxcdWQ4M2RcXHVkYzY4XFx1ZDgzY1tcXHVkZmZjLVxcdWRmZmZdfFxcdWQ4M2RcXHVkYzY5XFx1ZDgzY1xcdWRmZmJcXHUyMDBkXFx1ZDgzZVxcdWRkMWRcXHUyMDBkXFx1ZDgzZFxcdWRjNjlcXHVkODNjW1xcdWRmZmMtXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjlcXHVkODNjXFx1ZGZmY1xcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OFxcdWQ4M2NbXFx1ZGZmYlxcdWRmZmQtXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjlcXHVkODNjXFx1ZGZmY1xcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OVxcdWQ4M2NbXFx1ZGZmYlxcdWRmZmQtXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjlcXHVkODNjXFx1ZGZmZFxcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OFxcdWQ4M2NbXFx1ZGZmYlxcdWRmZmNcXHVkZmZlXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjlcXHVkODNjXFx1ZGZmZFxcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OVxcdWQ4M2NbXFx1ZGZmYlxcdWRmZmNcXHVkZmZlXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjlcXHVkODNjXFx1ZGZmZVxcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OFxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZkXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjlcXHVkODNjXFx1ZGZmZVxcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OVxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZkXFx1ZGZmZl18XFx1ZDgzZFxcdWRjNjlcXHVkODNjXFx1ZGZmZlxcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNkXFx1ZGM2OFxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZlXXxcXHVkODNkXFx1ZGM2OVxcdWQ4M2NcXHVkZmZmXFx1MjAwZFxcdWQ4M2VcXHVkZDFkXFx1MjAwZFxcdWQ4M2RcXHVkYzY5XFx1ZDgzY1tcXHVkZmZiLVxcdWRmZmVdfFxcdWQ4M2VcXHVkZGQxXFx1ZDgzY1xcdWRmZmJcXHUyMDBkXFx1ZDgzZVxcdWRkMWRcXHUyMDBkXFx1ZDgzZVxcdWRkZDFcXHVkODNjW1xcdWRmZmItXFx1ZGZmZl18XFx1ZDgzZVxcdWRkZDFcXHVkODNjXFx1ZGZmY1xcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNlXFx1ZGRkMVxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXXxcXHVkODNlXFx1ZGRkMVxcdWQ4M2NcXHVkZmZkXFx1MjAwZFxcdWQ4M2VcXHVkZDFkXFx1MjAwZFxcdWQ4M2VcXHVkZGQxXFx1ZDgzY1tcXHVkZmZiLVxcdWRmZmZdfFxcdWQ4M2VcXHVkZGQxXFx1ZDgzY1xcdWRmZmVcXHUyMDBkXFx1ZDgzZVxcdWRkMWRcXHUyMDBkXFx1ZDgzZVxcdWRkZDFcXHVkODNjW1xcdWRmZmItXFx1ZGZmZl18XFx1ZDgzZVxcdWRkZDFcXHVkODNjXFx1ZGZmZlxcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNlXFx1ZGRkMVxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXXxcXHVkODNlXFx1ZGRkMVxcdTIwMGRcXHVkODNlXFx1ZGQxZFxcdTIwMGRcXHVkODNlXFx1ZGRkMXxcXHVkODNkXFx1ZGM2YlxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXXxcXHVkODNkXFx1ZGM2Y1xcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXXxcXHVkODNkXFx1ZGM2ZFxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXXxcXHVkODNkW1xcdWRjNmItXFx1ZGM2ZF0pfCg/OlxcdWQ4M2RbXFx1ZGM2OFxcdWRjNjldfFxcdWQ4M2VcXHVkZGQxKSg/OlxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXSk/XFx1MjAwZCg/OlxcdTI2OTVcXHVmZTBmfFxcdTI2OTZcXHVmZTBmfFxcdTI3MDhcXHVmZTBmfFxcdWQ4M2NbXFx1ZGYzZVxcdWRmNzNcXHVkZjdjXFx1ZGY4NFxcdWRmOTNcXHVkZmE0XFx1ZGZhOFxcdWRmZWJcXHVkZmVkXXxcXHVkODNkW1xcdWRjYmJcXHVkY2JjXFx1ZGQyN1xcdWRkMmNcXHVkZTgwXFx1ZGU5Ml18XFx1ZDgzZVtcXHVkZGFmLVxcdWRkYjNcXHVkZGJjXFx1ZGRiZF0pfCg/OlxcdWQ4M2NbXFx1ZGZjYlxcdWRmY2NdfFxcdWQ4M2RbXFx1ZGQ3NFxcdWRkNzVdfFxcdTI2ZjkpKCg/OlxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXXxcXHVmZTBmKVxcdTIwMGRbXFx1MjY0MFxcdTI2NDJdXFx1ZmUwZil8KD86XFx1ZDgzY1tcXHVkZmMzXFx1ZGZjNFxcdWRmY2FdfFxcdWQ4M2RbXFx1ZGM2ZVxcdWRjNzBcXHVkYzcxXFx1ZGM3M1xcdWRjNzdcXHVkYzgxXFx1ZGM4MlxcdWRjODZcXHVkYzg3XFx1ZGU0NS1cXHVkZTQ3XFx1ZGU0YlxcdWRlNGRcXHVkZTRlXFx1ZGVhM1xcdWRlYjQtXFx1ZGViNl18XFx1ZDgzZVtcXHVkZDI2XFx1ZGQzNVxcdWRkMzctXFx1ZGQzOVxcdWRkM2RcXHVkZDNlXFx1ZGRiOFxcdWRkYjlcXHVkZGNkLVxcdWRkY2ZcXHVkZGQ2LVxcdWRkZGRdKSg/OlxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXSk/XFx1MjAwZFtcXHUyNjQwXFx1MjY0Ml1cXHVmZTBmfCg/OlxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdTI3NjRcXHVmZTBmXFx1MjAwZFxcdWQ4M2RcXHVkYzhiXFx1MjAwZFxcdWQ4M2RcXHVkYzY4fFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RcXHVkYzY2XFx1MjAwZFxcdWQ4M2RcXHVkYzY2fFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RcXHVkYzY3XFx1MjAwZFxcdWQ4M2RbXFx1ZGM2NlxcdWRjNjddfFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RcXHVkYzY2XFx1MjAwZFxcdWQ4M2RcXHVkYzY2fFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RcXHVkYzY3XFx1MjAwZFxcdWQ4M2RbXFx1ZGM2NlxcdWRjNjddfFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdTI3NjRcXHVmZTBmXFx1MjAwZFxcdWQ4M2RcXHVkYzhiXFx1MjAwZFxcdWQ4M2RbXFx1ZGM2OFxcdWRjNjldfFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RcXHVkYzY2XFx1MjAwZFxcdWQ4M2RcXHVkYzY2fFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RcXHVkYzY3XFx1MjAwZFxcdWQ4M2RbXFx1ZGM2NlxcdWRjNjddfFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdTI3NjRcXHVmZTBmXFx1MjAwZFxcdWQ4M2RcXHVkYzY4fFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RcXHVkYzY2XFx1MjAwZFxcdWQ4M2RcXHVkYzY2fFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RcXHVkYzY3XFx1MjAwZFxcdWQ4M2RbXFx1ZGM2NlxcdWRjNjddfFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RbXFx1ZGM2NlxcdWRjNjddfFxcdWQ4M2RcXHVkYzY4XFx1MjAwZFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RbXFx1ZGM2NlxcdWRjNjddfFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdTI3NjRcXHVmZTBmXFx1MjAwZFxcdWQ4M2RbXFx1ZGM2OFxcdWRjNjldfFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RcXHVkYzY2XFx1MjAwZFxcdWQ4M2RcXHVkYzY2fFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RcXHVkYzY3XFx1MjAwZFxcdWQ4M2RbXFx1ZGM2NlxcdWRjNjddfFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RcXHVkYzY5XFx1MjAwZFxcdWQ4M2RbXFx1ZGM2NlxcdWRjNjddfFxcdWQ4M2NcXHVkZmYzXFx1ZmUwZlxcdTIwMGRcXHUyNmE3XFx1ZmUwZnxcXHVkODNjXFx1ZGZmM1xcdWZlMGZcXHUyMDBkXFx1ZDgzY1xcdWRmMDh8XFx1ZDgzY1xcdWRmZjRcXHUyMDBkXFx1MjYyMFxcdWZlMGZ8XFx1ZDgzZFxcdWRjMTVcXHUyMDBkXFx1ZDgzZVxcdWRkYmF8XFx1ZDgzZFxcdWRjM2JcXHUyMDBkXFx1Mjc0NFxcdWZlMGZ8XFx1ZDgzZFxcdWRjNDFcXHUyMDBkXFx1ZDgzZFxcdWRkZTh8XFx1ZDgzZFxcdWRjNjhcXHUyMDBkXFx1ZDgzZFtcXHVkYzY2XFx1ZGM2N118XFx1ZDgzZFxcdWRjNjlcXHUyMDBkXFx1ZDgzZFtcXHVkYzY2XFx1ZGM2N118XFx1ZDgzZFxcdWRjNmZcXHUyMDBkXFx1MjY0MFxcdWZlMGZ8XFx1ZDgzZFxcdWRjNmZcXHUyMDBkXFx1MjY0MlxcdWZlMGZ8XFx1ZDgzZVxcdWRkM2NcXHUyMDBkXFx1MjY0MFxcdWZlMGZ8XFx1ZDgzZVxcdWRkM2NcXHUyMDBkXFx1MjY0MlxcdWZlMGZ8XFx1ZDgzZVxcdWRkZGVcXHUyMDBkXFx1MjY0MFxcdWZlMGZ8XFx1ZDgzZVxcdWRkZGVcXHUyMDBkXFx1MjY0MlxcdWZlMGZ8XFx1ZDgzZVxcdWRkZGZcXHUyMDBkXFx1MjY0MFxcdWZlMGZ8XFx1ZDgzZVxcdWRkZGZcXHUyMDBkXFx1MjY0MlxcdWZlMGZ8XFx1ZDgzZFxcdWRjMDhcXHUyMDBkXFx1MmIxYil8WyMqMC05XVxcdWZlMGY/XFx1MjBlM3woPzpbwqnCrlxcdTIxMjJcXHUyNjVmXVxcdWZlMGYpfCg/OlxcdWQ4M2NbXFx1ZGMwNFxcdWRkNzBcXHVkZDcxXFx1ZGQ3ZVxcdWRkN2ZcXHVkZTAyXFx1ZGUxYVxcdWRlMmZcXHVkZTM3XFx1ZGYyMVxcdWRmMjQtXFx1ZGYyY1xcdWRmMzZcXHVkZjdkXFx1ZGY5NlxcdWRmOTdcXHVkZjk5LVxcdWRmOWJcXHVkZjllXFx1ZGY5ZlxcdWRmY2RcXHVkZmNlXFx1ZGZkNC1cXHVkZmRmXFx1ZGZmM1xcdWRmZjVcXHVkZmY3XXxcXHVkODNkW1xcdWRjM2ZcXHVkYzQxXFx1ZGNmZFxcdWRkNDlcXHVkZDRhXFx1ZGQ2ZlxcdWRkNzBcXHVkZDczXFx1ZGQ3Ni1cXHVkZDc5XFx1ZGQ4N1xcdWRkOGEtXFx1ZGQ4ZFxcdWRkYTVcXHVkZGE4XFx1ZGRiMVxcdWRkYjJcXHVkZGJjXFx1ZGRjMi1cXHVkZGM0XFx1ZGRkMS1cXHVkZGQzXFx1ZGRkYy1cXHVkZGRlXFx1ZGRlMVxcdWRkZTNcXHVkZGU4XFx1ZGRlZlxcdWRkZjNcXHVkZGZhXFx1ZGVjYlxcdWRlY2QtXFx1ZGVjZlxcdWRlZTAtXFx1ZGVlNVxcdWRlZTlcXHVkZWYwXFx1ZGVmM118W1xcdTIwM2NcXHUyMDQ5XFx1MjEzOVxcdTIxOTQtXFx1MjE5OVxcdTIxYTlcXHUyMWFhXFx1MjMxYVxcdTIzMWJcXHUyMzI4XFx1MjNjZlxcdTIzZWQtXFx1MjNlZlxcdTIzZjFcXHUyM2YyXFx1MjNmOC1cXHUyM2ZhXFx1MjRjMlxcdTI1YWFcXHUyNWFiXFx1MjViNlxcdTI1YzBcXHUyNWZiLVxcdTI1ZmVcXHUyNjAwLVxcdTI2MDRcXHUyNjBlXFx1MjYxMVxcdTI2MTRcXHUyNjE1XFx1MjYxOFxcdTI2MjBcXHUyNjIyXFx1MjYyM1xcdTI2MjZcXHUyNjJhXFx1MjYyZVxcdTI2MmZcXHUyNjM4LVxcdTI2M2FcXHUyNjQwXFx1MjY0MlxcdTI2NDgtXFx1MjY1M1xcdTI2NjBcXHUyNjYzXFx1MjY2NVxcdTI2NjZcXHUyNjY4XFx1MjY3YlxcdTI2N2ZcXHUyNjkyLVxcdTI2OTdcXHUyNjk5XFx1MjY5YlxcdTI2OWNcXHUyNmEwXFx1MjZhMVxcdTI2YTdcXHUyNmFhXFx1MjZhYlxcdTI2YjBcXHUyNmIxXFx1MjZiZFxcdTI2YmVcXHUyNmM0XFx1MjZjNVxcdTI2YzhcXHUyNmNmXFx1MjZkMVxcdTI2ZDNcXHUyNmQ0XFx1MjZlOVxcdTI2ZWFcXHUyNmYwLVxcdTI2ZjVcXHUyNmY4XFx1MjZmYVxcdTI2ZmRcXHUyNzAyXFx1MjcwOFxcdTI3MDlcXHUyNzBmXFx1MjcxMlxcdTI3MTRcXHUyNzE2XFx1MjcxZFxcdTI3MjFcXHUyNzMzXFx1MjczNFxcdTI3NDRcXHUyNzQ3XFx1Mjc1N1xcdTI3NjNcXHUyNzY0XFx1MjdhMVxcdTI5MzRcXHUyOTM1XFx1MmIwNS1cXHUyYjA3XFx1MmIxYlxcdTJiMWNcXHUyYjUwXFx1MmI1NVxcdTMwMzBcXHUzMDNkXFx1MzI5N1xcdTMyOTldKSg/OlxcdWZlMGZ8KD8hXFx1ZmUwZSkpfCg/Oig/OlxcdWQ4M2NbXFx1ZGZjYlxcdWRmY2NdfFxcdWQ4M2RbXFx1ZGQ3NFxcdWRkNzVcXHVkZDkwXXxbXFx1MjYxZFxcdTI2ZjdcXHUyNmY5XFx1MjcwY1xcdTI3MGRdKSg/OlxcdWZlMGZ8KD8hXFx1ZmUwZSkpfCg/OlxcdWQ4M2NbXFx1ZGY4NVxcdWRmYzItXFx1ZGZjNFxcdWRmYzdcXHVkZmNhXXxcXHVkODNkW1xcdWRjNDJcXHVkYzQzXFx1ZGM0Ni1cXHVkYzUwXFx1ZGM2Ni1cXHVkYzY5XFx1ZGM2ZVxcdWRjNzAtXFx1ZGM3OFxcdWRjN2NcXHVkYzgxLVxcdWRjODNcXHVkYzg1LVxcdWRjODdcXHVkY2FhXFx1ZGQ3YVxcdWRkOTVcXHVkZDk2XFx1ZGU0NS1cXHVkZTQ3XFx1ZGU0Yi1cXHVkZTRmXFx1ZGVhM1xcdWRlYjQtXFx1ZGViNlxcdWRlYzBcXHVkZWNjXXxcXHVkODNlW1xcdWRkMGNcXHVkZDBmXFx1ZGQxOC1cXHVkZDFjXFx1ZGQxZVxcdWRkMWZcXHVkZDI2XFx1ZGQzMC1cXHVkZDM5XFx1ZGQzZFxcdWRkM2VcXHVkZDc3XFx1ZGRiNVxcdWRkYjZcXHVkZGI4XFx1ZGRiOVxcdWRkYmJcXHVkZGNkLVxcdWRkY2ZcXHVkZGQxLVxcdWRkZGRdfFtcXHUyNzBhXFx1MjcwYl0pKSg/OlxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXSk/fCg/OlxcdWQ4M2NcXHVkZmY0XFx1ZGI0MFxcdWRjNjdcXHVkYjQwXFx1ZGM2MlxcdWRiNDBcXHVkYzY1XFx1ZGI0MFxcdWRjNmVcXHVkYjQwXFx1ZGM2N1xcdWRiNDBcXHVkYzdmfFxcdWQ4M2NcXHVkZmY0XFx1ZGI0MFxcdWRjNjdcXHVkYjQwXFx1ZGM2MlxcdWRiNDBcXHVkYzczXFx1ZGI0MFxcdWRjNjNcXHVkYjQwXFx1ZGM3NFxcdWRiNDBcXHVkYzdmfFxcdWQ4M2NcXHVkZmY0XFx1ZGI0MFxcdWRjNjdcXHVkYjQwXFx1ZGM2MlxcdWRiNDBcXHVkYzc3XFx1ZGI0MFxcdWRjNmNcXHVkYjQwXFx1ZGM3M1xcdWRiNDBcXHVkYzdmfFxcdWQ4M2NcXHVkZGU2XFx1ZDgzY1tcXHVkZGU4LVxcdWRkZWNcXHVkZGVlXFx1ZGRmMVxcdWRkZjJcXHVkZGY0XFx1ZGRmNi1cXHVkZGZhXFx1ZGRmY1xcdWRkZmRcXHVkZGZmXXxcXHVkODNjXFx1ZGRlN1xcdWQ4M2NbXFx1ZGRlNlxcdWRkZTdcXHVkZGU5LVxcdWRkZWZcXHVkZGYxLVxcdWRkZjRcXHVkZGY2LVxcdWRkZjlcXHVkZGZiXFx1ZGRmY1xcdWRkZmVcXHVkZGZmXXxcXHVkODNjXFx1ZGRlOFxcdWQ4M2NbXFx1ZGRlNlxcdWRkZThcXHVkZGU5XFx1ZGRlYi1cXHVkZGVlXFx1ZGRmMC1cXHVkZGY1XFx1ZGRmN1xcdWRkZmEtXFx1ZGRmZl18XFx1ZDgzY1xcdWRkZTlcXHVkODNjW1xcdWRkZWFcXHVkZGVjXFx1ZGRlZlxcdWRkZjBcXHVkZGYyXFx1ZGRmNFxcdWRkZmZdfFxcdWQ4M2NcXHVkZGVhXFx1ZDgzY1tcXHVkZGU2XFx1ZGRlOFxcdWRkZWFcXHVkZGVjXFx1ZGRlZFxcdWRkZjctXFx1ZGRmYV18XFx1ZDgzY1xcdWRkZWJcXHVkODNjW1xcdWRkZWUtXFx1ZGRmMFxcdWRkZjJcXHVkZGY0XFx1ZGRmN118XFx1ZDgzY1xcdWRkZWNcXHVkODNjW1xcdWRkZTZcXHVkZGU3XFx1ZGRlOS1cXHVkZGVlXFx1ZGRmMS1cXHVkZGYzXFx1ZGRmNS1cXHVkZGZhXFx1ZGRmY1xcdWRkZmVdfFxcdWQ4M2NcXHVkZGVkXFx1ZDgzY1tcXHVkZGYwXFx1ZGRmMlxcdWRkZjNcXHVkZGY3XFx1ZGRmOVxcdWRkZmFdfFxcdWQ4M2NcXHVkZGVlXFx1ZDgzY1tcXHVkZGU4LVxcdWRkZWFcXHVkZGYxLVxcdWRkZjRcXHVkZGY2LVxcdWRkZjldfFxcdWQ4M2NcXHVkZGVmXFx1ZDgzY1tcXHVkZGVhXFx1ZGRmMlxcdWRkZjRcXHVkZGY1XXxcXHVkODNjXFx1ZGRmMFxcdWQ4M2NbXFx1ZGRlYVxcdWRkZWMtXFx1ZGRlZVxcdWRkZjJcXHVkZGYzXFx1ZGRmNVxcdWRkZjdcXHVkZGZjXFx1ZGRmZVxcdWRkZmZdfFxcdWQ4M2NcXHVkZGYxXFx1ZDgzY1tcXHVkZGU2LVxcdWRkZThcXHVkZGVlXFx1ZGRmMFxcdWRkZjctXFx1ZGRmYlxcdWRkZmVdfFxcdWQ4M2NcXHVkZGYyXFx1ZDgzY1tcXHVkZGU2XFx1ZGRlOC1cXHVkZGVkXFx1ZGRmMC1cXHVkZGZmXXxcXHVkODNjXFx1ZGRmM1xcdWQ4M2NbXFx1ZGRlNlxcdWRkZThcXHVkZGVhLVxcdWRkZWNcXHVkZGVlXFx1ZGRmMVxcdWRkZjRcXHVkZGY1XFx1ZGRmN1xcdWRkZmFcXHVkZGZmXXxcXHVkODNjXFx1ZGRmNFxcdWQ4M2NcXHVkZGYyfFxcdWQ4M2NcXHVkZGY1XFx1ZDgzY1tcXHVkZGU2XFx1ZGRlYS1cXHVkZGVkXFx1ZGRmMC1cXHVkZGYzXFx1ZGRmNy1cXHVkZGY5XFx1ZGRmY1xcdWRkZmVdfFxcdWQ4M2NcXHVkZGY2XFx1ZDgzY1xcdWRkZTZ8XFx1ZDgzY1xcdWRkZjdcXHVkODNjW1xcdWRkZWFcXHVkZGY0XFx1ZGRmOFxcdWRkZmFcXHVkZGZjXXxcXHVkODNjXFx1ZGRmOFxcdWQ4M2NbXFx1ZGRlNi1cXHVkZGVhXFx1ZGRlYy1cXHVkZGY0XFx1ZGRmNy1cXHVkZGY5XFx1ZGRmYlxcdWRkZmQtXFx1ZGRmZl18XFx1ZDgzY1xcdWRkZjlcXHVkODNjW1xcdWRkZTZcXHVkZGU4XFx1ZGRlOVxcdWRkZWItXFx1ZGRlZFxcdWRkZWYtXFx1ZGRmNFxcdWRkZjdcXHVkZGY5XFx1ZGRmYlxcdWRkZmNcXHVkZGZmXXxcXHVkODNjXFx1ZGRmYVxcdWQ4M2NbXFx1ZGRlNlxcdWRkZWNcXHVkZGYyXFx1ZGRmM1xcdWRkZjhcXHVkZGZlXFx1ZGRmZl18XFx1ZDgzY1xcdWRkZmJcXHVkODNjW1xcdWRkZTZcXHVkZGU4XFx1ZGRlYVxcdWRkZWNcXHVkZGVlXFx1ZGRmM1xcdWRkZmFdfFxcdWQ4M2NcXHVkZGZjXFx1ZDgzY1tcXHVkZGViXFx1ZGRmOF18XFx1ZDgzY1xcdWRkZmRcXHVkODNjXFx1ZGRmMHxcXHVkODNjXFx1ZGRmZVxcdWQ4M2NbXFx1ZGRlYVxcdWRkZjldfFxcdWQ4M2NcXHVkZGZmXFx1ZDgzY1tcXHVkZGU2XFx1ZGRmMlxcdWRkZmNdfFxcdWQ4M2NbXFx1ZGNjZlxcdWRkOGVcXHVkZDkxLVxcdWRkOWFcXHVkZGU2LVxcdWRkZmZcXHVkZTAxXFx1ZGUzMi1cXHVkZTM2XFx1ZGUzOC1cXHVkZTNhXFx1ZGU1MFxcdWRlNTFcXHVkZjAwLVxcdWRmMjBcXHVkZjJkLVxcdWRmMzVcXHVkZjM3LVxcdWRmN2NcXHVkZjdlLVxcdWRmODRcXHVkZjg2LVxcdWRmOTNcXHVkZmEwLVxcdWRmYzFcXHVkZmM1XFx1ZGZjNlxcdWRmYzhcXHVkZmM5XFx1ZGZjZi1cXHVkZmQzXFx1ZGZlMC1cXHVkZmYwXFx1ZGZmNFxcdWRmZjgtXFx1ZGZmZl18XFx1ZDgzZFtcXHVkYzAwLVxcdWRjM2VcXHVkYzQwXFx1ZGM0NFxcdWRjNDVcXHVkYzUxLVxcdWRjNjVcXHVkYzZhXFx1ZGM2ZlxcdWRjNzktXFx1ZGM3YlxcdWRjN2QtXFx1ZGM4MFxcdWRjODRcXHVkYzg4LVxcdWRjYTlcXHVkY2FiLVxcdWRjZmNcXHVkY2ZmLVxcdWRkM2RcXHVkZDRiLVxcdWRkNGVcXHVkZDUwLVxcdWRkNjdcXHVkZGE0XFx1ZGRmYi1cXHVkZTQ0XFx1ZGU0OC1cXHVkZTRhXFx1ZGU4MC1cXHVkZWEyXFx1ZGVhNC1cXHVkZWIzXFx1ZGViNy1cXHVkZWJmXFx1ZGVjMS1cXHVkZWM1XFx1ZGVkMC1cXHVkZWQyXFx1ZGVkNS1cXHVkZWQ3XFx1ZGVlYlxcdWRlZWNcXHVkZWY0LVxcdWRlZmNcXHVkZmUwLVxcdWRmZWJdfFxcdWQ4M2VbXFx1ZGQwZFxcdWRkMGVcXHVkZDEwLVxcdWRkMTdcXHVkZDFkXFx1ZGQyMC1cXHVkZDI1XFx1ZGQyNy1cXHVkZDJmXFx1ZGQzYVxcdWRkM2NcXHVkZDNmLVxcdWRkNDVcXHVkZDQ3LVxcdWRkNzZcXHVkZDc4XFx1ZGQ3YS1cXHVkZGI0XFx1ZGRiN1xcdWRkYmFcXHVkZGJjLVxcdWRkY2JcXHVkZGQwXFx1ZGRkZS1cXHVkZGZmXFx1ZGU3MC1cXHVkZTc0XFx1ZGU3OC1cXHVkZTdhXFx1ZGU4MC1cXHVkZTg2XFx1ZGU5MC1cXHVkZWE4XFx1ZGViMC1cXHVkZWI2XFx1ZGVjMC1cXHVkZWMyXFx1ZGVkMC1cXHVkZWQ2XXxbXFx1MjNlOS1cXHUyM2VjXFx1MjNmMFxcdTIzZjNcXHUyNjdlXFx1MjZjZVxcdTI3MDVcXHUyNzI4XFx1Mjc0Y1xcdTI3NGVcXHUyNzUzLVxcdTI3NTVcXHUyNzk1LVxcdTI3OTdcXHUyN2IwXFx1MjdiZlxcdWU1MGFdKXxcXHVmZTBmL2csXG5cbiAgICAvLyBhdm9pZCBydW50aW1lIFJlZ0V4cCBjcmVhdGlvbiBmb3Igbm90IHNvIHNtYXJ0LFxuICAgIC8vIG5vdCBKSVQgYmFzZWQsIGFuZCBvbGQgYnJvd3NlcnMgLyBlbmdpbmVzXG4gICAgVUZFMEZnID0gL1xcdUZFMEYvZyxcblxuICAgIC8vIGF2b2lkIHVzaW5nIGEgc3RyaW5nIGxpdGVyYWwgbGlrZSAnXFx1MjAwRCcgaGVyZSBiZWNhdXNlIG1pbmlmaWVycyBleHBhbmQgaXQgaW5saW5lXG4gICAgVTIwMEQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4MjAwRCksXG5cbiAgICAvLyB1c2VkIHRvIGZpbmQgSFRNTCBzcGVjaWFsIGNoYXJzIGluIGF0dHJpYnV0ZXNcbiAgICByZXNjYXBlciA9IC9bJjw+J1wiXS9nLFxuXG4gICAgLy8gbm9kZXMgd2l0aCB0eXBlIDEgd2hpY2ggc2hvdWxkICoqbm90KiogYmUgcGFyc2VkXG4gICAgc2hvdWxkbnRCZVBhcnNlZCA9IC9eKD86aWZyYW1lfG5vZnJhbWVzfG5vc2NyaXB0fHNjcmlwdHxzZWxlY3R8c3R5bGV8dGV4dGFyZWEpJC8sXG5cbiAgICAvLyBqdXN0IGEgcHJpdmF0ZSBzaG9ydGN1dFxuICAgIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbiAgcmV0dXJuIHR3ZW1vamk7XG5cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vICBwcml2YXRlIGZ1bmN0aW9ucyAgLy9cbiAgLy8gICAgIGRlY2xhcmF0aW9uICAgICAvL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgLyoqXG4gICAqIFNob3J0Y3V0IHRvIGNyZWF0ZSB0ZXh0IG5vZGVzXG4gICAqIEBwYXJhbSAgIHN0cmluZyAgdGV4dCB1c2VkIHRvIGNyZWF0ZSBET00gdGV4dCBub2RlXG4gICAqIEByZXR1cm4gIE5vZGUgIGEgRE9NIG5vZGUgd2l0aCB0aGF0IHRleHRcbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZVRleHQodGV4dCwgY2xlYW4pIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2xlYW4gPyB0ZXh0LnJlcGxhY2UoVUZFMEZnLCAnJykgOiB0ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGVzY2FwZSBodG1sIGF0dHJpYnV0ZSB0ZXh0XG4gICAqIEBwYXJhbSAgIHN0cmluZyAgdGV4dCB1c2UgaW4gSFRNTCBhdHRyaWJ1dGVcbiAgICogQHJldHVybiAgc3RyaW5nICB0ZXh0IGVuY29kZWQgdG8gdXNlIGluIEhUTUwgYXR0cmlidXRlXG4gICAqL1xuICBmdW5jdGlvbiBlc2NhcGVIVE1MKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKHJlc2NhcGVyLCByZXBsYWNlcik7XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCBjYWxsYmFjayB1c2VkIHRvIGdlbmVyYXRlIGVtb2ppIHNyY1xuICAgKiAgYmFzZWQgb24gVHdpdHRlciBDRE5cbiAgICogQHBhcmFtICAgc3RyaW5nICAgIHRoZSBlbW9qaSBjb2RlcG9pbnQgc3RyaW5nXG4gICAqIEBwYXJhbSAgIHN0cmluZyAgICB0aGUgZGVmYXVsdCBzaXplIHRvIHVzZSwgaS5lLiBcIjM2eDM2XCJcbiAgICogQHJldHVybiAgc3RyaW5nICAgIHRoZSBpbWFnZSBzb3VyY2UgdG8gdXNlXG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0SW1hZ2VTcmNHZW5lcmF0b3IoaWNvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiAnJy5jb25jYXQob3B0aW9ucy5iYXNlLCBvcHRpb25zLnNpemUsICcvJywgaWNvbiwgb3B0aW9ucy5leHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgZ2VuZXJpYyBET00gbm9kZVR5cGUgMSwgd2FsayB0aHJvdWdoIGFsbCBjaGlsZHJlblxuICAgKiBhbmQgc3RvcmUgZXZlcnkgbm9kZVR5cGUgMyAoI3RleHQpIGZvdW5kIGluIHRoZSB0cmVlLlxuICAgKiBAcGFyYW0gICBFbGVtZW50IGEgRE9NIEVsZW1lbnQgd2l0aCBwcm9iYWJseSBzb21lIHRleHQgaW4gaXRcbiAgICogQHBhcmFtICAgQXJyYXkgdGhlIGxpc3Qgb2YgcHJldmlvdXNseSBkaXNjb3ZlcmVkIHRleHQgbm9kZXNcbiAgICogQHJldHVybiAgQXJyYXkgc2FtZSBsaXN0IHdpdGggbmV3IGRpc2NvdmVyZWQgbm9kZXMsIGlmIGFueVxuICAgKi9cbiAgZnVuY3Rpb24gZ3JhYkFsbFRleHROb2Rlcyhub2RlLCBhbGxUZXh0KSB7XG4gICAgdmFyXG4gICAgICBjaGlsZE5vZGVzID0gbm9kZS5jaGlsZE5vZGVzLFxuICAgICAgbGVuZ3RoID0gY2hpbGROb2Rlcy5sZW5ndGgsXG4gICAgICBzdWJub2RlLFxuICAgICAgbm9kZVR5cGU7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBzdWJub2RlID0gY2hpbGROb2Rlc1tsZW5ndGhdO1xuICAgICAgbm9kZVR5cGUgPSBzdWJub2RlLm5vZGVUeXBlO1xuICAgICAgLy8gcGFyc2UgZW1vamkgb25seSBpbiB0ZXh0IG5vZGVzXG4gICAgICBpZiAobm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgLy8gY29sbGVjdCB0aGVtIHRvIHByb2Nlc3MgZW1vamkgbGF0ZXJcbiAgICAgICAgYWxsVGV4dC5wdXNoKHN1Ym5vZGUpO1xuICAgICAgfVxuICAgICAgLy8gaWdub3JlIGFsbCBub2RlcyB0aGF0IGFyZSBub3QgdHlwZSAxLCB0aGF0IGFyZSBzdmcsIG9yIHRoYXRcbiAgICAgIC8vIHNob3VsZCBub3QgYmUgcGFyc2VkIGFzIHNjcmlwdCwgc3R5bGUsIGFuZCBvdGhlcnNcbiAgICAgIGVsc2UgaWYgKG5vZGVUeXBlID09PSAxICYmICEoJ293bmVyU1ZHRWxlbWVudCcgaW4gc3Vibm9kZSkgJiZcbiAgICAgICAgICAhc2hvdWxkbnRCZVBhcnNlZC50ZXN0KHN1Ym5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgZ3JhYkFsbFRleHROb2RlcyhzdWJub2RlLCBhbGxUZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFsbFRleHQ7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBib3RoIHJlbW92ZSB0aGUgcG9zc2libGUgdmFyaWFudFxuICAgKiAgYW5kIHRvIGNvbnZlcnQgdXRmMTYgaW50byBjb2RlIHBvaW50cy5cbiAgICogIElmIHRoZXJlIGlzIGEgemVyby13aWR0aC1qb2luZXIgKFUrMjAwRCksIGxlYXZlIHRoZSB2YXJpYW50cyBpbi5cbiAgICogQHBhcmFtICAgc3RyaW5nICAgIHRoZSByYXcgdGV4dCBvZiB0aGUgZW1vamkgbWF0Y2hcbiAgICogQHJldHVybiAgc3RyaW5nICAgIHRoZSBjb2RlIHBvaW50XG4gICAqL1xuICBmdW5jdGlvbiBncmFiVGhlUmlnaHRJY29uKHJhd1RleHQpIHtcbiAgICAvLyBpZiB2YXJpYW50IGlzIHByZXNlbnQgYXMgXFx1RkUwRlxuICAgIHJldHVybiB0b0NvZGVQb2ludChyYXdUZXh0LmluZGV4T2YoVTIwMEQpIDwgMCA/XG4gICAgICByYXdUZXh0LnJlcGxhY2UoVUZFMEZnLCAnJykgOlxuICAgICAgcmF3VGV4dFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRE9NIHZlcnNpb24gb2YgdGhlIHNhbWUgbG9naWMgLyBwYXJzZXI6XG4gICAqICBlbW9qaWZ5IGFsbCBmb3VuZCBzdWItdGV4dCBub2RlcyBwbGFjaW5nIGltYWdlcyBub2RlIGluc3RlYWQuXG4gICAqIEBwYXJhbSAgIEVsZW1lbnQgICBnZW5lcmljIERPTSBub2RlIHdpdGggc29tZSB0ZXh0IGluIHNvbWUgY2hpbGQgbm9kZVxuICAgKiBAcGFyYW0gICBPYmplY3QgICAgb3B0aW9ucyAgY29udGFpbmluZyBpbmZvIGFib3V0IGhvdyB0byBwYXJzZVxuICAgICpcbiAgICAqICAgICAgICAgICAgLmNhbGxiYWNrICAgRnVuY3Rpb24gIHRoZSBjYWxsYmFjayB0byBpbnZva2UgcGVyIGVhY2ggZm91bmQgZW1vamkuXG4gICAgKiAgICAgICAgICAgIC5iYXNlICAgICAgIHN0cmluZyAgICB0aGUgYmFzZSB1cmwsIGJ5IGRlZmF1bHQgdHdlbW9qaS5iYXNlXG4gICAgKiAgICAgICAgICAgIC5leHQgICAgICAgIHN0cmluZyAgICB0aGUgaW1hZ2UgZXh0ZW5zaW9uLCBieSBkZWZhdWx0IHR3ZW1vamkuZXh0XG4gICAgKiAgICAgICAgICAgIC5zaXplICAgICAgIHN0cmluZyAgICB0aGUgYXNzZXRzIHNpemUsIGJ5IGRlZmF1bHQgdHdlbW9qaS5zaXplXG4gICAgKlxuICAgKiBAcmV0dXJuICBFbGVtZW50IHNhbWUgZ2VuZXJpYyBub2RlIHdpdGggZW1vamkgaW4gcGxhY2UsIGlmIGFueS5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlTm9kZShub2RlLCBvcHRpb25zKSB7XG4gICAgdmFyXG4gICAgICBhbGxUZXh0ID0gZ3JhYkFsbFRleHROb2Rlcyhub2RlLCBbXSksXG4gICAgICBsZW5ndGggPSBhbGxUZXh0Lmxlbmd0aCxcbiAgICAgIGF0dHJpYixcbiAgICAgIGF0dHJuYW1lLFxuICAgICAgbW9kaWZpZWQsXG4gICAgICBmcmFnbWVudCxcbiAgICAgIHN1Ym5vZGUsXG4gICAgICB0ZXh0LFxuICAgICAgbWF0Y2gsXG4gICAgICBpLFxuICAgICAgaW5kZXgsXG4gICAgICBpbWcsXG4gICAgICByYXdUZXh0LFxuICAgICAgaWNvbklkLFxuICAgICAgc3JjO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgbW9kaWZpZWQgPSBmYWxzZTtcbiAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgc3Vibm9kZSA9IGFsbFRleHRbbGVuZ3RoXTtcbiAgICAgIHRleHQgPSBzdWJub2RlLm5vZGVWYWx1ZTtcbiAgICAgIGkgPSAwO1xuICAgICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWModGV4dCkpKSB7XG4gICAgICAgIGluZGV4ID0gbWF0Y2guaW5kZXg7XG4gICAgICAgIGlmIChpbmRleCAhPT0gaSkge1xuICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgY3JlYXRlVGV4dCh0ZXh0LnNsaWNlKGksIGluZGV4KSwgdHJ1ZSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJhd1RleHQgPSBtYXRjaFswXTtcbiAgICAgICAgaWNvbklkID0gZ3JhYlRoZVJpZ2h0SWNvbihyYXdUZXh0KTtcbiAgICAgICAgaSA9IGluZGV4ICsgcmF3VGV4dC5sZW5ndGg7XG4gICAgICAgIHNyYyA9IG9wdGlvbnMuY2FsbGJhY2soaWNvbklkLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKGljb25JZCAmJiBzcmMpIHtcbiAgICAgICAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICBpbWcub25lcnJvciA9IG9wdGlvbnMub25lcnJvcjtcbiAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKTtcbiAgICAgICAgICBhdHRyaWIgPSBvcHRpb25zLmF0dHJpYnV0ZXMocmF3VGV4dCwgaWNvbklkKTtcbiAgICAgICAgICBmb3IgKGF0dHJuYW1lIGluIGF0dHJpYikge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBhdHRyaWIuaGFzT3duUHJvcGVydHkoYXR0cm5hbWUpICYmXG4gICAgICAgICAgICAgIC8vIGRvbid0IGFsbG93IGFueSBoYW5kbGVycyB0byBiZSBzZXQgKyBkb24ndCBhbGxvdyBvdmVycmlkZXNcbiAgICAgICAgICAgICAgYXR0cm5hbWUuaW5kZXhPZignb24nKSAhPT0gMCAmJlxuICAgICAgICAgICAgICAhaW1nLmhhc0F0dHJpYnV0ZShhdHRybmFtZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKGF0dHJuYW1lLCBhdHRyaWJbYXR0cm5hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaW1nLmNsYXNzTmFtZSA9IG9wdGlvbnMuY2xhc3NOYW1lO1xuICAgICAgICAgIGltZy5hbHQgPSByYXdUZXh0O1xuICAgICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICAgICAgbW9kaWZpZWQgPSB0cnVlO1xuICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpbWcpIGZyYWdtZW50LmFwcGVuZENoaWxkKGNyZWF0ZVRleHQocmF3VGV4dCwgZmFsc2UpKTtcbiAgICAgICAgaW1nID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIGlzIHRoZXJlIGFjdHVhbGx5IGFueXRoaW5nIHRvIHJlcGxhY2UgaW4gaGVyZSA/XG4gICAgICBpZiAobW9kaWZpZWQpIHtcbiAgICAgICAgLy8gYW55IHRleHQgbGVmdCB0byBiZSBhZGRlZCA/XG4gICAgICAgIGlmIChpIDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGNyZWF0ZVRleHQodGV4dC5zbGljZShpKSwgdHJ1ZSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIHRleHQgbm9kZSBvbmx5LCBsZWF2ZSBpbnRhY3RcbiAgICAgICAgLy8gYW55dGhpbmcgZWxzZSBzdXJyb3VuZGluZyBzdWNoIHRleHRcbiAgICAgICAgc3Vibm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChmcmFnbWVudCwgc3Vibm9kZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0cmluZy9IVE1MIHZlcnNpb24gb2YgdGhlIHNhbWUgbG9naWMgLyBwYXJzZXI6XG4gICAqICBlbW9qaWZ5IGEgZ2VuZXJpYyB0ZXh0IHBsYWNpbmcgaW1hZ2VzIHRhZ3MgaW5zdGVhZCBvZiBzdXJyb2dhdGVzIHBhaXIuXG4gICAqIEBwYXJhbSAgIHN0cmluZyAgICBnZW5lcmljIHN0cmluZyB3aXRoIHBvc3NpYmx5IHNvbWUgZW1vamkgaW4gaXRcbiAgICogQHBhcmFtICAgT2JqZWN0ICAgIG9wdGlvbnMgIGNvbnRhaW5pbmcgaW5mbyBhYm91dCBob3cgdG8gcGFyc2VcbiAgICpcbiAgICogICAgICAgICAgICAuY2FsbGJhY2sgICBGdW5jdGlvbiAgdGhlIGNhbGxiYWNrIHRvIGludm9rZSBwZXIgZWFjaCBmb3VuZCBlbW9qaS5cbiAgICogICAgICAgICAgICAuYmFzZSAgICAgICBzdHJpbmcgICAgdGhlIGJhc2UgdXJsLCBieSBkZWZhdWx0IHR3ZW1vamkuYmFzZVxuICAgKiAgICAgICAgICAgIC5leHQgICAgICAgIHN0cmluZyAgICB0aGUgaW1hZ2UgZXh0ZW5zaW9uLCBieSBkZWZhdWx0IHR3ZW1vamkuZXh0XG4gICAqICAgICAgICAgICAgLnNpemUgICAgICAgc3RyaW5nICAgIHRoZSBhc3NldHMgc2l6ZSwgYnkgZGVmYXVsdCB0d2Vtb2ppLnNpemVcbiAgICpcbiAgICogQHJldHVybiAgdGhlIHN0cmluZyB3aXRoIDxpbWcgdGFncz4gcmVwbGFjaW5nIGFsbCBmb3VuZCBhbmQgcGFyc2VkIGVtb2ppXG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVwbGFjZShzdHIsIGZ1bmN0aW9uIChyYXdUZXh0KSB7XG4gICAgICB2YXJcbiAgICAgICAgcmV0ID0gcmF3VGV4dCxcbiAgICAgICAgaWNvbklkID0gZ3JhYlRoZVJpZ2h0SWNvbihyYXdUZXh0KSxcbiAgICAgICAgc3JjID0gb3B0aW9ucy5jYWxsYmFjayhpY29uSWQsIG9wdGlvbnMpLFxuICAgICAgICBhdHRyaWIsXG4gICAgICAgIGF0dHJuYW1lO1xuICAgICAgaWYgKGljb25JZCAmJiBzcmMpIHtcbiAgICAgICAgLy8gcmVjeWNsZSB0aGUgbWF0Y2ggc3RyaW5nIHJlcGxhY2luZyB0aGUgZW1vamlcbiAgICAgICAgLy8gd2l0aCBpdHMgaW1hZ2UgY291bnRlciBwYXJ0XG4gICAgICAgIHJldCA9ICc8aW1nICcuY29uY2F0KFxuICAgICAgICAgICdjbGFzcz1cIicsIG9wdGlvbnMuY2xhc3NOYW1lLCAnXCIgJyxcbiAgICAgICAgICAnZHJhZ2dhYmxlPVwiZmFsc2VcIiAnLFxuICAgICAgICAgIC8vIG5lZWRzIHRvIHByZXNlcnZlIHVzZXIgb3JpZ2luYWwgaW50ZW50XG4gICAgICAgICAgLy8gd2hlbiB2YXJpYW50cyBzaG91bGQgYmUgY29waWVkIGFuZCBwYXN0ZWQgdG9vXG4gICAgICAgICAgJ2FsdD1cIicsXG4gICAgICAgICAgcmF3VGV4dCxcbiAgICAgICAgICAnXCInLFxuICAgICAgICAgICcgc3JjPVwiJyxcbiAgICAgICAgICBzcmMsXG4gICAgICAgICAgJ1wiJ1xuICAgICAgICApO1xuICAgICAgICBhdHRyaWIgPSBvcHRpb25zLmF0dHJpYnV0ZXMocmF3VGV4dCwgaWNvbklkKTtcbiAgICAgICAgZm9yIChhdHRybmFtZSBpbiBhdHRyaWIpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBhdHRyaWIuaGFzT3duUHJvcGVydHkoYXR0cm5hbWUpICYmXG4gICAgICAgICAgICAvLyBkb24ndCBhbGxvdyBhbnkgaGFuZGxlcnMgdG8gYmUgc2V0ICsgZG9uJ3QgYWxsb3cgb3ZlcnJpZGVzXG4gICAgICAgICAgICBhdHRybmFtZS5pbmRleE9mKCdvbicpICE9PSAwICYmXG4gICAgICAgICAgICByZXQuaW5kZXhPZignICcgKyBhdHRybmFtZSArICc9JykgPT09IC0xXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXQgPSByZXQuY29uY2F0KCcgJywgYXR0cm5hbWUsICc9XCInLCBlc2NhcGVIVE1MKGF0dHJpYlthdHRybmFtZV0pLCAnXCInKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0ID0gcmV0LmNvbmNhdCgnLz4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdXNlZCB0byBhY3R1YWxseSByZXBsYWNlIEhUTUwgc3BlY2lhbCBjaGFyc1xuICAgKiBAcGFyYW0gICBzdHJpbmcgIEhUTUwgc3BlY2lhbCBjaGFyXG4gICAqIEByZXR1cm4gIHN0cmluZyAgZW5jb2RlZCBIVE1MIHNwZWNpYWwgY2hhclxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZXIobSkge1xuICAgIHJldHVybiBlc2NhcGVyW21dO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgb3B0aW9ucy5hdHRyaWJ1dGUgY2FsbGJhY2tcbiAgICogQHJldHVybiAgbnVsbFxuICAgKi9cbiAgZnVuY3Rpb24gcmV0dXJuTnVsbCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIGdlbmVyaWMgdmFsdWUsIGNyZWF0ZXMgaXRzIHNxdWFyZWQgY291bnRlcnBhcnQgaWYgaXQncyBhIG51bWJlci5cbiAgICogIEFzIGV4YW1wbGUsIG51bWJlciAzNiB3aWxsIHJldHVybiAnMzZ4MzYnLlxuICAgKiBAcGFyYW0gICBhbnkgICAgIGEgZ2VuZXJpYyB2YWx1ZS5cbiAgICogQHJldHVybiAgYW55ICAgICBhIHN0cmluZyByZXByZXNlbnRpbmcgYXNzZXQgc2l6ZSwgaS5lLiBcIjM2eDM2XCJcbiAgICogICAgICAgICAgICAgICAgICBvbmx5IGluIGNhc2UgdGhlIHZhbHVlIHdhcyBhIG51bWJlci5cbiAgICogICAgICAgICAgICAgICAgICBSZXR1cm5zIGluaXRpYWwgdmFsdWUgb3RoZXJ3aXNlLlxuICAgKi9cbiAgZnVuY3Rpb24gdG9TaXplU3F1YXJlZEFzc2V0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgP1xuICAgICAgdmFsdWUgKyAneCcgKyB2YWx1ZSA6XG4gICAgICB2YWx1ZTtcbiAgfVxuXG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLyAgZXhwb3J0ZWQgZnVuY3Rpb25zIC8vXG4gIC8vICAgICBkZWNsYXJhdGlvbiAgICAgLy9cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIGZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoY29kZXBvaW50KSB7XG4gICAgdmFyIGNvZGUgPSB0eXBlb2YgY29kZXBvaW50ID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgcGFyc2VJbnQoY29kZXBvaW50LCAxNikgOiBjb2RlcG9pbnQ7XG4gICAgaWYgKGNvZGUgPCAweDEwMDAwKSB7XG4gICAgICByZXR1cm4gZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgIH1cbiAgICBjb2RlIC09IDB4MTAwMDA7XG4gICAgcmV0dXJuIGZyb21DaGFyQ29kZShcbiAgICAgIDB4RDgwMCArIChjb2RlID4+IDEwKSxcbiAgICAgIDB4REMwMCArIChjb2RlICYgMHgzRkYpXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlKHdoYXQsIGhvdykge1xuICAgIGlmICghaG93IHx8IHR5cGVvZiBob3cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGhvdyA9IHtjYWxsYmFjazogaG93fTtcbiAgICB9XG4gICAgLy8gaWYgZmlyc3QgYXJndW1lbnQgaXMgc3RyaW5nLCBpbmplY3QgaHRtbCA8aW1nPiB0YWdzXG4gICAgLy8gb3RoZXJ3aXNlIHVzZSB0aGUgRE9NIHRyZWUgYW5kIHBhcnNlIHRleHQgbm9kZXMgb25seVxuICAgIHJldHVybiAodHlwZW9mIHdoYXQgPT09ICdzdHJpbmcnID8gcGFyc2VTdHJpbmcgOiBwYXJzZU5vZGUpKHdoYXQsIHtcbiAgICAgIGNhbGxiYWNrOiAgIGhvdy5jYWxsYmFjayB8fCBkZWZhdWx0SW1hZ2VTcmNHZW5lcmF0b3IsXG4gICAgICBhdHRyaWJ1dGVzOiB0eXBlb2YgaG93LmF0dHJpYnV0ZXMgPT09ICdmdW5jdGlvbicgPyBob3cuYXR0cmlidXRlcyA6IHJldHVybk51bGwsXG4gICAgICBiYXNlOiAgICAgICB0eXBlb2YgaG93LmJhc2UgPT09ICdzdHJpbmcnID8gaG93LmJhc2UgOiB0d2Vtb2ppLmJhc2UsXG4gICAgICBleHQ6ICAgICAgICBob3cuZXh0IHx8IHR3ZW1vamkuZXh0LFxuICAgICAgc2l6ZTogICAgICAgaG93LmZvbGRlciB8fCB0b1NpemVTcXVhcmVkQXNzZXQoaG93LnNpemUgfHwgdHdlbW9qaS5zaXplKSxcbiAgICAgIGNsYXNzTmFtZTogIGhvdy5jbGFzc05hbWUgfHwgdHdlbW9qaS5jbGFzc05hbWUsXG4gICAgICBvbmVycm9yOiAgICBob3cub25lcnJvciB8fCB0d2Vtb2ppLm9uZXJyb3JcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UodGV4dCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gU3RyaW5nKHRleHQpLnJlcGxhY2UocmUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRlc3QodGV4dCkge1xuICAgIC8vIElFNiBuZWVkcyBhIHJlc2V0IGJlZm9yZSB0b29cbiAgICByZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciByZXN1bHQgPSByZS50ZXN0KHRleHQpO1xuICAgIHJlLmxhc3RJbmRleCA9IDA7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQ29kZVBvaW50KHVuaWNvZGVTdXJyb2dhdGVzLCBzZXApIHtcbiAgICB2YXJcbiAgICAgIHIgPSBbXSxcbiAgICAgIGMgPSAwLFxuICAgICAgcCA9IDAsXG4gICAgICBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHVuaWNvZGVTdXJyb2dhdGVzLmxlbmd0aCkge1xuICAgICAgYyA9IHVuaWNvZGVTdXJyb2dhdGVzLmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgIGlmIChwKSB7XG4gICAgICAgIHIucHVzaCgoMHgxMDAwMCArICgocCAtIDB4RDgwMCkgPDwgMTApICsgKGMgLSAweERDMDApKS50b1N0cmluZygxNikpO1xuICAgICAgICBwID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoMHhEODAwIDw9IGMgJiYgYyA8PSAweERCRkYpIHtcbiAgICAgICAgcCA9IGM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByLnB1c2goYy50b1N0cmluZygxNikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gci5qb2luKHNlcCB8fCAnLScpO1xuICB9XG5cbn0oKSk7XG5pZiAoIWxvY2F0aW9uLnByb3RvY29sKSB7XG4gIHR3ZW1vamkuYmFzZSA9IHR3ZW1vamkuYmFzZS5yZXBsYWNlKC9eaHR0cDovLCBcIlwiKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gdHdlbW9qaTsiLCJpbXBvcnQgeyBBcHAsIEZ1enp5U3VnZ2VzdE1vZGFsLCBQbHVnaW4sIEZ1enp5TWF0Y2gsIE1hcmtkb3duUG9zdFByb2Nlc3NvciwgTWFya2Rvd25Qb3N0UHJvY2Vzc29yQ29udGV4dCwgTWFya2Rvd25QcmV2aWV3UmVuZGVyZXIsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgb3JkZXJlZEVtb2ppIGZyb20gJ3VuaWNvZGUtZW1vamktanNvbi9kYXRhLW9yZGVyZWQtZW1vamknXG5pbXBvcnQgZW1vamlOYW1lcyBmcm9tICd1bmljb2RlLWVtb2ppLWpzb24vZGF0YS1ieS1lbW9qaSdcbmltcG9ydCB0d2Vtb2ppIGZyb20gJ3R3ZW1vamknXG5cbmNvbnN0IGluZGljYXRvclN0eWxlOiBzdHJpbmcgPVxuICAnY29sb3I6IHZhcigtLXRleHQtYWNjZW50KTsgd2lkdGg6IDIuNWVtOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGZsb2F0OmxlZnQ7IGZvbnQtd2VpZ2h0OjgwMDsnO1xuXG5pbnRlcmZhY2UgTXlQbHVnaW5TZXR0aW5ncyB7XG4gIHR3ZW1vamlBY3RpdmU6IGJvb2xlYW47XG59XG5cbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IE15UGx1Z2luU2V0dGluZ3MgPSB7XG5cdHR3ZW1vamlBY3RpdmU6IHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICBlbW9qaXM6IEVtb2ppSXRlbVtdXG4gIHNldHRpbmdzOiBNeVBsdWdpblNldHRpbmdzO1xuXG4gIHB1YmxpYyBzdGF0aWMgcG9zdHByb2Nlc3NvcjogTWFya2Rvd25Qb3N0UHJvY2Vzc29yID0gKFxuICAgIGVsOiBIVE1MRWxlbWVudCxcbiAgICBjdHg6IE1hcmtkb3duUG9zdFByb2Nlc3NvckNvbnRleHRcbiAgKSA9PiB7XG4gICAgdHdlbW9qaS5wYXJzZShlbClcbiAgfVxuXG4gIGxvYWRFbW9qaXMoKTogRW1vamlJdGVtW10ge1xuICAgIGZ1bmN0aW9uIHRpdGxlQ2FzZShzdHJpbmc6IHN0cmluZykge1xuICAgICAgbGV0IHNlbnRlbmNlID0gc3RyaW5nLnRvTG93ZXJDYXNlKCkuc3BsaXQoJ18nKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VudGVuY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2VudGVuY2VbaV0gPSBzZW50ZW5jZVtpXVswXS50b1VwcGVyQ2FzZSgpICsgc2VudGVuY2VbaV0uc2xpY2UoMSk7XG4gICAgICB9XG4gIFxuICAgICAgcmV0dXJuIHNlbnRlbmNlLmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICBsZXQgaXRlbXMgPSBvcmRlcmVkRW1vamkubWFwKChuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IHRpdGxlQ2FzZShlbW9qaU5hbWVzW25hbWVdW1wibmFtZVwiXSksXG4gICAgICAgIGNoYXI6IG5hbWUsXG4gICAgICAgIGltZ0h0bWw6IHR3ZW1vamkucGFyc2UobmFtZSlcbiAgICAgIH1cbiAgICB9KVxuICBcbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuXHRhc3luYyBvbmxvYWQoKSB7XG5cbiAgICB0aGlzLmVtb2ppcyA9IHRoaXMubG9hZEVtb2ppcygpO1xuXG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKVxuXG4gICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTZXR0aW5nc1RhYih0aGlzLmFwcCwgdGhpcykpO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MudHdlbW9qaUFjdGl2ZSkge1xuICAgICAgTWFya2Rvd25QcmV2aWV3UmVuZGVyZXIucmVnaXN0ZXJQb3N0UHJvY2Vzc29yKE15UGx1Z2luLnBvc3Rwcm9jZXNzb3IpXG4gICAgfVxuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiAnZW1vamktcGlja2VyOm9wZW4tcGlja2VyJyxcbiAgICAgIG5hbWU6ICdPcGVuIGVtb2ppIHBpY2tlcicsXG4gICAgICBob3RrZXlzOiBbXSxcblx0XHRcdGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xuXHRcdFx0XHRsZXQgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xuXHRcdFx0XHRpZiAobGVhZikge1xuXHRcdFx0XHRcdGlmICghY2hlY2tpbmcpIHtcblx0XHRcdFx0XHRcdG5ldyBFbW9qaUZ1enp5U3VnZ2VzdE1vZGFsKHRoaXMuYXBwLCB0aGlzLmVtb2ppcywgdGhpcy5zZXR0aW5ncykub3BlbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fVxuXG5cdG9udW5sb2FkKCkge1xuICB9XG4gIFxuICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG5cdH1cblxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcblx0fVxufVxuXG5pbnRlcmZhY2UgRW1vamlJdGVtIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjaGFyOiBzdHJpbmc7XG4gIGltZ0h0bWw6IHN0cmluZztcbn1cblxuXG5jbGFzcyBFbW9qaUZ1enp5U3VnZ2VzdE1vZGFsIGV4dGVuZHMgRnV6enlTdWdnZXN0TW9kYWw8RW1vamlJdGVtPiB7XG4gIGFwcDogQXBwO1xuICBlbW9qaXM6IEVtb2ppSXRlbVtdO1xuICBzZXR0aW5nczogTXlQbHVnaW5TZXR0aW5ncztcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgZW1vamlzOiBFbW9qaUl0ZW1bXSwgc2V0dGluZ3M6IE15UGx1Z2luU2V0dGluZ3MpIHtcbiAgICAgIHN1cGVyKGFwcCk7XG4gICAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICAgIHRoaXMuZW1vamlzID0gZW1vamlzO1xuICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICB9XG5cbiAgZ2V0SXRlbXMoKTogRW1vamlJdGVtW10ge1xuICAgICAgcmV0dXJuIHRoaXMuZW1vamlzO1xuICB9XG5cbiAgZ2V0SXRlbVRleHQoaXRlbTogRW1vamlJdGVtKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gIH1cblxuICByZW5kZXJTdWdnZXN0aW9uKGl0ZW06IEZ1enp5TWF0Y2g8RW1vamlJdGVtPiwgZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgc3VwZXIucmVuZGVyU3VnZ2VzdGlvbihpdGVtLCBlbCk7XG4gICAgdGhpcy51cGRhdGVTdWdnZXN0aW9uRWxGb3JNb2RlKGl0ZW0sIGVsKTtcbiAgfVxuXG4gIHVwZGF0ZVN1Z2dlc3Rpb25FbEZvck1vZGUoaXRlbTogRnV6enlNYXRjaDxFbW9qaUl0ZW0+LCBlbDogSFRNTEVsZW1lbnQpIHtcblxuICAgIHZhciBpbmRpY2F0b3JFbCA9IGNyZWF0ZUVsKCdkaXYnLCB7XG4gICAgICBhdHRyOiB7IHN0eWxlOiBpbmRpY2F0b3JTdHlsZSB9LFxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MudHdlbW9qaUFjdGl2ZSkge1xuICAgICAgaW5kaWNhdG9yRWwuaW5uZXJIVE1MID0gaXRlbS5pdGVtLmltZ0h0bWxcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kaWNhdG9yRWwudGV4dENvbnRlbnQgPSBpdGVtLml0ZW0uY2hhclxuICAgIH1cbiAgICBcbiAgICBlbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBpbmRpY2F0b3JFbCk7XG4gIH1cblxuICBvbkNob29zZUl0ZW0oaXRlbTogRW1vamlJdGVtLCBldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgaXRlbS5jaGFyKVxuICB9XG59XG5cbmNsYXNzIFNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHBsdWdpbjogTXlQbHVnaW47XG5cblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogTXlQbHVnaW4pIHtcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdH1cblxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHRcdGxldCB7Y29udGFpbmVyRWx9ID0gdGhpcztcblxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDEnLCB7dGV4dDogJ0Vtb2ppIFRvb2xiYXInfSk7XG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2EnLCB7IHRleHQ6ICdDcmVhdGVkIGJ5IG9saXZlcnloJywgaHJlZjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9vbGl2ZXJ5aC8nfSkpO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywge3RleHQ6ICdTZXR0aW5ncyd9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ1R3aXR0ZXIgRW1vamknKVxuICAgICAgLnNldERlc2MoJ0ltcHJvdmVkIGVtb2ppIHN1cHBvcnQuIE5vdGU6IHRoaXMgYXBwbGllcyB0byBlbW9qaSBzZWFyY2ggYW5kIHByZXZpZXcgb25seS4nKVxuXHRcdFx0LmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50d2Vtb2ppQWN0aXZlKVxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudHdlbW9qaUFjdGl2ZSA9IHZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgTWFya2Rvd25QcmV2aWV3UmVuZGVyZXIucmVnaXN0ZXJQb3N0UHJvY2Vzc29yKE15UGx1Z2luLnBvc3Rwcm9jZXNzb3IpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE1hcmtkb3duUHJldmlld1JlbmRlcmVyLnVucmVnaXN0ZXJQb3N0UHJvY2Vzc29yKE15UGx1Z2luLnBvc3Rwcm9jZXNzb3IpXG4gICAgICAgICAgfVxuXHRcdFx0XHR9KSk7XG5cdH1cbn1cbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJ0d2Vtb2ppIiwiTWFya2Rvd25QcmV2aWV3UmVuZGVyZXIiLCJQbHVnaW4iLCJGdXp6eVN1Z2dlc3RNb2RhbCIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxF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U0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDbEUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ3pGLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZHQSxJQUFJLFFBQVEsR0FBR0EsY0FBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7QUFDckM7QUFDQSxJQUFJLE9BQU8sSUFBSTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxJQUFJLE9BQU8sR0FBRztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxJQUFJLEVBQUUsc0NBQXNDO0FBQ2xEO0FBQ0E7QUFDQSxNQUFNLEdBQUcsRUFBRSxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLE1BQU0s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
