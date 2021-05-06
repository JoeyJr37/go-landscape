var Locations = require('../models/location');
var Staff = require('../models/staff');
var async = require('async');

// Display list of all Genre.
exports.locations_list = function(req, res, next) {

  Locations.find({}, 'city country')
    .exec(function (err, list_locations) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('locations_list', { title: 'Locations List', locations_list: list_locations });
    });
};

// Display detail page for a specific locations.
exports.locations_detail = function(req, res, next) {

    async.parallel({
        locations: function(callback) {
            Locations.findById(req.params.id)
            .exec(callback);
        },
        staff_at_location: function(callback) {
            Staff.find({ 'location' : req.params.id})
            .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err);}
        if (results.location == null) { // no results.
            var err = new Error('Location not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('location_detail', {title: 'Location', location: results.location, staff_at_location: results.staff_at_location});
    });
};


// Display locations create form on GET.
exports.locations_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: locations create GET');
};

// Handle locations create on POST.
exports.locations_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: locations create POST');
};

// Display locations delete form on GET.
exports.locations_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: locations delete GET');
};

// Handle locations delete on POST.
exports.locations_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: locations delete POST');
};

// Display locations update form on GET.
exports.locations_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: locations update GET');
};

// Handle locations update on POST.
exports.locations_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: locations update POST');
};