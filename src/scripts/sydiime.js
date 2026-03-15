import { layoutsData } from "../scripts/sydiime-layouts.js";

const SyDiIME = (() => {
	let isActive = false;
	const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
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

	let boxText;
	let kbdvtCont;
	let fltCont;
	let seltrLays;
	let btnF1;
	let btnHide;
	let btnShow;
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
		kbdvtCont = document.getElementById('sydiime-kbdvtCont');
		fltCont = document.getElementById('sydiime-fltCont');
		seltrLays = document.getElementById('sydiime-seltrLays');
		btnF1 = document.getElementById('sydiime-btnF1');
		btnHide = document.getElementById('sydiime-btnHide');
		btnShow = document.getElementById('sydiime-btnShow');
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
		on(btnHide, "click", btnHideClick);
		on(btnShow, "click", btnShowClick);

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
			if (!keyDiv.id.startsWith('sydiime-k-')) continue;
			const id = keyDiv.id.slice(10);

			keyCache[id] = {
				div: keyDiv,
				t0: keyDiv.querySelector('.sydiime-t0'),
				t1: keyDiv.querySelector('.sydiime-t1'),
				t2: keyDiv.querySelector('.sydiime-t2'),
				t3: keyDiv.querySelector('.sydiime-t3')
			};

			on(keyDiv, "pointerdown", startTouch);
			on(keyDiv, "pointerup", endTouch);
		}
	}

	function changeLayoutHandler(event) {
		setKeyboardLayout(event.target.value);
		resetKbd();
		boxTextFocus();
	}
	/**
		* `IntlRo` `IntlYen` `IntlBackslash` 
		* WKWebView KeyboardViewController (iOS/iPadOS)
		* reports `event.code` as `Unidentified`.
		* Remapping from `event.key` may collide with existing `event.code` keys.
		*
		* @type {Object<string, string>}
		*/
	const remapKeys = {
		'_': 'IntlRo',
		'|': 'IntlYen',
		'¥': 'IntlYen',
		'§': 'IntlBackslash',
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
		shiftToggleVt: false,
		altPressed: false,
		altToggle: false,
	};

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
			return;
		}
		if (event.inputType == "insertText" || event.inputType == "insertCompositionText") {
			boxText.readOnly = true;
			event.preventDefault();

			/** Hard remap for dead keys with inconsistent browser behavior (macOS).  
				* In some cases `keydown` is not detected.  
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

		if (speciCodes.includes(event.code) ||
			event.code.startsWith('F')) {
			return;
		} else {
			if (event.ctrlKey || event.metaKey) {
				boxTextUnReadOnly()
				return;
			}
			event.preventDefault();

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
			let output = sentOutput(key, layoutsData[sinput.currentLayout]);
			modifyText.add(checkOrdering(output));
		} else {
			toggleKeyColumns();
		}
	}

	function activeSymbol(event, up) {
		/** 
			* Originally for symbol layer activation, now used as ShiftLock.
			* CapsLock event behavior varies across browsers/platforms.
			* Firefox on Linux sends both keydown and keyup for 'CapsLock'.
			* Firefox on macOS sends keydown only.
			* Chrome on macOS may send keyup only (?).
			* 
			* WebKit on iOS KeyboardViewController NOT SENDS BOTH.
			* 
			* Some layouts activate CapsLock via Shift+CapsLock.
			*/
		const isCapsOn = event.getModifierState("CapsLock");
		// if (!up) console.debug("caps" + isCapsOn);
		if (isCapsOn) {
			modifState.shiftToggle = true;
			keyCache["CapsLock"]?.div.classList.add('sydiime-active');
		} else if (!isCapsOn) {
			if (!modifState.shiftToggleVt) {
				modifState.shiftToggle = false;
				keyCache["CapsLock"]?.div.classList.remove('sydiime-active');
			}
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
			if (modifState.shiftAltPressed ||
				modifState.shiftAltToggle ||
				((modifState.shiftPressed || modifState.shiftToggle) && (modifState.altPressed || modifState.altToggle))) {
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
			case 'Tab':
				modifyText.add("\t")
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
			const { start, end } = getCursor();
			const text = boxText.value;
			if (start !== end) {
				boxText.value = text.slice(0, start) + text.slice(end);
				setCursor(start);
				return;
			}
			if (start <= 0) return;

			const prevCP = (pos) => {
				if (
					pos > 0 &&
					text.charCodeAt(pos) >= 0xDC00 &&
					text.charCodeAt(pos) <= 0xDFFF &&
					text.charCodeAt(pos - 1) >= 0xD800 &&
					text.charCodeAt(pos - 1) <= 0xDBFF
				) pos--;
				return pos;
			};

			let pos = prevCP(start - 1);
			const cp = text.codePointAt(pos);

			let prev = pos;

			if ((cp >= 0xFE00 && cp <= 0xFE0F) || (cp >= 0xE0100 && cp <= 0xE01EF)) {
				prev = prevCP(pos - 1);
			}

			boxText.value = text.slice(0, prev) + text.slice(start);
			setCursor(prev);
		}

		return {
			add,
			rm,
		};
	})();

	/**
		* Legacy helper for character reordering checks.
		* Previously used to normalize special markers and input order.
		* Rarely needed for Thai input now.
		*/
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
		return output;
	}

	function btnF1Click() {
		btnF1.classList.add('sydiime-active');
		chLang();
		setTimeout(() => btnF1.classList.remove('sydiime-active'), 100);
	}

	function btnHideClick() {
		hideKbdvt();
	}

	function btnShowClick() {
		hideKbdvt(1);
	}

	function chLang() {
		if (!flags.isGbd) {
			seltrLays.value = sinput.beforeLayout;
			setKeyboardLayout(sinput.beforeLayout);
			resetKbd();
			boxTextFocus();
		}

	}

	function setKeyboardLayout(layoutName) {
		sinput.beforeLayout = sinput.currentLayout;
		sinput.currentLayout = layoutName;

		if (!layoutsData[sinput.currentLayout]) {
			console.warn(`Missing layout: ${sinput.currentLayout}`);
		}

		// console.debug(layoutsData);
		console.log(`Current layout set to: ${sinput.currentLayout}`);

		saveLcSt("sydiime-savedInput", sinput);
		changeKbdvtLayout();
	}

	function resetKbd() {
		modifState.shiftAltPressed = false;
		modifState.shiftAltToggle = false;
		modifState.shiftPressed = false;
		modifState.shiftToggle = false;
		modifState.shiftToggleVt = false;
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
		event.preventDefault();
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

		const layout = layoutsData[sinput.currentLayout].main_keys;
		for (const keyId in layout) {
			const k = keyCache[keyId];
			if (!k) continue;
			if (altActive) {
				k.t0?.classList.add('sydiime-mute');
				k.t1?.classList.add('sydiime-mute');
				k.t2?.classList.add('sydiime-active');
				k.t3?.classList.add('sydiime-active');
			} else {
				if (shiftActive) {
					k.t0?.classList.add('sydiime-mute-s');
					k.t1?.classList.add('sydiime-active');
				} else {
					k.t0?.classList.remove('sydiime-mute');
					k.t0?.classList.remove('sydiime-mute-s');
					k.t1?.classList.remove('sydiime-mute');
					k.t1?.classList.remove('sydiime-active');
					k.t2?.classList.remove('sydiime-active');
					k.t3?.classList.remove('sydiime-active');
				}
			}
		}
	}

	// TODO: Replace with declarative Astro + Tailwind UI
	function hideKbdvt(type) {
		const showKeyboard = () => {
			fltCont.classList.add('hidden');
			kbdvtCont.style.display = "block";
			setTimeout(() => {
				kbdvtCont.style.transform = "translateY(0%)";
				kbdvtCont.style.opacity = "1";
			}, 100);
			setTimeout(() => {
				kbdvtCont.style.removeProperty("display");
				kbdvtCont.style.removeProperty("transform");
				kbdvtCont.style.removeProperty("opacity");
			}, 350);
		};
		const hideKeyboard = () => {
			kbdvtCont.style.transform = "translateY(20%)";
			kbdvtCont.style.opacity = "0";
			fltCont.classList.remove('hidden');
			setTimeout(() => {
				kbdvtCont.style.display = "none";
			}, 350);
		};
		switch (type) {
			case 1:
				showKeyboard();
				break;
			default:
				hideKeyboard();
				break;
		}
	}

	function startTouch(event) {
		const keyDiv = event.currentTarget;
		const key = keyDiv.id.replace('sydiime-k-', '');
		// console.debug("pressed", key);
		if (keyDiv) {
			keyDiv.classList.add('sydiime-active');
		}
		if (speciKeys.includes(key)) {
			handleKeyPress(key);
		} else {
			if (layoutsData[sinput.currentLayout]['main_keys'][key]) {
				let output = sentOutput(key, layoutsData[sinput.currentLayout]);
				modifyText.add(checkOrdering(output));
				modifState.shiftToggle = false;
				modifState.shiftToggleVt = false;
				modifState.altToggle = false;
				modifState.shiftAltToggle = false;
				toggleKeyColumns();
				keyCache['ShiftLeft'].div.classList.remove('sydiime-active');
				keyCache['ShiftRight'].div.classList.remove('sydiime-active');
				keyCache['AltRight'].div.classList.remove('sydiime-active');
				keyCache['CapsLock'].div.classList.remove('sydiime-active');
			} else {
				if (key === 'ShiftLeft' || key == 'ShiftRight' || key == 'CapsLock') {
					modifState.shiftToggle = !modifState.shiftToggle;
					modifState.shiftToggleVt = modifState.shiftToggle;
					toggleKeyColumns();
				}
				if (key === 'AltRight') {
					modifState.altToggle = !modifState.altToggle;
					toggleKeyColumns();
				}
				if (modifState.shiftToggle && modifState.altToggle) {
					modifState.shiftAltToggle = true;
				} else {
					modifState.shiftAltToggle = false;
				}
			}
		}
	}

	function endTouch(event) {
		boxTextFocus();
		const keyDiv = event.currentTarget;
		const key = keyDiv.id.replace('sydiime-k-', '');
		// console.debug("pressed", key, modifState);
		if (keyDiv) {
			if ((key === 'ShiftLeft' ||
				key == 'ShiftRight' ||
				key == 'AltRight' ||
				key == 'CapsLock') &&
				(modifState.shiftToggle ||
					modifState.altToggle)) {
			}
			else {
				keyDiv.classList.remove('sydiime-active');
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
