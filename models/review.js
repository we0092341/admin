import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({ 
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  name: {
    type: String,
    maxlength: 555,
    minlength: 2,
    required: true,
    trim: true
  },
  date: {
    type: String,
    maxlength: 255,
    minlength: 2,
    required: true,
    trim: true
  },
  review: {
    type: String,
    maxlength: 955,
    minlength: 2,
    required: true,
    trim: true
  },
  stars: {
    type: Number,
    min: 1
  }
});

module.exports = mongoose.models.Review || mongoose.model("Review", reviewSchema);