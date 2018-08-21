const mongoose = require("mongoose");
const Vendor = mongoose.model("Vendor");
const VendorCategory = mongoose.model("VendorCategory");
const Amenity = mongoose.model("Amenity");
const Review = mongoose.model("Review");

const config = require("../config/config");

const BUCKET_NAME = "tulsa-venues";
const IAM_USER_KEY = config.iamUser;
const IAM_USER_SECRET = config.iamSecret;

const path = require("path");
const AWS = require("aws-sdk");
const Busboy = require("busboy");

function uploadToS3(file, vendor) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    var params = {
      Bucket: BUCKET_NAME,
      Key: `Vendors/${vendor}/${file.name}`,
      Body: file.data,
      ACL: "public-read"
    };
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log("*** Error in callback: ", err);
        console.log("*** UPLOAD PARAMS: ", params);
      }
      console.log("**** SUCCESS", data);
    });
  });
}

function uploadLogoToS3(file, vendor) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    var params = {
      Bucket: BUCKET_NAME,
      Key: `Vendors/${vendor}/Logo/${file.name}`,
      Body: file.data,
      ACL: "public-read"
    };
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log("*** Error in callback: ", err);
        console.log("*** UPLOAD PARAMS: ", params);
      }
      console.log("**** SUCCESS", data);
    });
  });
}

function uploadManyToS3(file, vendor) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    var params = {
      Bucket: BUCKET_NAME,
      Key: `Vendors/${vendor}/Gallery/${file.name}`,
      Body: file.data,
      ACL: "public-read"
    };
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log("*** Error in callback: ", err);
        console.log("*** UPLOAD PARAMS: ", params);
      }
      console.log("**** SUCCESS", data);
    });
  });
}

let shuffle = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    let index = Math.floor(Math.random() * arr.length);
    let temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;
  }
};

//  James wagner's example(signed url)
// var aws2 = new AWS.S3({
//   accessKeyId: IAM_USER_KEY,
//   secretAccessKey: IAM_USER_SECRET,
//   Bucket: BUCKET_NAME
// });

// aws2.getSignedUrl(
//   "putObject",
//   {
//     Bucket: "venue-test",
//     Key: "folder/another/test.jpg",
//     ContentType: "image/jpeg"
//   },
//   (err, url) => {
//     console.log(url);
//   }
// );

class VendorsController {
  index(req, res) {
    Vendor.find({})
      .populate({ path: "amenities", model: Amenity })
      .populate({ path: "reviews", model: Review })
      .populate({ path: "_category", model: VendorCategory })
      .exec((err, vendors) => {
        if (err) {
          return res.json(err);
        }
        shuffle(vendors);
        return res.json(vendors);
      });
  }
  
  inOrder(req, res) {
    Vendor.find({})
      .populate({ path: "amenities", model: Amenity })
      .populate({ path: "reviews", model: Review })
      .populate({ path: "_category", model: VendorCategory })
      .exec((err, vendors) => {
        if (err) {
          return res.json(err);
        }
        return res.json(vendors);
      });
  }

  show(req, res) {
    Vendor.findById({ _id: req.params.id })
      .populate({ path: "amenities", model: Amenity })
      .populate({ path: "_category", model: VendorCategory })
      .populate({ path: "reviews", model: Review })
      .exec((err, vendor) => {
        if (err) {
          console.log("*** SERVER SHOW VENdor ERROR:", err);
          return res.json(err);
        }
        return res.json(vendor);
      });
  }

  category(req, res) {
    Vendor.find({ _category: req.params.category })
      .populate({ path: "_category", model: VendorCategory })
      .exec((err, vendors) => {
        if (err) {
          console.log("*** SERVER FIND ERROR:", err);
          return res.json(err);
        }
        shuffle(vendors);
        console.log("*** SERVER SENDING VENdorS:", vendors);
        return res.json(vendors);
      });
  }

  create(req, res) {
    Vendor.create(req.body, (err, vendor) => {
      if (err) {
        return res.json(err);
      }
      VendorCategory.findById(req.body._category, (err, category) => {
        if (err) {
        category.vendors.push(req.body.vendor.name);
        VendorCategory.save();
        }
      });
      return res.json(vendor);
    });
  }

  upload(req, res) {
    let new_vendor = new Vendor(req.body);
    let busboy = new Busboy({ headers: req.headers });
    console.log("*** SERVER REQ.FILES:", req.files);
    console.log("*** SERVER REQ.FILES.PICTURE:", req.files.picture);
    if (req.files.picture) {
      let file = req.files.picture;
      let file_type = file.mimetype.match(/image\/(\w+)/);
      let new_file_name = file.name;

      if (file_type) {
        new_vendor.pic_url = new_file_name;
        busboy.on("finish", function() {
          const vendor = req.params.id;
          const file = req.files.picture;
          uploadToS3(file, vendor);
        });
        req.pipe(busboy);
      }
    }
    Vendor.update(
      { _id: req.params.id },
      { $set: { pic_url: new_vendor.pic_url } }
    ).exec((err, new_vendor) => {
      if (err) {
        return res.status(204).json(err);
      }
      return res.json(new_vendor);
    });
  }

  uploadLogo(req, res) {
    let new_vendor = new Vendor(req.body);
    let busboy = new Busboy({ headers: req.headers });
    console.log("*** SERVER REQ.FILES:", req.files);
    console.log("*** SERVER REQ.FILES.PICTURE:", req.files.picture);
    if (req.files.picture) {
      let file = req.files.picture;
      let file_type = file.mimetype.match(/image\/(\w+)/);
      let new_file_name = file.name;

      if (file_type) {
        new_vendor.logo_url = new_file_name;
        busboy.on("finish", function() {
          const vendor = req.params.id;
          const file = req.files.picture;
          uploadLogoToS3(file, vendor);
        });
        req.pipe(busboy);
      }
    }
    Vendor.update(
      { _id: req.params.id },
      { $set: { logo_url: new_vendor.logo_url } }
    ).exec((err, new_vendor) => {
      if (err) {
        return res.status(204).json(err);
      }
      return res.json(new_vendor);
    });
  }

  gallery(req, res) {
    let new_vendor = new Vendor(req.body);
    let busboy = new Busboy({ headers: req.headers });
    console.log("*** SERVER REQ.FILES:", req.files);
    console.log("*** SERVER REQ.FILES.PICTURE:", req.files.picture);
    if (req.files.picture) {
      let file = req.files.picture;
      let file_type = file.mimetype.match(/image\/(\w+)/);
      let new_file_name = file.name;

      if (file_type) {
        new_vendor.gallery.push(new_file_name);
        busboy.on("finish", function() {
          const vendor = req.params.id;
          const file = req.files.picture;
          uploadManyToS3(file, vendor);
        });
        req.pipe(busboy);
      }
    }
    let gallery = req.files.picture;
    Vendor.update({ _id: req.params.id }, { $push: { gallery: gallery } }).exec(
      (err, new_vendor) => {
        if (err) {
          return res.status(204).json(err);
        }
        return res.json(new_vendor);
      }
    );
  }

  deleteImage(req, res) {
    let new_vendor = new Vendor(req.body);
    new_vendor.pic_url = "";
    Vendor.update(
      { _id: req.params.id },
      { $set: { pic_url: new_vendor.pic_url } }
    ).exec((err, new_vendor) => {
      if (err) {
        return res.status(404).json(err);
      }
      return res.json(new_vendor);
    });
  }

  deleteLogo(req, res) {
    console.log("*** SERVER DELETE LOGO ***")
    let new_vendor = new Vendor(req.body);
    new_vendor.logo_url = "";
    Vendor.update(
      { _id: req.params.id },
      { $set: { logo_url: new_vendor.logo_url } }
    ).exec((err, new_vendor) => {
      if (err) {
        return res.status(404).json(err);
      }
      return res.json(new_vendor);
    });
  }

  deleteGalleryImage(req, res) {
    console.log("*** SERVER DELETE GALLERY IMAGE ***");
  }

  images(req, res) {
    Vendor.findById(req.params.id)
      .populate("galleryItems")
      .exec((err, doc) => {
        console.log("*** SERVER IMAGES", doc);
        if (err) {
          res.end("Error while retreaving images");
        } else if (doc.gallerItems.length < 1) {
          res.end("There are no images for this Vendor yet");
        } else {
          const key = "Vendors" + "/" + vendor.name + "/" + vendor.galleryItems;
          console.log("*** SERVER S3 KEY:", key);

          let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME
          });
          s3bucket.createBucket(() => {
            var params = {
              Bucket: BUCKET_NAME,
              Key: key
            };
            s3bucket.getObject(params, (err, data) => {
              if (err) {
                console.log("*** S3 Error in callback: ", err);
                res.end("Error");
              }
              console.log("success", data);
              res.setHeader("Content-Type", data.ContentType);
              res.end(data.Body);
            });
          });
        }
      });
  }

  update(req, res) {
    Vendor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
      (err, vendor) => {
        if (err) {
          return res.json(err);
        }
        return res.json(vendor);
      }
    );
  }

  delete(req, res) {
    Vendor.findByIdAndRemove(req.params.id, (err, vendor) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(true);
      }
    });
  }
}

module.exports = new VendorsController();
