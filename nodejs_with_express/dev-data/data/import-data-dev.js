const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true
	})
	.then(() => console.log('db connect success'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
	try {
		await Tour.create(tours);
		console.log('success import data');
	} catch (err) {
		console.log(err);
	}
};

const deleteAllData = async () => {
	try {
		await Tour.deleteMany();
		console.log('Delete All Data Success');
	} catch (err) {
		console.log(err);
	}
};

if (process.argv[2] == '--import') {
	importData();
} else if (process.argv[2] == '--delete') {
	deleteAllData();
}
