const express = require('express');

const router = express.Router();

const tourController = require('./../controllers/tourController');

router.route('/').get(tourController.getAllTours).post(tourController.checkdata, tourController.addnewdata);

router.route('/:id').get(tourController.getToursById);

module.exports = router;
