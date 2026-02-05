import Review from '../models/reviewModel.js';
import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';
import { deleteOne, updateOne, createOne, getOne, getAll } from '../controllers/handlerFactory.js';

const setTourUserIds = (req, res, next) => {
  // Allow nested route
  if(!req.body.tour) req.body.tour = req.params.tourId;
  if(!req.body.user) req.body.user = req.user.id;
  next();
}

const getAllReviews = getAll(Review);
const createReview = createOne(Review);
const updateReview = updateOne(Review);
const deleteReview = deleteOne(Review);
const getReview = getOne(Review);

export default {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview
};
