import catchAsync from '../utils/catchAsync.js';
import { User } from '../models/modelsExport.js';
import appError from '../utils/appError.js';

const getAllUsers = catchAsync( async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: 'success',
    message: user
  });
});

export function createUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
}

export function updateUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
}

export function deleteUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
}

export function getUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
}

export {
  getAllUsers
}