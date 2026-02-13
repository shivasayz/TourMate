import Tour from '../models/tourModels.js';
import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';

const getOverview = catchAsync(async (req, res, next) => {
  // 1. Get the tour data from collection
  const tours = await Tour.find();

  // 2. Build tempate
  // 3. Render that template using tour data from point 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

const getTour = catchAsync(async (req, res, next) => {
  // 1. Get the data, for the requested tour (including reviews)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new appError('There is no tour with the name', 404));
  }

  // 2. Build tempate
  // 3. Render template using data from point 1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

const getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
});

const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

export { getOverview, getTour, getLoginForm, getAccount };
