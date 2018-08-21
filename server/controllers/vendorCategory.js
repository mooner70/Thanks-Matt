const mongoose = require('mongoose');
const VendorCategory = mongoose.model('VendorCategory');

class VendorCategoryController {
  index(req, res) {
    VendorCategory.find({}, (err, categories) => {
      if (err) {
        return res.json(err);
      }
      return res.json(categories);
    });
  }

  create(req, res) {
    VendorCategory.create(req.body, (err, category) => {
      if (err) {
        return res.json(err);
      }
      return res.json(category);
    });
  }

  show(req, res) {
    VendorCategory.findById(req.params.id, (err, category) => {
      if (err) {
        return res.json(err);
      }
      return res.json(category);
    });
  }

  update(req, res) {
    VendorCategory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
      (err, category) => {
        if (err) {
          return res.json(err);
        }
        return res.json(category);
      }
    );
  }

  delete(req, res) {
    VendorCategory.findByIdAndRemove(req.params.id, (err, category) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(true);
      }
    });
  }
}

module.exports = new VendorCategoryController();