import express from 'express';
import bookingController from '../controllers/bookingController.js';
import { Protected, restrictTo } from '../controllers/authController.js';
const { getCheckoutSession } = bookingController;
const bookingRouter = express.Router();

bookingRouter.get('/checkout-session/:tourID', Protected, getCheckoutSession);

export default bookingRouter;
