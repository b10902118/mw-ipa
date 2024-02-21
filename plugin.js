// ==UserScript==
// @name         MW-IPA
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Merriam Webster IPA
// @author       You
// @match        https://www.merriam-webster.com/dictionary/*
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	// Your code here...
	//alert('Hello World !');

	async function fetchHTML(url) {
		try {
			const response = await fetch(url);
			//fetch(url).then(d => d.text()).then(d => console.log(d))
			//return null
			if (response.ok) {
				return await response.text();
			} else {
				console.error('Failed to fetch data from the website. Status:', response.status);
				return null;
			}
		} catch (error) {
			console.error('Error fetching data from the website:', error);
			return null;
		}
	}

	// Function to scrape data from the HTML content
	function scrapeData(html) {
		/* string not found
		const foundIndex = html.indexOf('erˈoʊ.bɪk');

		if (foundIndex !== -1) {
			console.log(`Substring "${'erˈoʊ.bɪk'}" found at index ${foundIndex}.`);
		} else {
			console.log(`Substring "${'erˈoʊ.bɪk'}" not found in the text.`);
		}
		*/


		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');

		console.log(doc)
		// Replace the following selector with the one that targets the relevant data
		//const dataElement = doc.getElementsByClassName('ipa dipa lpr-2 lpl-1');
		//const dataElement = doc.getElementsByClassName('pr cm-fc cms lm-auto');
		//const dataElement = doc.querySelectorAll("#page-content > div.page > div.pr.dictionary > div.link > div > div.di-body > div > div > div > div.pos-header.dpos-h > span.us.dpron-i > span.pron.dpron > span");
		//const dataElement = doc.querySelectorAll('span.ipa.dipa.lpr-2.lpl-1');
		console.log(dataElement)

		// Process the scraped data
		const ipa = dataElement.textContent;
		// ...
		// Add the data to your site (modify this part according to your site's structure)
		document.querySelector("#dictionary-entry-1 > div.row.entry-header > div > div.row.entry-attr.mb-3.mt-2 > div").appendChild(document.createTextNode(ipa))
	}

	// Execute the scraping function after the page has loaded
	window.addEventListener('load', async function () {
		// Replace the URL with the one from which you want to scrape data
		const word = window.location.pathname.substring(12);
		const url = 'https://ws1.csie.org:8787/lookup/' + word;
		const ipa = await fetch(url).then(d => d.text());
		//document.querySelector("#dictionary-entry-1 > div.row.entry-header > div > div.row.entry-attr.mb-3.mt-2 > div").appendChild(document.createTextNode(ipa))
		const newSpan = document.createElement('span');
		newSpan.classList.add('mw', 'no-badge')
		newSpan.style.paddingLeft = '10px';
		newSpan.textContent = '[' + ipa + ']';
		document.querySelector("#dictionary-entry-1 > div.row.entry-header > div > div.entry-header-content.d-flex.flex-wrap.align-items-baseline.flex-row.mb-0").appendChild(newSpan)
		//console.log(ipa);
		/*
				if (html) {
					scrapeData(html);
				}
		*/
	});
})();
