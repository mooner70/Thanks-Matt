const mongoose = require('mongoose');

const VendorCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "File name cannot be blank"]
  },
  vendors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor"
    }
  ]
});

const VendorCategory = mongoose.model('VendorCategory', VendorCategorySchema); 