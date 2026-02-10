import Tour from '../models/tourModels.js';
import catchAsync from '../utils/catchAsync.js';

const getOverview = catchAsync(async (req, res) => {
  // 1. Get the tour data from collection
  const tours = await Tour.find();

  // 2. Build tempate
  // 3. Render that template using tour data from point 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

const getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hicker Tour',
  });
};

export { getOverview, getTour };
