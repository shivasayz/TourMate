import catchAsync from '../utils/catchAsync.js';
import sharp from 'sharp';
import { User } from '../models/modelsExport.js';
import appError from '../utils/appError.js';
import {
  deleteOne,
  updateOne,
  getOne,
  getAll,
} from '../controllers/handlerFactory.js';
import multer from 'multer';

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },

//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `User-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new appError(
        'Uploaded file is not an image, please upload images only',
        404,
      ),
      false,
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single('photo');

const resizeUserImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (Obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(Obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = Obj[el];
  });
  return newObj;
};

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const updateMe = catchAsync(async (req, res, next) => {
  // 1. Check error if user posted password data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new appError(
        'This route is not for password update. please use /updateMyPassword',
        400,
      ),
    );
  }

  // 2. Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

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

export {
  getAllUsers,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserImage,
};
