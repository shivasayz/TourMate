import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, 'Review cannot be empty!'],
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      require: [true, 'Review must belong to tour'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: [true, 'Review must belong to user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Query Middleware
reviewSchema.pre(/^find/, function (next) {
  this.populate([
    // {
    //   path: 'tour',
    //   select: "name"
    // },
    {
      path: 'user',
      select: 'name photo'
    },
  ]);
  next();
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
