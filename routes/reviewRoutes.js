import express from 'express';
import reviewController from '../controllers/reviewController.js';
import { Protected, restrictTo } from '../controllers/authController.js';
const { getAllReviews, createReview } = reviewController;

const reviewRouter = express.Router();

reviewRouter
  .route(`/`)
  .get(getAllReviews)
  .post(Protected, restrictTo('user'), createReview);

export default reviewRouter;
