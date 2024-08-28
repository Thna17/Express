const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' A tour must name a name'],

    maxlength: [50, 'Name should not exceed 50 characters'],
  },
  price: {
    type: Number,
    default: 0,
  },
  duration: Number,
  maxGroupSize: Number,
  difficulty: String,
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  priceRange: {
    type: String,
    enum: ['Budget-friendly', 'Moderate', 'Expensive'],
  },
  description: String,
  imageCover: String,
  images: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  secretTour: { type: Boolean, default: false },
});

// Create a model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;