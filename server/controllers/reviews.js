const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const Review = mongoose.model("Review");

class ReviewsController {
    index(req, res) {
        Review.find({}, (err, reviews) => {
            if (err) {
                return res.json(err);
            }
            return res.json(reviews);
        });
    }


    create(req, res) {
        Review.create(req.body, (err, review) => {
            if (err) {
                return res.json(err);
            }
            Venue.findByIdAndUpdate(
                req.params.id,{ $push: { reviews: review._id } },{ new: true },(err, venue) => {
                if (err) {
                    return res.json(err);
                }
                review._venue = req.params.id;
                return res.json(review);
                }
            );
        });
    }



    show(req, res) {
        Review.findById(req.params.id, (err, review) => {
            if (err) {
                return res.json(err);
            }
            return res.json(review);
        });
    }

    update(req, res) {
        Review.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true },
            (err, review) => {
                if (err) {
                    return res.json(err);
                }
                return res.json(review);
            }
        );
    }



    delete(req, res) {
        Review.findByIdAndRemove(req.params.id, (err, review) => {
            console.log("*** SERVER REQ", req);
            console.log("*** SERVER DELETE REVIEW", review);
            if (err) {
                console.log("*** SERVER ERROR", err);
                return res.json(err);
            } else {
                console.log("*** SERVER DELETE REVIEW SUCCESS");
                return res.json(true);
            }
        })
    }
}

module.exports = new ReviewsController();
