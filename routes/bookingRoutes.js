import express from 'express';
import {
  getCheckoutSession,
  createBookingCheckout,
  createBooking,
  getBooking,
  getAllBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js';
import { Protected, restrictTo } from '../controllers/authController.js';

const bookingRouter = express.Router();

bookingRouter.use(Protected);

bookingRouter.post('/create-checkout-session/:tourID', Protected, createBookingCheckout);
bookingRouter.route('/')
  .get(restrictTo('admin', 'lead-guide'), getAllBooking)
  .post(restrictTo('admin', 'lead-guide'), createBooking);

bookingRouter.route('/:id')
  .get(restrictTo('admin', 'lead-guide'), getBooking)
  .patch(restrictTo('admin', 'lead-guide'), updateBooking)
  .delete(restrictTo('admin', 'lead-guide'), deleteBooking);

bookingRouter.get('/checkout-session/:tourID', Protected, getCheckoutSession);

export default bookingRouter;
