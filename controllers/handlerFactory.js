import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';
import APIFeatures from './../utils/apiFeatures.js';

const getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id);
  if(popOptions) query = query.populate(popOptions);
  const doc = await query;

  // const doc = await Model.findById(req.params.id).populate('reviews');

  if (!doc) {
    return next(new appError('No document found with the id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

const getAll = Model => catchAsync(async (req, res, next) => {

  // to allow nested route on GET reviews on tour
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  // execute query
  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  // send response
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: { doc },
  });
});

const createOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

const updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new appError('No document found with the id', 404));
  }

  res.status(200).json({
    result: {
      status: 'update success',
      data: {
        data: doc,
      },
    },
  });
});

const deleteOne = (Model) => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
  
    if (!doc) {
      return next(new appError('No document found with the id', 404));
    }
  
    res.status(204).json({
      result: {
        status: 'delete success',
      },
    });
  });

  export {
    deleteOne,
    updateOne,
    createOne,
    getOne,
    getAll
  }