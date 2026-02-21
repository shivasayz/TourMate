import express from 'express';
import {
  getOverview,
  getTour,
  getLoginForm,
  getSignupForm,
  getAccount,
  updateUserData,
  getMyTours
} from '../controllers/viewsController.js';
import { isLoggedIn, Protected } from '../controllers/authController.js';
import {
  createBookingCheckout
} from "../controllers/bookingController.js"

const router = express.Router();

router.get('/', createBookingCheckout, isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/signup', isLoggedIn, getSignupForm);
router.get('/me', Protected, getAccount);
router.get('/my-tours', Protected, getMyTours);

router.post('/submit-user-data', Protected, updateUserData);

export default router;
