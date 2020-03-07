const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true
	})
	.then((con) => {
		console.log(con.connections);
		console.log('DB Successfully connected');
	});

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'a tour must have a name' ],
		unique: true
	},
	rating: {
		type: Number,
		default: 4.5
	},
	price: {
		type: Number,
		required: [ true, 'a tour must have a price' ]
	}
});
const Tour = mongoose.model('Tour', tourSchema);

app.use(express.json());

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
