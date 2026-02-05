import express from 'express';
import reviewController from '../controllers/reviewController.js';
import { Protected, restrictTo } from '../controllers/authController.js';
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = reviewController;

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route(`/`)
  .get(getAllReviews)
  .post(Protected, restrictTo('user'), setTourUserIds, createReview);

reviewRouter
  .route(`/:id`)
  .patch(updateReview)
  .delete(deleteReview)
  .get(getReview);

export default reviewRouter;
