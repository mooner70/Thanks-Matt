const mongoose = require('mongoose');
const Amenity = mongoose.model('Amenity');

class AmenitiesController {
    index(req, res) {
        Amenity.find({}, (err, amenities) => {
            if (err) {
                return res.json(err);
            }
            return res.json(amenities);
        });
    }

    create(req, res) {
        Amenity.create(req.body, (err, amenity) => {
            if (err) {
                return res.json(err);
            }
            return res.json(amenity);
        });
    }

    show(req, res) {
        Amenity.findById(req.params.id, (err, amenity) => {
            if (err) {
                return res.json(err);
            }
            return res.json(amenity);
        });
    }

    update(req, res) {
        Amenity.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true },
            (err, amenity) => {
                if (err) {
                    return res.json(err);
                }
                return res.json(amenity);
            }
        );
    }

    delete(req, res) {
        Amenity.findByIdAndRemove(req.params.id, (err, amenity) => {
            if (err) {
                return res.json(err);
            } else {
                return res.json(true);
            }
        })
    }
}

module.exports = new AmenitiesController();
