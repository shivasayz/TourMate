import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';

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
    updateOne
  }