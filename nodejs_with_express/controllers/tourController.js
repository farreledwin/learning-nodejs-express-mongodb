// const fs = require('fs');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const Tour = require('./../models/tourModel.js');

exports.getAllTours = async (req, res) => {
	try {
		console.log(req.query);
		const queryObj = { ...req.query };
		const excludedFields = [ 'page', 'sort', 'limit', 'fields' ];
		excludedFields.forEach((el) => delete queryObj[el]);

		const query = Tour.find(queryObj);

		const tours = await query;

		res.status(200).json({
			status: 'success',
			results: tours.length,
			data: {
				tours
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: 'failed'
		});
	}
};

// exports.checkdata = (req, res, next) => {
// 	if (!req.body.name || !req.body.price) {
// 		return res.status(400).json({
// 			status: 'fail',
// 			message: 'missing request price and name'
// 		});
// 	}
// };

exports.getToursById = async (req, res) => {
	try {
		const tours = await Tour.findById(req.params.id);
		res.status(200).json({
			results: 'OK',
			data: {
				tours
			}
		});
	} catch (err) {
		res.status(404).json({
			results: 'failed',
			message: 'failed'
		});
	}
};

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(200).json({
			status: 'success',
			data: {
				tour
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: 'failed'
		});
	}
};

exports.deleteTour = async (req, res) => {
	try {
		console.log(req.params.id);
		await Tour.findByIdAndRemove(req.params.id, (err, todo) => {
			res.status(200).json({
				message: 'success dlete'
			});
		});
	} catch (err) {
		res.status(404).json({
			message: err.message
		});
	}
};

exports.createTour = async (req, res) => {
	try {
		await Tour.create(req.body, (err, msg) => {
			res.status(200).json({
				message: 'insert success'
			});
		});
	} catch (err) {
		res.status(404).json({
			message: err
		});
	}
};
