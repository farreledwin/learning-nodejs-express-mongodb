const express = require('express');
const fs = require('fs');

const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours
		}
	});
});

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Accessing Root URL and testing sending response JSON', app: 'natours' });
});

app.listen(3000, () => {
	console.log('Farjun API Server Online With Port 3000!!!');
});
