const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

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

app.post('/api/v1/tours', (req, res) => {
	const newID = tours[tours.length - 1].id + 1;
	const newData = Object.assign({ id: newID }, req.body);
	tours.push(newData);

	fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
		res.status(201).json({
			status: 'success',
			tour: newData
		});
	});
});

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Accessing Root URL and testing sending response JSON', app: 'natours' });
});

app.listen(3000, () => {
	console.log('Farjun API Server Online With Port 3000!!!');
});
