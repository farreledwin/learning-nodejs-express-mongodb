const mongoose = require('mongoose');
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
	difficulty: {
		type: String,
		required: [ true, 'a tour must have difficult' ]
	},
	price: {
		type: Number,
		required: [ true, 'A tour must have a price' ]
	},
	priceDiscount: Number,
	summary: {
		type: String,
		trim: true,
		required: [ true, 'A tour must have summary' ]
	},
	description: {
		type: String,
		trim: true
	},
	imageCover: {
		type: String,
		required: [ true, 'a tour must have a cover image' ]
	},
	images: [ String ],
	createdAt: {
		type: Date,
		default: Date.now()
	},
	startDates: [ Date ]
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
