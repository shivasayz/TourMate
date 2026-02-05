import catchAsync from '../utils/catchAsync.js';
import { User } from '../models/modelsExport.js';
import appError from '../utils/appError.js';
import { deleteOne, updateOne, getOne, getAll } from '../controllers/handlerFactory.js';

const filterObj = (Obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(Obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = Obj[el];
  });
  return newObj;
};

const updateMe = catchAsync(async (req, res, next) => {
  // 1. Check error if user posted password data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new appError(
        'This route is not for password update. please use /updateMyPassword',
        400
      )
    );
  }

  // 2. Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3. Update the document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export function createUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined! Please use Sign up instead',
  });
}

// Do not update pasword with this!
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
export const getUser = getOne(User);
const getAllUsers = getAll(User);

export { getAllUsers, updateMe, deleteMe };
