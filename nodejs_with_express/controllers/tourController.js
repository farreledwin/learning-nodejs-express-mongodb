const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours
		}
	});
};

exports.addnewdata = (req, res) => {
	const newID = tours[tours.length - 1].id + 1;
	const newData = Object.assign({ id: newID }, req.body);
	tours.push(newData);

	fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
		res.status(201).json({
			status: 'success',
			tour: newData
		});
	});
};

exports.getToursById = (req, res) => {
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
