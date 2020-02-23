const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours
		}
	});
};

const getToursById = (req, res) => {
	console.log(req.params.id);
	const tour = tours.find((el) => el.id === req.params.id * 1);
	tour.name = 'farjun';
	if (req.params.id > tours.length) {
		return res.status(404).json({
			status: 'failed'
		});
	}

	res.status(200).json({
		results: 'OK',
		data: {
			tour
		}
	});
};

const addnewdata = (req, res) => {
	const newID = tours[tours.length - 1].id + 1;
	const newData = Object.assign({ id: newID }, req.body);
	tours.push(newData);

	fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
		res.status(201).json({
			status: 'success',
			tour: newData
		});
	});
};

const getAllUsers = (req, res) => {
	res.status(500).json({
		status: 'failed',
		message: 'coming soon feature'
	});
};

const createUser = (req, res) => {
	res.status(500).json({
		status: 'failed',
		message: 'coming soon feature'
	});
};

const getUser = (req, res) => {
	res.status(500).json({
		status: 'failed',
		message: 'coming soon feature'
	});
};

const updateUser = (req, res) => {
	res.status(500).json({
		status: 'failed',
		message: 'coming soon feature'
	});
};

const deleteUser = (req, res) => {
	res.status(500).json({
		status: 'failed',
		message: 'coming soon feature'
	});
};

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.route('/api/v1/tours').get(getAllTours).post(addnewdata);

app.route('/api/v1/tours/:id').get(getToursById);

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Accessing Root URL and testing sending response JSON', app: 'natours' });
});

app.listen(3000, () => {
	console.log('Farjun API Server Online With Port 3000!!!');
});
