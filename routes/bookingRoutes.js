import express from 'express';
import { getCheckoutSession } from '../controllers/bookingController.js';
import { Protected, restrictTo } from '../controllers/authController.js';
const bookingRouter = express.Router();

bookingRouter.get('/checkout-session/:tourID', Protected, getCheckoutSession);

export default bookingRouter;
