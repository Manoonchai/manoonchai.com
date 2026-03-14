import { layoutsData } from "../scripts/sydiime-layouts.js";

const SyDiIME = (() => {
	let isActive = false;
	const defaultSinput = {
		currentLayout: "thai-mnc",
		beforeLayout: "default",
		isKbdvtShow: true
	};
	let sinput = { ...defaultSinput };
	let savedInput = JSON.parse(localStorage.getItem("sydiime-savedInput") || "{}");
	Object.assign(sinput, savedInput);
	console.debug(sinput);

	const modifKeys = ['ShiftLeft', 'ShiftRight', 'RightLeft', 'AltRight'];
	const speciCodes = ['ControlLeft', 'ControlRight', 'MetaLeft', 'MetaRight'];
	const speciKeys = ['Backspace', 'Tab', 'Enter', 'BLANK'];
	const noKey = "";

	// let boxLog;
	let boxText;
	let seltrLays;
	let btnF1;
	let keyTimeouts = {};
	const keyCache = {};

	const listeners = [];

	function on(el, ev, fn, opt) {
		if (!el) return;
		el.addEventListener(ev, fn, opt);
		listeners.push([el, ev, fn, opt]);
	}

	function offAll() {
		for (const [el, ev, fn, opt] of listeners) {
			el.removeEventListener(ev, fn, opt);
		}
		listeners.length = 0;
	}
	function init() {
		if (isActive) return;
		isActive = true;
		boxText = document.getElementById('sydiime-textArea');
		seltrLays = document.getElementById('sydiime-seltrLays');
		btnF1 = document.getElementById('sydiime-k-btnF1');
		initKeyCache();
		if (!boxText) return;

		seltrLays.value = sinput.currentLayout;

		if (boxText.dataset.sydiimeReady) return;
		boxText.dataset.sydiimeReady = "1";

		const savedText = localStorage.getItem("savedText");
		if (savedText) boxText.value = savedText;

		on(document, "keydown", keydownHandler);
		on(document, "keyup", keyupHandler);

		on(boxText, "input", handleEvent);
		on(boxText, "beforeinput", handleEvent);
		on(boxText, "compositionstart", handleEvent);
		on(boxText, "compositionupdate", handleEvent);
		on(boxText, "compositionend", handleEvent);

		on(btnF1, "click", btnF1Click);
		on(seltrLays, "change", changeLayoutHandler);

		on(window, "beforeunload", beforeUnloadHandler);
		on(document, "visibilitychange", visibilityChangeHandler);

		console.debug("sydiime init");
		changeKbdvtLayout();
	}

	function destroy() {
		if (!isActive) return;
		isActive = false;

		if (boxText) {
			localStorage.setItem("savedText", boxText.value);
		}
		offAll();

		if (boxText) {
			delete boxText.dataset.sydiimeReady;
		}

		boxText = null;
		seltrLays = null;
		btnF1 = null;

		console.debug("sydiime destroy");
	}

	function initKeyCache() {

		const keyDivs = document.querySelectorAll('.sydiime-key');

		for (const keyDiv of keyDivs) {

			const id = keyDiv.id.replace('sydiime-k-', '');

			keyCache[id] = {
				div: keyDiv,
				t0: keyDiv.querySelector('.sydiime-t0'),
				t1: keyDiv.querySelector('.sydiime-t1'),
				t2: keyDiv.querySelector('.sydiime-t2'),
				t3: keyDiv.querySelector('.sydiime-t3')
			};
		}
	}


	async function changeLayoutHandler(event) {
		await setKeyboardLayout(event.target.value);
		resetKbd();
	}
	/**
		* Map `IntlRo` and `IntlBackslash` to `Backquote` because some keyboards 
		* lack a dedicated Backquote key (e.g., JIS on Mac, certain tablet keyboards) 
		* 
		* But in WKWebView KeyboardViewController on iOS and iPadOS, 
		* it sends `unidentified` for `event.code`. You can still get `event.key`, 
		* but it conflicts with its own existing `@event.code`.
		*
		* @type {Object<string, string>}
		*/
	const remapKeys = {
		'_': 'IntlRo',
		'|': 'IntlYen',
		'¥': 'IntlYen'
	};

	function getFixedCode(event) {
		if (event.code && event.code !== 'Unidentified') {
			return event.code;
		}
		if (event.key in remapKeys) {
			return remapKeys[event.key];
		}
		return event.code || null;
	}

	const flags = {
		isGbd: false,
	}
	const modifState = {
		shiftAltPressed: false,
		shiftAltToggle: false,
		shiftPressed: false,
		shiftToggle: false,
		altPressed: false,
		altToggle: false,
	};

	// const boxCnsl = {
	// 	logs: [],
	// 	maxLines: 10,
	// 	target: null,

	// 	debug(...args) {
	// 		const message = args.map(arg =>
	// 			typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
	// 		).join(' ');
	// 		this.logs.unshift(message);
	// 		this.logs = this.logs.slice(0, this.maxLines);
	// 		if (this.target) {
	// 			this.target.textContent = this.logs.join(' ← ');
	// 		}
	// 	},
	// };

	function handleEvent(event) {
		// console.debug(`${event.type}: ${event.inputType}: ${event.data} ${flags.isGbd}`);
		if (sinput.currentLayout == "default") {
			switch (event.type) {
				case "compositionstart":
					flags.isGbd = true;
					break
				case "compositionend":
					flags.isGbd = false;
				default:
					break;
			}
			return
		}
		if (event.inputType == "insertText" || event.inputType == "insertCompositionText") {
			boxText.readOnly = true;
			event.preventDefault();

			/* Hard remap-code for dead keys that don’t work the same on Mac.  
			* Keydown is not detected.  
			* Mimics QWERTY behavior.  
			*/
			switch (event.data) {
				case '´':
					typing("KeyE");
					break;
				case '¨':
					typing("KeyU");
					break;
				case 'ˆ':
					typing("KeyI");
					break;
				case '˜':
					typing("KeyN");
					break;
				case '`':
					typing("Backquote");
					break;
				default:
					break;
			}

			setTimeout(() => boxTextUnReadOnly(), 400);
		}
	}

	function keydownHandler(event) {
		// console.debug(`${event.code}:  ${event.key}`);

		if (event.metaKey) {
			boxTextUnReadOnly();
			return;
		}

		if (event.code === 'Tab') {
			if (!flags.isGbd) {
				btnF1.click();
				event.preventDefault();
				return
			}
		}
		if (sinput.currentLayout == "default") {
			return
		}
		if (event.code === 'ArrowUp' ||
			event.code === 'ArrowDown' ||
			event.code === 'ArrowLeft' ||
			event.code === 'ArrowRight') {
			return
		}

		if (speciCodes.includes(event.code) || event.code.startsWith('F')) {
			return;
		} else {

			if (event.ctrlKey || event.metaKey) {
				boxTextUnReadOnly()
				return;
			}
			event.preventDefault();

			/* let key = remapCodes[event.key] || event.code; */
			let key = getFixedCode(event);

			const keyDiv = keyCache[key]?.div;
			if (keyDiv) {
				keyDiv.classList.add('sydiime-active');
			}
			activeSymbol(event);
			if (speciKeys.includes(key)) {
				handleKeyPress(key);
			} else {
				if (event.key === 'Shift') {
					modifState.shiftPressed = true;
				}
				if (event.key === 'Alt' || event.key === 'AltGraph') {
					modifState.altPressed = true;
				}

				/* Some local keyboard send event GroupNext instead Shift AltGraph*/
				if (modifState.shiftPressed && modifState.altPressed) {
					modifState.shiftAltPressed = true;
				} else if (event.key === 'GroupNext') {
					modifState.shiftAltPressed = true;
				}

				typing(key);

			}
		}
	};

	function typing(key) {
		if (layoutsData[sinput.currentLayout]['main_keys'][key]) {
			if (sinput.currentLayout == "default") {
				modifyText.add(checkOrdering(event.key));
			} else {
				let output = sentOutput(key, layoutsData[sinput.currentLayout]);
				modifyText.add(checkOrdering(output));
			}
		} else {
			toggleKeyColumns();
		}
	}

	function activeSymbol(event, up) {
		/** 
			* Firefox on Linux sends both keydown and keyup for 'CapsLock'.
			* Firefox on macOS sends keydown only.
			* Chrome on macOS may send keyup only (?).
			* 
			* WebKit on iOS KeyboardViewController NOT SENDS BOTH.
			* 
			* Some layouts activate CapsLock via Shift+CapsLock.
			*/

		const isCapsOn = event.getModifierState("CapsLock");
		//if (!up) boxCnsl.debug("caps" + isCapsOn);
		if (isCapsOn) {
			modifState.shiftToggle = true;
			keyCache["CapsLock"]?.div.classList.add('sydiime-active');
		} else if (!isCapsOn) {
			modifState.shiftToggle = false;
			keyCache["CapsLock"]?.div.classList.remove('sydiime-active');
		}
	}

	function keyupHandler(event) {
		/* let key = remapCodes[event.code] || event.code; */
		let key = getFixedCode(event);
		const keyDiv = keyCache[key]?.div;
		activeSymbol(event, 1);
		if (sinput.currentLayout == "default") {
			return
		}
		if (event.key === 'Shift') {
			modifState.shiftPressed = false;
			modifState.shiftAltPressed = false;
			toggleKeyColumns();
		} else if (event.key === 'Alt' || event.key === 'AltGraph') {
			modifState.altPressed = false;
			modifState.shiftAltPressed = false;
			toggleKeyColumns();
		}

		if (keyDiv && key != 'CapsLock') {
			if (keyTimeouts[key]) {
				clearTimeout(keyTimeouts[key]);
			}
			keyTimeouts[key] = setTimeout(() => {
				keyDiv.classList.remove('sydiime-active');
				delete keyTimeouts[key];
			}, 60);
		}
	};

	function sentOutput(key, layoutData) {
		let output = key;
		if (layoutData['main_keys'][key]) {
			if (modifState.shiftAltPressed || modifState.shiftAltToggle) {
				output = layoutData['main_keys'][key][3] || noKey;
			} else if (modifState.shiftPressed || modifState.shiftToggle) {
				output = layoutData['main_keys'][key][1] || noKey;
			} else if (modifState.altPressed || modifState.altToggle) {
				output = layoutData['main_keys'][key][2] || noKey;
			} else {
				output = layoutData['main_keys'][key][0];
			}
		}
		return output;
	}

	function handleKeyPress(key) {
		switch (key) {
			case 'Backspace':
				modifyText.rm();
				break;
			case 'Enter':
				modifyText.add("\n")
				break;
			case 'BLANK':
				/* do nothing */
				break;
			default:
				console.warn(`Unhandled key: ${key}`);
		}
	}

	const modifyText = (() => {
		let lastStart = 0;
		let lastEnd = 0;

		function getCursor() {
			let start = boxText.selectionStart;
			let end = boxText.selectionEnd;

			// Surrogate pair adjustment
			if (boxText.value.length > 1 && end > 0) {
				const lastChar = boxText.value.charCodeAt(end);
				const secondLastChar = boxText.value.charCodeAt(end - 1);
				if (lastChar >= 0xDC00 && lastChar <= 0xDFFF &&
					secondLastChar >= 0xD800 && secondLastChar <= 0xDBFF) {
					start++;
					end++;
				}
			}

			lastStart = start;
			lastEnd = end;

			return { start, end };
		}

		function setCursor(pos) {
			boxText.selectionStart = boxText.selectionEnd = Math.max(0, pos);
		}

		function add(output) {
			const { start, end } = getCursor();
			boxText.value = boxText.value.slice(0, start) + output + boxText.value.slice(end);
			setCursor(start + output.length);
		}

		function rm() {
			let { start, end } = getCursor();
			if (start <= 0) return;

			// Handle surrogate pairs
			if (end > 1 && boxText.value.charCodeAt(end - 2) >= 0xD800 && boxText.value.charCodeAt(end - 2) <= 0xDBFF) {
				start--;
			}

			// Handle |ZWSP and ZWJ and variation selectors (Ahom + others)
			if (end > 1 && boxText.value.charCodeAt(end - 4) === 0xFE00 && boxText.value.charAt(end - 3) === "|" && boxText.value.charAt(end - 1) === "\u103C") {
				start -= 2;
			}

			if (end > 1 && boxText.value.charCodeAt(end - 3) === 0x200D) {
				start--;
			}

			if (end > 1) {
				const code = boxText.value.charCodeAt(end - 1);
				if (code >= 0xFE00 && code <= 0xFE0F) {
					start--;
					if (boxText.value.charCodeAt(end - 3) === 0xD805) {
						start--;
					}
				}
			}

			boxText.value = boxText.value.slice(0, start - 1) + boxText.value.slice(end);
			setCursor(start - 1);
		}

		function prev_a(n) {
			const { end, start } = getCursor();
			const rmVS = boxText.value.slice(end - n, start + 1);
			const rmVSn = (rmVS.match(/\uFE00/g) || []).length;
			return boxText.value.charAt(end - n - rmVSn);
		}

		function mvLeft() {
			let { start, end } = getCursor();
			if (end > 1 && boxText.value.charCodeAt(end - 2) >= 0xD800 && boxText.value.charCodeAt(end - 2) <= 0xDBFF) {
				start--;
			}
			if (end > 1 && boxText.value.charCodeAt(end - 4) === 0xFE00 && boxText.value.charAt(end - 3) === "|" && boxText.value.charAt(end - 1) === "\u103C") {
				start -= 2;
			}
			if (end > 1 && boxText.value.charCodeAt(end - 3) === 0x200D) {
				start--;
			}
			if (end > 1) {
				const code = boxText.value.charCodeAt(end - 1);
				if (code >= 0xFE00 && code <= 0xFE0F) {
					start--;
					if (boxText.value.charCodeAt(end - 3) === 0xD805) {
						start--;
					}
				}
			}
			setCursor(start - 1);
		}

		function mvRight() {
			let { start, end } = getCursor();
			if (end > 1 && boxText.value.charCodeAt(end - 2) >= 0xD800 && boxText.value.charCodeAt(end - 2) <= 0xDBFF) {
				start++;
			}
			if (end > 1 && boxText.value.charCodeAt(end - 4) === 0xFE00 && boxText.value.charAt(end - 3) === "|" && boxText.value.charAt(end - 1) === "\u103C") {
				start += 2;
			}
			if (end > 1 && boxText.value.charCodeAt(end - 3) === 0x200D) {
				start++;
			}
			setCursor(start + 1);
		}

		return {
			add,
			rm,
			prev_a,
			mvLeft,
			mvRight,
		};
	})();

	function checkOrdering(output) {
		output = output.replace(/　|ZWSP|ZWNJ|ZWJ/g, (match) => {
			switch (match) {
				case "　": return "";           // Remove full-width space (U+3000)
				case "u3000": return "\u3000";  // Get full-width back
				case "ZWSP": return "\u200B";   // Zero-width space
				case "ZWNJ": return "\u200C";   // Zero-width non-joiner
				case "ZWJ": return "\u200D";    // Zero-width joiner
			}
		});
		if (sinput.currentLayout.startsWith("latn-")) {
			const allTnMk = /[̨̧̣̤̦̀́̂̃̄̆̇̈̊̌]/u;
			if (allTnMk.test(output)) {
				var prev = modifyText.prev_a(1);
				modifyText.rm();
				const combined = (prev ? prev : "") + output;
				output = combined.normalize("NFC");
			}
		}

		if (sinput.currentLayout == "default") {
			if (output.startsWith("Dead")) {
				output = "";
			}
		}
		return output;
	}

	function btnF1Click() {
		keyCache["btnF1"]?.div.classList.add('sydiime-active');
		chLang();
		setTimeout(() => keyCache["btnF1"]?.div.classList.remove('sydiime-active'), 100);
	}

	function chLang() {
		if (!flags.isGbd) {
			seltrLays.value = sinput.beforeLayout;
			setKeyboardLayout(sinput.beforeLayout);
			resetKbd();
			boxTextFocus();
		}

	}
	function setKeyboardLayout(layoutName, wtFm) {

		if (wtFm == 1) {
		} else {
			sinput.beforeLayout = sinput.currentLayout;
		}
		sinput.currentLayout = layoutName;

		if (!layoutsData[sinput.currentLayout]) {
			console.log(`Loading layout: ${sinput.currentLayout}`);
			// await loadKeyboardLayout(sinput.currentLayout);
		}

		console.debug(layoutsData);

		console.log(`Current layout set to: ${sinput.currentLayout}`);

		if (wtFm != 1) {
			saveLcSt("sydiime-savedInput", sinput);
		}
		changeKbdvtLayout();
	}

	function resetKbd() {
		modifState.shiftAltPressed = false;
		modifState.shiftAltToggle = false;
		modifState.shiftPressed = false;
		modifState.shiftToggle = false;
		modifState.altPressed = false;
		modifState.altToggle = false;
	}

	function boxTextUnReadOnly() {
		boxText.readOnly = false;
	}

	function boxTextFocus() {
		boxText.focus();
	}

	function saveLcSt(type, data) {
		console.debug(data)
		localStorage.setItem(type, JSON.stringify(data));
	}

	function beforeUnloadHandler(event) {
		if (boxText) {
			localStorage.setItem("savedText", boxText.value);
		}
		// event.preventDefault();
		event.returnValue = "";
	}

	function visibilityChangeHandler() {
		if (document.hidden && boxText) {
			history.pushState(null, null, location.href);
			localStorage.setItem("savedText", boxText.value);
		}
	}
	function changeKbdvtLayout() {

		const layout = layoutsData[sinput.currentLayout].main_keys;

		for (const keyId in layout) {

			const k = keyCache[keyId];
			if (!k) continue;

			const keyData = layout[keyId];
			const v0 = keyData[0];

			if (k.t0) {
				if (/^[a-z]$/.test(v0)) {
					k.t0.textContent = noKey;
				} else {
					k.t0.textContent = v0 || noKey;
				}
			}

			if (k.t1) k.t1.textContent = keyData[1] || '';
			if (k.t2) k.t2.textContent = keyData[2] || '';
			if (k.t3) k.t3.textContent = keyData[3] || '';
		}
	}

	function toggleKeyColumns() {

		const shiftActive =
			modifState.shiftAltPressed ||
			modifState.shiftAltToggle ||
			modifState.shiftPressed ||
			modifState.shiftToggle;

		const altActive =
			modifState.shiftAltPressed ||
			modifState.shiftAltToggle ||
			modifState.altPressed ||
			modifState.altToggle;

		// if (shiftActive) {
		// 	keyCache["ShiftLeft"].div.classList.add('sydiime-active');
		// } else {
		// 	keyCache["shiftLeft"].div.classList.remove('sydiime-active');
		// }

		// if (shiftActive) {
		// 	keyCache["shiftRight"].div.classList.add('sydiime-active');
		// } else {
		// 	keyCache["shiftRight"].div.classList.remove('sydiime-active');
		// }
		const layout = layoutsData[sinput.currentLayout].main_keys;
		// if (altActive) {
		// 	keyCache["altRight"].div.classList.add('sydiime-active');
		// } else {
		// 	keyCache["altRight"].div.classList.remove('sydiime-active');
		// }
		for (const keyId in layout) {
			const k = keyCache[keyId];
			if (!k) continue;
			if (altActive) {
				k.t0?.classList.add('sydiime-mute');
				k.t1?.classList.add('sydiime-mute');
				k.t2?.classList.add('sydiime-active');
				k.t3?.classList.add('sydiime-active');
			} else {
				k.t0?.classList.remove('sydiime-mute');
				k.t1?.classList.remove('sydiime-mute');
				k.t2?.classList.remove('sydiime-active');
				k.t3?.classList.remove('sydiime-active');
			}

		}
	}

	return {
		init,
		destroy
	};

})();

export default SyDiIME;

// SyyDai IME Minimal Core - Manoonchai Edition
// Copyright (C) 2024-2025  SyyDai, Saamkhaih Kyakya

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.

// You should have received a copy of the GNU Lesser General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
