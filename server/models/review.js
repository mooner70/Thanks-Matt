const mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "You can only leave 1 review"],
        required: [true, 'Title cannot be blank'],
        minlength: [5, "Email did not meat the requirments"],
        maxlength: [200, "Email cannot be greater then 200 characters"],
        trim: true,
        validate: {
            validator: function (email) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: "Please enter your email in the correct format."
        }
    },
    subject: {
        type: String,
        required: [true, 'Subject cannot be blank'],
        maxlength: [150, "Subject cannot be greater then 150 characters"]
    },
    content: {
        type: String,
        required: [true, 'Review cannot be blank'],
        maxlength: [350, "Review cannot be greater then 350 characters"]
    },
    rating: {
        type: Number,
        required: [true, 'Rating cannot be blank'],
        maxlength: [2, "Rating cannot be greater then 2 characters"]
    },
    approved: {
        type: Boolean,
        required: false,
        default: false
    },
    _venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue'
    }
}, { timestamps: true });

mongoose.model('Review', ReviewSchema);