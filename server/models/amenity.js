const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be blank"],
      trim: true
    },
  },
  { timestamps: true }
);

const Amenity = mongoose.model('Amenity', AmenitySchema);