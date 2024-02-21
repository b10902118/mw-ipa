const express = require('express');
const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs')
const cors = require('cors');

const app = express();
const PORT = 8787;
const IP = '140.112.30.186'

//app.use(express.json());
// Enable CORS for all origins
app.use(cors());


async function ipa(word) {
	let pronunciation = null;

	for (let i = 0; i < 3; i++) {
		try {
			const response = await fetch(`https://dictionary.cambridge.org/dictionary/english/${word}`);
			const content = await response.text();
			const $ = cheerio.load(content);
			pronunciation = $('span.ipa.dipa.lpr-2.lpl-1').eq(1).text();
			console.log(pronunciation)
			if (pronunciation) {
				break; // Exit the loop if pronunciation is found
			}
		} catch (error) {
			console.error(`Error ${i}:`, error);
		}
	}

	return pronunciation;
}

app.get('/lookup/:word', async (req, res) => {
	//const { word } = req.body;
	const { word } = req.params;
	console.log(word)

	const pronunciation = await ipa(word);
	if (!pronunciation) {
		return res.status(500).send('Error');
	}
	return res.send(pronunciation);
});

const options = {
	key: fs.readFileSync('/home/student/10/b10902118/tmp/mw-ipa/server.key'), // Path to your private key file
	cert: fs.readFileSync('/home/student/10/b10902118/tmp/mw-ipa/server.crt'), // Path to your SSL certificate file
};

const server = https.createServer(options, app);

// Start the server
server.listen(PORT, IP, () => {
	console.log(`Server is running on https://${IP}:${PORT}`);
});

//app.listen(PORT, IP, () => {
//	console.log(`Server is running on port ${PORT}`);
//});
