import express from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe
} from './../controllers/userController.js';
import {
  signup,
  login,
  Protected,
  forgotPassword,
  resetPassword,
  updatePassword
} from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);
userRouter.patch('/updateMyPassword', Protected, updatePassword);
userRouter.patch('/updateMe', Protected, updateMe);

userRouter.route(`/`).get(Protected, getAllUsers).post(createUser);
userRouter.route(`/:id`).get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
