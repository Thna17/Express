const express = require('express');
const tourController = require('../controller/tourController');

const {
  aliasTopTours,
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTourById,
} = tourController;
const router = express.Router();
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
