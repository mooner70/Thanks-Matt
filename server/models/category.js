const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank']
    },
    venues: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue"
    }],
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);