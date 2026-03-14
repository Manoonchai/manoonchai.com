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
		btnF1 = document.getElementById('sydiime-btnF1');

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

		on(btnF1, "click", chLang);
		on(seltrLays, "change", changeLayoutHandler);

		on(window, "beforeunload", beforeUnloadHandler);
		on(document, "visibilitychange", visibilityChangeHandler);

		console.debug("sydiime init");
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

	const modifState = {
		shiftAltPressed: false,
		shiftAltToggle: false,
		shiftPressed: false,
		shiftToggle: false,
		altPressed: false,
		altToggle: false,
	};

	/**
		* State for tracking recent input units (characters and variation selectors),
		* and language-specific flags for Myanmar, Tai-Tham, and Vietnamese.
		*
		* @typedef {Object} InputState
		* @property {Array.<number|string>} recentUnits - Array holding recent input code points or characters (can be sequences of 2–3 items).
		* @property {boolean} isSakot - Flag used in Myanmar and Tai-Tham for sakot check.
		* @property {boolean} isSakotWithRa - Flag used in Myanmar and Tai-Tham for sakot+ra check.
		* @property {Array.<number|string>} vnRecentUnits - Vietnamese-specific recent input units.
		*/

	/** @type {InputState} */
	const inputState = {
		recentUnits: [],
		isSakot: false,
		isSakotWithRa: false,
		vnRecentUnits: []
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
		// boxCnsl.debug(`${event.type}: ${event.inputType}: ${event.data}`);

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
		// boxCnsl.debug(`${event.code}:  ${event.key}`);

		if (event.metaKey) {
			boxTextUnReadOnly();
			return;
		}

		if (event.code === 'Tab') {
			btnF1.click();
			event.preventDefault();
			return
		}

		if (event.code === 'ArrowLeft') {
			event.preventDefault();
			modifyText.mvLeft();
			return
		}

		if (event.code === 'ArrowRight') {
			event.preventDefault();
			modifyText.mvRight();
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
		} else if (!isCapsOn) {
			modifState.shiftToggle = false;
		}
	}

	function keyupHandler(event) {
		/* let key = remapCodes[event.code] || event.code; */
		let key = getFixedCode(event);

		activeSymbol(event, 1);

		if (event.key === 'Shift') {
			modifState.shiftPressed = false;
			modifState.shiftAltPressed = false;
		} else if (event.key === 'Alt' || event.key === 'AltGraph') {
			modifState.altPressed = false;
			modifState.shiftAltPressed = false;
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
				inputState.isSakot = false;
				inputState.recentUnits = [];
				inputState.vnRecentUnits.pop();
				modifyText.rm();
				break;
			case 'Enter':
				inputState.recentUnits = [];
				inputState.vnRecentUnits = [];
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

			if (
				sinput.currentLayout.startsWith("lana") ||
				sinput.currentLayout.startsWith("mymr_") ||
				sinput.currentLayout.startsWith("ahom")
			) {
				let endf = end;
				if (boxText.value.charCodeAt(endf - 3) === 0x7C && boxText.value.charCodeAt(endf - 2) === 0x200B) {
					start++;
				}
				while (endf > 0) {
					if (sinput.currentLayout.startsWith("ahom")) {
						if (boxText.value.charCodeAt(endf - 6) === 0x7C && boxText.value.charCodeAt(endf - 5) === 0x200B) {
							endf -= 2;
							start -= 2;
							continue;
						} else if (boxText.value.charCodeAt(endf - 5) === 0x7C && boxText.value.charCodeAt(endf - 4) === 0x200B) {
							endf -= 1;
							continue;
						}
					}
					if (boxText.value.charCodeAt(endf - 4) === 0x7C && boxText.value.charCodeAt(endf - 3) === 0x200B) {
						endf -= 2;
						start -= 2;
						continue;
					} else if (boxText.value.charCodeAt(endf - 3) === 0x7C && boxText.value.charCodeAt(endf - 2) === 0x200B) {
						endf -= 3;
						start -= 3;
						continue;
					}
					break;
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
				case "　": return "";         // Remove full-width space (U+3000)
				case "u3000": return "\u3000";  // Get full-width back
				case "ZWSP": return "\u200B";   // Zero-width space
				case "ZWNJ": return "\u200C";   // Zero-width non-joiner
				case "ZWJ": return "\u200D";   // Zero-width joiner
			}
		});
		if (sinput.currentLayout.startsWith("lana")) {
			if (/[\u1A6E-\u1A72\u1A55]/u.test(output)) {
				if (inputState.recentUnits.length > 0) {
					modifyText.rm();
				}
				const lastCodePointsString = inputState.recentUnits
					.map(codePoint => codePoint + "|\u200B")
					.join("");
				inputState.recentUnits.push(output);
				output = "|​" + lastCodePointsString + output;

			} else if (inputState.recentUnits.length > 0) {
				const lastCodePointsString = inputState.recentUnits.reverse().join("");

				output = output + lastCodePointsString;
				modifyText.rm();
				inputState.recentUnits = [];
			}
		}

		if (sinput.currentLayout.startsWith("latn-")) {
			const allTnMk = /[̨̧̣̤̦̀́̂̃̄̆̇̈̊̌]/u;
			if (allTnMk.test(output)) {
				var prev = modifyText.prev_a(1);
				modifyText.rm();
				const combined = (prev ? prev : "") + output;
				output = combined.normalize("NFC");
			}
		}

		if (sinput.currentLayout.startsWith("default")) {
			if (output.startsWith("Dead")) {
				output = "";
			}
		}
		return output;
	}

	function chLang() {
		seltrLays.value = sinput.beforeLayout;
		setKeyboardLayout(sinput.beforeLayout);
		resetKbd();
		boxTextFocus();
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
	}

	function resetKbd() {
		modifState.shiftAltPressed = false;
		modifState.shiftAltToggle = false;
		modifState.shiftPressed = false;
		modifState.shiftToggle = false;
		modifState.altPressed = false;
		modifState.altToggle = false;
		inputState.isSakot = false;
		inputState.isSakotWithRa = false;
		inputState.recentUnits = [];
		inputState.vnRecentUnits = [];
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

	/**
		* some keyboards lack a dedicated Backquote key
		*/
	const layoutsData = {
		"default": {
			"name": "This is Placeholder, Reference",
			"main_keys": {
				"Backquote": ["`", "~", "", ""],
				"Digit1": ["1", "!", "", ""],
				"Digit2": ["2", "@", "", ""],
				"Digit3": ["3", "#", "", ""],
				"Digit4": ["4", "$", "", ""],
				"Digit5": ["5", "%", "", ""],
				"Digit6": ["6", "^", "", ""],
				"Digit7": ["7", "&", "", ""],
				"Digit8": ["8", "*", "", ""],
				"Digit9": ["9", "(", "", ""],
				"Digit0": ["0", ")", "", ""],
				"Minus": ["-", "_", "÷", ""],
				"Equal": ["=", "+", "×", ""],
				"KeyQ": ["q", "Q", "‘", ""],
				"KeyW": ["w", "W", "’", ""],
				"KeyE": ["e", "E", "“", ""],
				"KeyR": ["r", "R", "”", ""],
				"KeyT": ["t", "T", "…", ""],
				"KeyY": ["y", "Y", "", ""],
				"KeyU": ["u", "U", "", ""],
				"KeyI": ["i", "I", "", ""],
				"KeyO": ["o", "O", "", ""],
				"KeyP": ["p", "P", "", ""],
				"BracketLeft": ["[", "{", "", ""],
				"BracketRight": ["]", "}", "", ""],
				"KeyA": ["a", "A", "◌", ""],
				"KeyS": ["s", "S", "", ""],
				"KeyD": ["d", "D", "", ""],
				"KeyF": ["f", "F", "", ""],
				"KeyG": ["g", "G", "", ""],
				"KeyH": ["h", "H", "", ""],
				"KeyJ": ["j", "J", "", ""],
				"KeyK": ["k", "K", "", ""],
				"KeyL": ["l", "L", "", ""],
				"Semicolon": [";", ":", "", ""],
				"Quote": ["'", "\"", "", ""],
				"Backslash": ["\\", "|", "", ""],
				"KeyZ": ["z", "Z", "`", ""],
				"KeyX": ["x", "X", "~", ""],
				"KeyC": ["c", "C", "", ""],
				"KeyV": ["v", "V", "", ""],
				"KeyB": ["b", "B", "", ""],
				"KeyN": ["n", "N", "", ""],
				"KeyM": ["m", "M", "", ""],
				"Comma": [",", "<", "«", ""],
				"Period": [".", ">", "»", ""],
				"Slash": ["/", "?", "", ""],
				"Space": [" ", " ", " ", " "],
				"IntlBackslash": ["<", ">", "", ""],
				"IntlRo": ["_", "_", "", ""],
				"IntlYen": ["¥", "|", "", ""],
			}
		},
		"thai-mnc": {
			"name": "Thai Manoonchai",
			"main_keys": {
				"Backquote": ["`", "~", "`", "~"],
				"Digit1": ["1", "!", "๑", ""],
				"Digit2": ["2", "@", "๒", ""],
				"Digit3": ["3", "#", "๓", ""],
				"Digit4": ["4", "$", "๔", ""],
				"Digit5": ["5", "%", "๕", ""],
				"Digit6": ["6", "^", "๖", ""],
				"Digit7": ["7", "&", "๗", ""],
				"Digit8": ["8", "*", "๘", ""],
				"Digit9": ["9", "(", "๙", ""],
				"Digit0": ["0", ")", "๐", ""],
				"Minus": ["-", "_", "÷", ""],
				"Equal": ["=", "+", "×", ""],
				"KeyQ": ["ใ", "ฒ", "‘", ""],
				"KeyW": ["ต", "ฏ", "’", ""],
				"KeyE": ["ห", "ซ", "“", ""],
				"KeyR": ["ล", "ญ", "”", ""],
				"KeyT": ["ส", "ฟ", "…", ""],
				"KeyY": ["ป", "ฉ", "", ""],
				"KeyU": ["ั", "ึ", "ฺ", "ົ"],
				"KeyI": ["ก", "ธ", "", ""],
				"KeyO": ["ิ", "ฐ", "", ""],
				"KeyP": ["บ", "ฎ", "", ""],
				"BracketLeft": ["็", "ฆ", "[", "{"],
				"BracketRight": ["ฬ", "ฑ", "]", "}"],
				"KeyA": ["ง", "ษ", "◌", ""],
				"KeyS": ["เ", "ถ", "๏", ""],
				"KeyD": ["ร", "แ", "๛", ""],
				"KeyF": ["น", "ช", "฿", ""],
				"KeyG": ["ม", "พ", "", ""],
				"KeyH": ["อ", "ผ", "ํ", ""],
				"KeyJ": ["า", "ำ", "ๅ", ""],
				"KeyK": ["่", "ข", "ฃ", ""],
				"KeyL": ["้", "โ", "", ""],
				"Semicolon": ["ว", "ภ", ";", ":"],
				"Quote": ["ื", "\"", "'", ""],
				"Backslash": ["ฯ", "ฌ", "\\", "|"],
				"KeyZ": ["ุ", "ฤ", "ฦ", ""],
				"KeyX": ["ไ", "ฝ", "", ""],
				"KeyC": ["ท", "ๆ", "๚", "«"],
				"KeyV": ["ย", "ณ", "", "»"],
				"KeyB": ["จ", "๊", "", ""],
				"KeyN": ["ค", "๋", "ฅ", "–"],
				"KeyM": ["ี", "์", "๎", "—"],
				"Comma": ["ด", "ศ", ",", "<"],
				"Period": ["ะ", "ฮ", ".", ">"],
				"Slash": ["ู", "?", "/", ""],
				"Space": [" ", " ", " ", " "],
				"IntlBackslash": [".", ",", "", ""],
				"IntlRo": [".", ",", "+", "_"],
				"IntlYen": ["`", "~", "", ""],
			},
		},
		"thai-mnc-jis": {
			"name": "Thai Manoonchai JIS",
			"main_keys": {
				"Backquote": ["\\", "|", "¥", "|"],
				"Digit1": ["1", "!", "๑", ""],
				"Digit2": ["2", "\"", "๒", ""],
				"Digit3": ["3", "#", "๓", ""],
				"Digit4": ["4", "$", "๔", ""],
				"Digit5": ["5", "%", "๕", ""],
				"Digit6": ["6", "&", "๖", ""],
				"Digit7": ["7", "'", "๗", ""],
				"Digit8": ["8", "(", "๘", ""],
				"Digit9": ["9", ")", "๙", ""],
				"Digit0": ["0", "_", "๐", ""],
				"Minus": ["-", "=", "÷", ""],
				"Equal": ["^", "~", "×", ""],
				"KeyQ": ["ใ", "ฒ", "‘", ""],
				"KeyW": ["ต", "ฏ", "’", ""],
				"KeyE": ["ห", "ซ", "“", ""],
				"KeyR": ["ล", "ญ", "”", ""],
				"KeyT": ["ส", "ฟ", "…", ""],
				"KeyY": ["ป", "ฉ", "", ""],
				"KeyU": ["ั", "ึ", "ฺ", "ົ"],
				"KeyI": ["ก", "ธ", "", ""],
				"KeyO": ["ิ", "ฐ", "", ""],
				"KeyP": ["บ", "ฎ", "", ""],
				"BracketLeft": ["็", "ฆ", "@", "`"],
				"BracketRight": ["ฬ", "ฑ", "[", "{"],
				"KeyA": ["ง", "ษ", "◌", ""],
				"KeyS": ["เ", "ถ", "๏", ""],
				"KeyD": ["ร", "แ", "๛", ""],
				"KeyF": ["น", "ช", "฿", ""],
				"KeyG": ["ม", "พ", "", ""],
				"KeyH": ["อ", "ผ", "ํ", ""],
				"KeyJ": ["า", "ำ", "ๅ", ""],
				"KeyK": ["่", "ข", "ฃ", ""],
				"KeyL": ["้", "โ", "", ""],
				"Semicolon": ["ว", "ภ", ";", "+"],
				"Quote": ["ื", "*", ":", "*"],
				"Backslash": ["ฯ", "ฌ", "]", "}"],
				"KeyZ": ["ุ", "ฤ", "ฦ", ""],
				"KeyX": ["ไ", "ฝ", "", ""],
				"KeyC": ["ท", "ๆ", "๚", "«"],
				"KeyV": ["ย", "ณ", "", "»"],
				"KeyB": ["จ", "๊", "", ""],
				"KeyN": ["ค", "๋", "ฅ", "–"],
				"KeyM": ["ี", "์", "๎", "—"],
				"Comma": ["ด", "ศ", ",", "<"],
				"Period": ["ะ", "ฮ", ".", ">"],
				"Slash": ["ู", "?", "/", ""],
				"Space": [" ", " ", " ", " "],
				"IntlBackslash": [".", ",", "", ""],
				"IntlRo": [".", ",", "+", "_"],
				"IntlYen": ["\\", "|", "¥", "|"],
			},
		},
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
