const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [50, 'Name should not exceed 50 characters'],
  },
  price: {
    type: Number,
    default: 0,
  },
});

// Create a model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
