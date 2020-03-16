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
		console.log('DB Successfully connected');
	});

// const newTour = new Tour({
// 	name: 'a forest priker',
// 	price: 445
// });

// newTour
// 	.save()
// 	.then((con) => {
// 		console.log(con.connections);
// 		console.log(con.collection);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});
app.use(express.json());

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
