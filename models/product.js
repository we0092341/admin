import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({ 
  name: {
    type: String,
    maxlength: 555,
    minlength: 2,
    required: true,
    trim: true
  },
  sku: {
    type: String,
    maxlength: 555,
    minlength: 2,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    maxlength: 555,
    minlength: 2,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    default: 200
  },
  price: {
    type: Number,
    min: 1
  },
  priceGBP: {
    type: Number,
    min: 1
  },
  discount: {
    type: Number,
    min: 1
  },
  featured: {
    type: Boolean,
    default: false
  },
  new: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 1
  },
  ratingCount: {
    type: Number,
    min: 1
  },
  saleCount: {
    type: Number,
    min: 1
  },
  category: [],
  tag: [],
  thumbImage: [],
  image: [],
  additional: [],
  shortDescription: {
    type: String,
    maxlength: 555,
    minlength: 2,
    required: true,
    trim: true
  },
  fullDescription: {
    type: String,
    minlength: 2,
    required: true,
    trim: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);