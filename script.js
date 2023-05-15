(function () {
	const textArea = document.getElementById('textarea');
	const textLengthWithBlankWithNewLine = document.getElementById('textLengthWithBlankWithNewLine');
	const textByteLengthWithBlankWithNewLine = document.getElementById('textByteLengthWithBlankWithNewLine');
	const textLengthWithBlankWithoutNewLine = document.getElementById('textLengthWithBlankWithoutNewLine');
	const textByteLengthWithBlankWithoutNewLine = document.getElementById('textByteLengthWithBlankWithoutNewLine');
	const textLengthWithoutBlankWithoutNewLine = document.getElementById('textLengthWithoutBlankWithoutNewLine');
	const textByteLengthWithoutBlankWithoutNewLine = document.getElementById('textByteLengthWithoutBlankWithoutNewLine');

	
	function getByteLength(string){
		let byte = 0;
		let character;

		for(let i = 0; i < string['length']; i++) {
			
			character = string.charCodeAt(i);

			byte += character >> 11 != 0 ? 3 : character >> 7 != 0 ? 2 : 1;
		}

		return byte;
	}
	
	textArea.addEventListener('input', function () {
		const textWithBlankWithoutNewLine = textArea['value'].replace(/\n/g, '');
		const textWithoutBlankWithoutNewLine = textArea['value'].replace(/\n|\s|\t/g, '');
		
		textLengthWithBlankWithNewLine['textContent'] = textArea['value']['length'];
		textByteLengthWithBlankWithNewLine['textContent'] = getByteLength(textArea['value']);
		textLengthWithBlankWithoutNewLine['textContent'] = textWithBlankWithoutNewLine['length'];
		textByteLengthWithBlankWithoutNewLine['textContent'] = getByteLength(textWithBlankWithoutNewLine);
		textLengthWithoutBlankWithoutNewLine['textContent'] = textWithoutBlankWithoutNewLine['length'];
		textByteLengthWithoutBlankWithoutNewLine['textContent'] = getByteLength(textWithoutBlankWithoutNewLine);
		
		return;
	});
})();