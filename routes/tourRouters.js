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
} = tourController;

const router = express.Router();

router.route('/tour-stats').get(getTourStats);
router.route(`/top-5-cheap`).get(aliasTopTours, getAllTours);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route(`/`).get(Protected, getAllTours).post(createTour);
router
  .route(`/:id`)
  .delete(Protected, restrictTo('admin', 'lead-guide'), deleteTour)
  .patch(updateTour)
  .get(getTourById);

export default router;
