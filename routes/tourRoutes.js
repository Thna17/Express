const express = require('express');
const tourController = require('../controller/tourController');

const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  checkBody,
} = tourController;
const router = express.Router();

router.param('id', tourController.checkID);

router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
