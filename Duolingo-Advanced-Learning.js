function setItm(prop, val) { localStorage.setItem(prop, val); }
function getItm(prop) { return localStorage.getItem(prop); }

var keyboardDefined = false;
if (getItm('keyboard')) keyboardDefined = true;

var textareaSel = '[data-test="challenge-translate-input"]:not([autocorrect]):not([spellcheck])',
	isFound = false,
	newid,
	parent;
setInterval(function(){
	if (!isFound) {
		var textarea = document.querySelectorAll('._1eYrt._3T--_ ' + textareaSel + ', ._1ZoK4._3T--_ ' + textareaSel)[0];
		if (!!textarea) {
			if (!isFound) {
				isFound = true;

				newid = Math.floor(Math.random() * Math.floor(1000));
				textarea.id = 'textarea' + newid;

				var frames = document.querySelectorAll('._1eYrt._3T--_, ._1ZoK4._3T--_');
				frames[frames.length - 1].id = 'frame' + newid;
				parent = document.getElementById('frame' + newid);

				var header = parent.querySelectorAll('h1._1Zqmf[data-test="challenge-header"] span')[0];
				if (header.innerText == 'Write this in English') header.innerText = 'Write down and translate what you hear';

				textarea.parentNode.insertAdjacentHTML('beforebegin', '<div id="newwrap' + newid + '" class="newwrap animated fast"><textarea data-test="challenge-translate-input" id="typewhatyouhear' + newid + '" class="_7q434 _1qCW5 _2fPEB _3_NyK _1Juqt typewhatyouhear" dir="ltr" placeholder="Type what you hear"></textarea><div class="badge">1</div><audio id="successSound' + newid + '"><source src="https://res.cloudinary.com/dn6n8yqqh/video/upload/v1555571470/DuolingoSuccessMP3.mp3" type="audio/mpeg"><source src="https://res.cloudinary.com/dn6n8yqqh/video/upload/v1555571639/DuolingoSuccessOGG.ogg" type="audio/ogg"><source src="https://res.cloudinary.com/dn6n8yqqh/video/upload/v1555571640/DuolingoSuccessWAV.wav" type="audio/wav"></audio></div>');
				textarea.parentNode.classList.add('relative');
				textarea.insertAdjacentHTML('afterend','<div class="badge">2</div>');
				textarea.classList.add('secondary');
				textarea.disabled = true;
				
				var newarea = document.getElementById('typewhatyouhear' + newid);
				document.getElementById('newwrap' + newid).parentNode.classList.add('flexrow');
				newarea.classList.add('green');
				newarea.focus();


				var elements = parent.querySelectorAll('div[data-test="challenge-translate-prompt"]'),
					sentence = "";
				elements = elements[elements.length - 1].querySelectorAll('[data-test="hint-token"]');
				for (var i = 0; i < elements.length; i++) sentence += elements[i].innerText.toLowerCase();

				var nativeKeyboardButtons = parent.querySelectorAll('#textarea' + newid + ' + .I1fg4 ._1tSEs.oNqWF._3hso2._3skMI._1AM95');
				function toggleNativeKeyboard(state) {
					if (!!parent.querySelectorAll('#textarea' + newid + ' + .I1fg4')[0]) {
						for (var i = 0; i < nativeKeyboardButtons.length; i++) {
							nativeKeyboardButtons[i].disabled = state;
						}
					}
				}

				var keybuttons = parent.querySelectorAll('#newwrap' + newid + ' ._1tSEs.oNqWF._3hso2._3skMI._1AM95');
				function toggleNewKeyboard(state) {
					if (!!parent.querySelectorAll('#newwrap' + newid + ' .I1fg4')[0]) {
						for (var i = 0; i < keybuttons.length; i++) {
							keybuttons[i].disabled = state;
						}
					}
				}

				toggleNativeKeyboard(true);
				newarea.addEventListener("keydown", function (e) {
					if (e.keyCode === 13) validate(e);
					if (e.keyCode === 27) {
						textarea.disabled = false;
						textarea.classList.replace('secondary', 'green');
						textarea.focus();

						newarea.disabled = true;
						newarea.classList.add('secondary');

						toggleNewKeyboard(true);
						toggleNativeKeyboard(false);
					}
				});
				function validate(e) {
					function removeDotAndExcMarks(string) { return string.replace(/[ ][.?!]$/g, '').replace(/[.?!]$/g, '').replace(/[¿]/g, '').replace(/[¡]/g, ''); }
					function replaceNonLatin(string) { return string.replace(/[æ]/g, 'ae').replace(/[ø]/g, 'oe').replace(/[å]/g, 'aa').replace(/[ß]/g, 'ss').replace(/[œ]/g, 'oe').replace(/[ñ]/g, 'n\''); }
					function normalize(string) { return string.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); }
					var text = e.target.value.replace(/[ ]$/g, '').replace(/^[ ]/g, '').replace(/[/:]/g, '').replace(/[ ][ ]/g, ' ').toLowerCase(),
						noCommas = sentence.replace(/[,][ ]/g, ' '),
						filteredSentence = removeDotAndExcMarks(sentence),
						filteredNoCommas = removeDotAndExcMarks(noCommas),
						newwrap = document.getElementById('newwrap' + newid);
					if ([sentence, filteredSentence,
						replaceNonLatin(sentence), normalize(sentence), normalize(replaceNonLatin(sentence)),
						replaceNonLatin(filteredSentence), normalize(filteredSentence), normalize(replaceNonLatin(filteredSentence)),
						noCommas, filteredNoCommas,
						replaceNonLatin(noCommas), normalize(noCommas), normalize(replaceNonLatin(noCommas)),
						replaceNonLatin(filteredNoCommas), normalize(filteredNoCommas), normalize(replaceNonLatin(filteredNoCommas))].includes(text)) {
						textarea.classList.replace('secondary', 'green');
						textarea.disabled = false;
						textarea.focus();

						newarea.disabled = true;
						newarea.classList.add('secondary','success');

						newwrap.classList.replace('fast','faster');
						newwrap.classList.add('pulse');
						
						var player = document.getElementById('successSound' + newid);
						player.volume = 0.3;
						player.play();

						toggleNewKeyboard(true);
						toggleNativeKeyboard(false);
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
					var keybuttons = parent.querySelectorAll('#newwrap' + newid + ' ._1tSEs.oNqWF._3hso2._3skMI._1AM95');
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

					if (keybuttons[0].innerText == '↓') lowerCase();
					for (var i = 0; i < keybuttonslength; i++) keybuttons[i].disabled = false;

					keybuttons[0].onclick = function(){
						if (this.innerText == '↓') lowerCase();
						else upperCase();
					}
					for (var i = 1; i < keybuttonslength; i++) {
						keybuttons[i].onclick = function(){
							newarea.value += this.innerText;
							newarea.focus();
						}
					}
				}
			}
		}
	}
	else if (typeof document.querySelectorAll('._1eYrt._3T--_ #textarea' + newid + ', ._1ZoK4._3T--_  #textarea' + newid)[0] === 'undefined') isFound = false;

	var targetLangInput = document.querySelectorAll('textarea[autocorrect][spellcheck]')[0];
	if (!!targetLangInput){
		var keyboard = document.querySelectorAll('textarea[autocorrect][spellcheck] + .I1fg4')[0];
		if (!!keyboard) {
			if (!keyboardDefined || keyboard.innerHTML !== getItm('keyboard')) setItm('keyboard',keyboard.innerHTML);
		}
		else setItm('keyboard', '');
	}
},25);
