(function () {
	const lastContentValue = localStorage.getItem('content');
	const content = document.getElementById('content');
	const contentLengthWithBlankWithNewLine = document.getElementById('contentLengthWithBlankWithNewLine');
	const contentByteLengthWithBlankWithNewLine = document.getElementById('contentByteLengthWithBlankWithNewLine');
	const contentLengthWithBlankWithoutNewLine = document.getElementById('contentLengthWithBlankWithoutNewLine');
	const contentByteLengthWithBlankWithoutNewLine = document.getElementById('contentByteLengthWithBlankWithoutNewLine');
	const contentLengthWithoutBlankWithoutNewLine = document.getElementById('contentLengthWithoutBlankWithoutNewLine');
	const contentByteLengthWithoutBlankWithoutNewLine = document.getElementById('contentByteLengthWithoutBlankWithoutNewLine');
	const saveIndicator = document.getElementById('saveIndicator');
	let isSaving = false;
	let timeoutId;
	
	function getByteLength(string){
		let byte = 0;
		let character;

		for(let i = 0; i < string['length']; i++) {
			
			character = string.charCodeAt(i);

			byte += character >> 11 != 0 ? 3 : character >> 7 != 0 ? 2 : 1;
		}

		return byte;
	}

	function saveContent() {
		if(!isSaving) {
			isSaving = true;

			localStorage.setItem('content', content['value']);

			let intervalId = window.setInterval(function () {
				if(saveIndicator['style']['opacity'] != 1) {
					saveIndicator['style']['opacity'] = Number(saveIndicator['style']['opacity']) + 0.01;
				} else {
					window.clearInterval(intervalId);
					intervalId = window.setInterval(function () {
						if(saveIndicator['style']['opacity'] != 0) {
							saveIndicator['style']['opacity'] = Number(saveIndicator['style']['opacity']) - 0.01;
						} else {
							window.clearInterval(intervalId);
							isSaving = false;
						}
	
						return;
					}, 7);
				}
				
				return;
			}, 7);
		}

		return;
	}

	function countContent() {
		const textWithBlankWithoutNewLine = content['value'].replace(/\n/g, '');
		const textWithoutBlankWithoutNewLine = content['value'].replace(/\n|\s|\t/g, '');
		
		contentLengthWithBlankWithNewLine['textContent'] = content['value']['length'];
		contentByteLengthWithBlankWithNewLine['textContent'] = getByteLength(content['value']);
		contentLengthWithBlankWithoutNewLine['textContent'] = textWithBlankWithoutNewLine['length'];
		contentByteLengthWithBlankWithoutNewLine['textContent'] = getByteLength(textWithBlankWithoutNewLine);
		contentLengthWithoutBlankWithoutNewLine['textContent'] = textWithoutBlankWithoutNewLine['length'];
		contentByteLengthWithoutBlankWithoutNewLine['textContent'] = getByteLength(textWithoutBlankWithoutNewLine);

		return;
	}
	
	content.addEventListener('input', function () {
		if(typeof(timeoutId) === 'number') {
			window.clearTimeout(timeoutId);
		}
		
		timeoutId = window.setTimeout(function () {
			saveContent();

			return;
		}, 5000);

		countContent();

		return;
	});

	document['body'].addEventListener('keydown', function (keyboardEvent) {
		switch(keyboardEvent['key']) {
			case 'Enter': {
				if(document['activeElement']['id'] !== 'content') {
					content.focus();
				}

				break;
			}
			case 'Escape': {
				if(document['activeElement']['id'] === 'content') {
					const temporaryTextarea = document.createElement('textarea');
					document['body'].appendChild(temporaryTextarea);
					temporaryTextarea.focus();
					temporaryTextarea.remove();
				}
				
				break;
			}
			case 's': {
				if(keyboardEvent['ctrlKey']) {
					keyboardEvent.preventDefault();

					saveContent();
				}

				break;
			}
		}

		return;
	});

	if(typeof(lastContentValue) === 'string') {
		content['value'] = lastContentValue;
		countContent();
	} else {
		localStorage.setItem('content', '');
	}
})();
