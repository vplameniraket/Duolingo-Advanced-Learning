// ==UserScript==
// @name         Duolingo Advanced Learning
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Listen, write down and translate!
// @author       dogewithflowers
// @icon         https://res.cloudinary.com/dn6n8yqqh/image/upload/c_scale,h_214/v1555635245/Icon_qqbnzf.png
// @match        https://www.duolingo.com/*
// @grant        GM_addStyle
// @copyright    2019, vplameniraket (https://openuserjs.org/users/vplameniraket)
// @license      MIT
// ==/UserScript==

GM_addStyle("._7q434 { max-height: 100px; } .newwrap {margin-right: 15px; min-width: calc(50% - 8px); position: relative;} .newwrap .I1fg4, .newwrap + div .I1fg4 {display: flex; flex-wrap: wrap; margin-top: -10px; } .flexrow {display: flex;} .secondary {opacity:.6; cursor: default;} @-webkit-keyframes shake { from, to { -webkit-transform: translateX(0); transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { -webkit-transform: translateX(-3px); transform: translateX(-3px); } 20%, 40%, 60%, 80% { -webkit-transform: translateX(3px); transform: translateX(3px); } } @keyframes shake { from, to { -webkit-transform: translateX(0); transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { -webkit-transform: translateX(-3px); transform: translateX(-3px); } 20%, 40%, 60%, 80% { -webkit-transform: translateX(3px); transform: translateX(3px); } } .shake { -webkit-animation-name: shake; animation-name: shake; }");
GM_addStyle("@-webkit-keyframes pulse { from { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); } 50% { -webkit-transform: scale3d(1.03, 1.03, 1.03); transform: scale3d(1.03, 1.03, 1.03); } to { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); } } @keyframes pulse { from { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); } 50% { -webkit-transform: scale3d(1.03, 1.03, 1.03); transform: scale3d(1.03, 1.03, 1.03); } to { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); } } .pulse { -webkit-animation-name: pulse; animation-name: pulse; color: #4e8606 !important; }");
GM_addStyle(".relative { position:relative; } .badge { position: absolute; z-index: 10; width: 30px; height: 30px; border-radius: 50%; text-align: center; box-sizing: border-box; padding-top: 5px; font-weight: bold; font-size: 17px; left: -13px; top: -14px; transition: all .2s ease-in-out; } .green + .badge {background-color: #78c713; color: #fff; box-shadow: 0 0 0 2px #78c713 inset;} .badge, textarea[disabled] + .badge { background-color: #f0f0f0; box-shadow: 0 0 0 2px #e5e5e5 inset; color: #c7c7c7;} .typewhatyouhear.success { color: #5b980e; } .success + .badge { box-shadow: 0 0 0 2px #e8e8e8 inset !important; background-color: #f6f6f6 !important; }");
GM_addStyle(".animated { -webkit-animation-duration: 1s; animation-duration: 1s; -webkit-animation-fill-mode: both; animation-fill-mode: both; } .animated.fast { -webkit-animation-duration: 800ms; animation-duration: 800ms; } .animated.faster { -webkit-animation-duration: 500ms; animation-duration: 500ms; }");

(function() {
	'use strict';

	window.onload = function () {

		function setItm(prop, val) { localStorage.setItem(prop, val); }
		function getItm(prop) { return localStorage.getItem(prop); }

		var keyboardDefined = false;
		if (getItm('keyboard')) keyboardDefined = true;

		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		var isFound = false,
			idDefined = false,
			newid,
			newArea,
			parent;
		setInterval(function(){
			if (!isFound && !idDefined) {
				var textarea = document.querySelectorAll('._1eYrt._3T--_ textarea[data-test="challenge-translate-input"]:not([autocorrect]):not([spellcheck]), ._1ZoK4._3T--_  textarea[data-test="challenge-translate-input"]:not([autocorrect]):not([spellcheck])')[0];
				if (!!textarea) {
					if (!isFound) {
						isFound = true;
						newid = getRandomInt(1000);
						textarea.id = 'textarea' + newid;
						var frames = document.querySelectorAll('._1eYrt._3T--_, ._1ZoK4._3T--_');
						frames[frames.length - 1].id = 'frame' + newid;
						parent = document.getElementById('frame' + newid);
						idDefined = true;
						textarea.parentNode.insertAdjacentHTML('beforebegin', '<div id="newwrap' + newid + '" class="newwrap animated fast"><textarea data-test="challenge-translate-input" id="typewhatyouhear' + newid + '" class="_7q434 _1qCW5 _2fPEB _3_NyK _1Juqt typewhatyouhear" dir="ltr" placeholder="Type what you hear"></textarea><div class="badge">1</div><audio id="successSound' + newid + '"><source src="https://res.cloudinary.com/dn6n8yqqh/video/upload/v1555571470/DuolingoSuccessMP3.mp3" type="audio/mpeg"><source src="https://res.cloudinary.com/dn6n8yqqh/video/upload/v1555571639/DuolingoSuccessOGG.ogg" type="audio/ogg"><source src="https://res.cloudinary.com/dn6n8yqqh/video/upload/v1555571640/DuolingoSuccessWAV.wav" type="audio/wav"></audio></div>');
						textarea.insertAdjacentHTML('afterend','<div class="badge">2</div>');
						textarea.parentNode.classList.add('relative');
						var newarea = document.getElementById('typewhatyouhear' + newid);
						document.getElementById('newwrap' + newid).parentNode.classList.add('flexrow');
						newarea.classList.add('green');
						newarea.focus();
						textarea.disabled = true;
						textarea.classList.add('secondary');
						var elements = parent.querySelectorAll('div[data-test="challenge-translate-prompt"]');
						elements = elements[elements.length - 1].querySelectorAll('[data-test="hint-token"]');
						var sentence = "";
						for (var i = 0; i < elements.length; i++) {
							sentence += elements[i].innerText;
						}
						newarea.addEventListener("keydown", function (e) {
							if (e.keyCode === 13) validate(e);
							if (e.keyCode === 27) {
								textarea.disabled = false;
								textarea.classList.remove('secondary');
								textarea.focus();
								newarea.disabled = true;
								newarea.className += ' secondary';
								var keybuttons = parent.querySelectorAll('._1tSEs.oNqWF._3hso2._3skMI._1AM95');
								if (!!parent.querySelectorAll('#newwrap' + newid + ' .I1fg4')[0]) {
									for (var i = 0; i < keybuttons.length; i++) {
										keybuttons[i].disabled = true;
									}
								}
								if (!!nativeKeyboard) {
									var nativeKeyboardButtons = parent.querySelectorAll('textarea[data-test="challenge-translate-input"]:not([autocorrect]):not([spellcheck]) + .I1fg4 ._1tSEs.oNqWF._3hso2._3skMI._1AM95');
									for (var i = 0; i < nativeKeyboardButtons.length; i++) {
										nativeKeyboardButtons[i].disabled = false;
									}
								}
							}
						});
						var nativeKeyboard = parent.querySelectorAll('textarea[data-test="challenge-translate-input"]:not([autocorrect]):not([spellcheck]) + .I1fg4')[0];
						if (!!nativeKeyboard) {
							var nativeKeyboardButtons = parent.querySelectorAll('textarea[data-test="challenge-translate-input"]:not([autocorrect]):not([spellcheck]) + .I1fg4 ._1tSEs.oNqWF._3hso2._3skMI._1AM95');
							for (var i = 0; i < nativeKeyboardButtons.length; i++) {
								nativeKeyboardButtons[i].disabled = true;
							}
						}
						function validate(e) {
							var text = e.target.value.replace(/[ ]$/g, '').replace(/^[ ]/g, '').replace(/[/:]/g, ''),
								filteredSentence = sentence.replace(/[ ][.?!]$/g, '').replace(/[.?!]$/g, '').replace(/[¿]/g, ''),
								newwrap = document.getElementById('newwrap' + newid);
							if (text.toLowerCase() == sentence.toLowerCase() || text.toLowerCase() == filteredSentence.toLowerCase() || text.toLowerCase() == sentence.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() || text.toLowerCase() == filteredSentence.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) {
								textarea.disabled = false;
								textarea.classList.remove('secondary');
								textarea.classList.add('green');
								textarea.focus();
								newarea.disabled = true;
								newarea.className += ' secondary success';
								newwrap.classList.remove('fast');
								newwrap.className += ' faster pulse';
								var player = document.getElementById('successSound' + newid);
								var keybuttons = parent.querySelectorAll('._1tSEs.oNqWF._3hso2._3skMI._1AM95');
								if (!!parent.querySelectorAll('#newwrap' + newid + ' .I1fg4')[0]) {
									for (var i = 0; i < keybuttons.length; i++) {
										keybuttons[i].disabled = true;
									}
								}
								if (!!nativeKeyboard) {
									var nativeKeyboardButtons = parent.querySelectorAll('textarea[data-test="challenge-translate-input"]:not([autocorrect]):not([spellcheck]) + .I1fg4 ._1tSEs.oNqWF._3hso2._3skMI._1AM95');
									for (var i = 0; i < nativeKeyboardButtons.length; i++) {
										nativeKeyboardButtons[i].disabled = false;
									}
								}
								player.volume = 0.3;
								player.play();
							}
							else {
								newwrap.classList.remove('shake');
								newwrap.classList.add('shake');
								setTimeout(function(){
									newwrap.classList.remove('shake');
								},800);
							}
						}
						if (keyboardDefined && getItm('keyboard') !== '') {
							document.getElementById('newwrap' + newid).insertAdjacentHTML('beforeend', '<div class="I1fg4 _3bmJ2">' + getItm('keyboard') + '</div>');
							var keybuttons = parent.querySelectorAll('._1tSEs.oNqWF._3hso2._3skMI._1AM95'),
								keybuttonslength = keybuttons.length;

							function lowerCase() {
								keybuttons[0].innerText = '↑';
								for (var i = 1; i < keybuttonslength; i++) {
									keybuttons[i].innerText = keybuttons[i].innerText.toLowerCase();
								}
							}
							function upperCase() {
								keybuttons[0].innerText = '↓';
								for (var i = 1; i < keybuttonslength; i++) {
									keybuttons[i].innerText = keybuttons[i].innerText.toUpperCase();
								}
							}
							function enableButtons() {
								for (var i = 0; i < keybuttonslength; i++) {
									keybuttons[i].disabled = false;
								}
							}
							function resetRegister(){
								if (keybuttons[0].innerText == '↓') {
									lowerCase();
								}
							}
							resetRegister();
							enableButtons();
							keybuttons[0].onclick = function(){
								if (this.innerText == '↓') {
									lowerCase();
								}
								else {
									upperCase();
								}
							}
							for (var i = 1; i < keybuttonslength; i++) {
								keybuttons[i].onclick = function(){
									var elem = document.getElementById('typewhatyouhear' + newid);
									elem.value += this.innerText;
									elem.focus();
								}
							}
						}
					}
				}
			}
			else {
				newArea = document.querySelectorAll('._1eYrt._3T--_ #textarea' + newid + '[data-test="challenge-translate-input"]:not([autocorrect]):not([spellcheck]), ._1ZoK4._3T--_  #textarea' + newid + '[data-test="challenge-translate-input"]:not([autocorrect]):not([spellcheck])')[0];
				if (typeof newArea === 'undefined') {
					isFound = false;
					idDefined = false;
				}
			}
			var targetLangInput = document.querySelectorAll('textarea[autocorrect][spellcheck]')[0];
			if (!!targetLangInput){
				var keyboard = document.querySelectorAll('textarea[autocorrect][spellcheck] + .I1fg4')[0];
				if (!!keyboard) {
					if (!keyboardDefined || keyboard.innerHTML !== getItm('keyboard')) {
						setItm('keyboard',keyboard.innerHTML);
					}
				}
				else {
					setItm('keyboard', '');
				}
			}
		},25);
	}
})();
