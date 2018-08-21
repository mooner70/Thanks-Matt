const path = require('path');
const Users = require('../controllers/users');
const Venues = require('../controllers/venues');
const Vendors = require('../controllers/vendors');
const Reviews = require('../controllers/reviews');
const Amenities = require('../controllers/amenities');
const Categories = require('../controllers/categories');
const VendorCategories = require('../controllers/vendorCategory');

module.exports = function (app) {
    app.get('/users', Users.index);
    app.post('/users', Users.create);
    app.delete('/users', Users.logout);
    app.post('/users/login', Users.authenticate);
    app.delete('/users/:id', Users.delete);
    app.get('/users/:id', Users.show);
    app.put('/users/:id', Users.update);
    app.get('/session', Users.session);

    app.get('/amenities', Amenities.index);
    app.post('/amenities', Amenities.create);
    app.delete('/amenities/:id', Amenities.delete);
    app.get('/amenities/:id', Amenities.show);
    app.put('/amenities/:id', Amenities.update);

    app.get('/categories', Categories.index);
    app.post('/categories', Categories.create);
    app.delete('/categories/:id', Categories.delete);
    app.get('/categories/:id', Categories.show);
    app.put('/categories/:id', Categories.update);

    app.get('/vendorCategories', VendorCategories.index);
    app.post('/vendorCategories', VendorCategories.create);
    app.delete('/vendorCategories/:id', VendorCategories.delete);
    app.get('/vendorCategories/:id', VendorCategories.show);
    app.put('/vendorCategories/:id', VendorCategories.update);

    app.get('/reviews', Reviews.index);
    app.post("/reviews/:id", Reviews.create);
    app.delete('/reviews/:id', Reviews.delete);
    app.get('/reviews/:id', Reviews.show);
    app.put('/reviews/:id', Reviews.update);

    app.get('/venues', Venues.index);
    app.get('/venuesInOrder', Venues.inorder);
    app.get('/venues/category/:category', Venues.category);
    app.post('/venues', Venues.create);
    app.put('/venues/upload/:id', Venues.upload);
    app.put('/venues/uploadTourPic/:id', Venues.uploadTourPic);
    app.post('/venues/upload/multiple/:id', Venues.gallery);
    app.delete('/venues/:id', Venues.delete);
    app.get('/venues/:id', Venues.show);
    app.get('/venues/images/:id', Venues.images);
    app.put('/venues/:id', Venues.update);
    app.delete("/venues/deleteImage/:id", Venues.deleteImage);
    app.delete("/venues/deleteTourImage/:id", Venues.deleteTourImage);
    app.delete("/venues/deleteGalleryImage/:id", Venues.deleteGalleryImage);
    
    app.get('/vendors', Vendors.index);
    app.get('/vendorsInOrder', Vendors.inOrder);
    app.get('/vendors/vendorcategory/:category', Vendors.category);
    app.post('/vendors', Vendors.create);
    app.put('/vendors/upload/:id', Vendors.upload);
    app.put('/vendors/uploadLogo/:id', Vendors.uploadLogo);
    app.post('/vendors/upload/multiple/:id', Vendors.gallery);
    app.delete('/vendors/:id', Vendors.delete);
    app.get('/vendors/:id', Vendors.show);
    app.get('/vendors/images/:id', Vendors.images);
    app.put('/vendors/:id', Vendors.update);
    app.delete("/vendors/deleteImage/:id", Vendors.deleteImage);
    app.delete("/vendors/deleteLogo/:id", Vendors.deleteLogo);
    app.delete("/vendors/deleteGalleryImage/:id", Vendors.deleteGalleryImage);


    app.all('*', (req, res, next) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    })
}