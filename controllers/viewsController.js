import Tour from '../models/tourModels.js';
import catchAsync from '../utils/catchAsync.js';

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

export { getOverview, getTour, getLoginForm };
