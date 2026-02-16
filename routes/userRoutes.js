import express from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
} from './../controllers/userController.js';
import {
  signup,
  login,
  logout,
  Protected,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
} from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
userRouter.use(Protected);

userRouter.patch('/updateMyPassword', updatePassword);
userRouter.patch('/updateMe', uploadUserPhoto, updateMe);
userRouter.delete('/deleteMe', deleteMe);
userRouter.get('/me', getMe, getUser);

// Restrict all routes to admins only
userRouter.use(restrictTo('admin'));

userRouter.route(`/`).get(getAllUsers).post(createUser);
userRouter.route(`/:id`).get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
