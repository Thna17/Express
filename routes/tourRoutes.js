const express = require('express');
const tourController = require('../controller/tourController');

const {
  aliasTopTours,
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTourById,
  getTourStats,
  getMonthlyPlan,
} = tourController;

const router = express.Router();

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/tour-stats').get(getTourStats);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
