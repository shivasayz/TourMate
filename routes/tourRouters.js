import express from 'express';
import tourController from '../controllers/tourController.js';
import { Protected, restrictTo } from '../controllers/authController.js';
const {
  getAllTours,
  createTour,
  deleteTour,
  updateTour,
  getTourById,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistance,
} = tourController;
import reviewController from '../controllers/reviewController.js';
const { createReview } = reviewController;
import reviewRouter from './reviewRoutes.js';

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/tour-stats').get(getTourStats);
router.route(`/top-5-cheap`).get(aliasTopTours, getAllTours);
router
  .route('/monthly-plan/:year')
  .get(Protected, restrictTo('admin', 'lead-guide'), getMonthlyPlan);
router
  .route(`/tours-within/:distance/center/:latlng/unit/:unit`)
  .get(getToursWithin);
router.route(`/distances/:latlng/unit/:unit`).get(getDistance);
router
  .route(`/`)
  .get(getAllTours)
  .post(Protected, restrictTo('admin', 'lead-guide'), createTour);
router
  .route(`/:id`)
  .delete(Protected, restrictTo('admin', 'lead-guide'), deleteTour)
  .patch(Protected, restrictTo('admin', 'lead-guide'), updateTour)
  .get(getTourById);

export default router;
