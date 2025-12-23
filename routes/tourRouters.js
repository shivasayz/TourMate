import express from 'express';
import tourController from '../controllers/tourController.js';
const {
  getAllTours,
  createTour,
  deleteTour,
  updateTour,
  getTourById,
} = tourController;

const router = express.Router();

router.route(`/`).get(getAllTours).post(createTour);
router.route(`/:id`).delete(deleteTour).patch(updateTour).get(getTourById);

export default router;
