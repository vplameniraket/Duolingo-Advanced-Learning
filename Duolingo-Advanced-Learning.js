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
