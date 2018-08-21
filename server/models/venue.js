const mongoose = require('mongoose');
const random = require('mongoose-random');

const VenueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be blank"],
      maxlength: [200, "Name cannot be greater then 200 characters"]
    },
    email: {
      type: String,
      required: [true, "Email cannot be blank"],
      minlength: [5, "Email did not meat the requirments"],
      maxlength: [200, "Email cannot be greater then 200 characters"],
      trim: true,
      unique: true,
      validate: {
        validator: function(email) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
        },
        message: "Please enter your email in the correct format."
      }
    },
    website: {
      type: String,
      required: [true, "Website cannot be blank"],
      minlength: [5, "Website did not meat the requirments"],
      maxlength: [200, "Website cannot be greater then 200 characters"],
      trim: true
    },
    phone: {
      type: String,
      required: [true, "Venue phone number required EX: 123-123-1234"],
      minlength: [9, "Phone number cannot be less then 9 characters"],
      maxlength: [15, "Phone number cannot be greater then 15 characters"],
      trim: true
    },
    minAmmount: {
      type: Number,
      required: false,
      maxlength: [15, "Ammount cannot be greater then 15 characters"],
      trim: true
    },
    maxAmmount: {
      type: Number,
      required: false,
      maxlength: [15, "Ammount cannot be greater then 15 characters"],
      trim: true
    },
    minCapacity: {
      type: Number,
      required: false,
      trim: true
    },
    maxCapacity: {
      type: Number,
      required: false,
      trim: true
    },
    address: {
      type: String,
      required: [true, "Address cannot be blank"],
      maxlength: [500, "Address cannot be greater then 500 characters"]
    },
    city: {
      type: String,
      required: [true, "City cannot be blank"],
      maxlength: [150, "City cannot be greater then 150 characters"]
    },
    state: {
      type: String,
      required: [true, "State cannot be blank"],
      maxlength: [3, "State cannot be greater then 3 characters"]
    },
    lat: {
      type: Number,
      required: [true, "Latitude cannot be blank"],
      maxlength: [25, "Latitude cannot be greater then 25 characters"],
      trim: true
    },
    lng: {
      type: Number,
      required: [true, "Longitude cannot be blank"],
      maxlength: [25, "Longitude cannot be greater then 25 characters"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description cannot be blank"]
    },
    pic_url: {
      type: String,
      required: false,
      trim: true,
      default: ""
    },
    gallery: [{ name: String }],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
      }
    ],
    avg: {
      type: Number,
      default: 0
    },
    tour_url: {
      type: String,
      required: [true, "3D Tour cannot be blank"],
      trim: true
    },
    tourPicURL: {
      type: String,
      required: false,
      trim: true
    },
    video_url: {
      type: String,
      required: [true, "Video URL cannot be blank"],
      trim: true
    },
    facebook_url: {
      type: String,
      required: false,
      validate: {
        validator: function(text) {
          return text.indexOf("https://www.facebook.com/") === 0;
        },
        message: "Facebook must start with https://www.facebook.com/"
      }
    },
    instagram_url: {
      type: String,
      required: false,
      validate: {
        validator: function(text) {
          return text.indexOf("https://www.instagram.com/") === 0;
        },
        message: "Instagram must start with https://www.instagram.com/"
      }
    },
    amenities: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Amenity"
        }
      ],
      default: []
    },
    _category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
  },
  { timestamps: true }
);

VenueSchema.plugin(random, { path: 'r' });

VenueSchema.methods.average = function() {

};

const Venue = mongoose.model('Venue', VenueSchema);