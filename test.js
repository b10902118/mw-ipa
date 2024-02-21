const cheerio = require('cheerio');

async function ipa(word) {
	let pronunciation = null;

	for (let i = 0; i < 3; i++) {
		try {
			const response = await fetch(`https://dictionary.cambridge.org/dictionary/english/${word}`);
			const content = await response.text();
			const $ = cheerio.load(content);
			pronunciation = $('span.ipa.dipa.lpr-2.lpl-1').eq(1).text();
			if (pronunciation) {
				break; // Exit the loop if pronunciation is found
			}
		} catch (error) {
			console.error(`Error ${i}:`, error);
		}
	}

	return pronunciation;
}


ipa()

