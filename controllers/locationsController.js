var Locations = require('../models/location');
var Staff = require('../models/staff');
var async = require('async');
const { body, validationResult } = require("express-validator");

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
        if (results.locations == null) { // no results.
            var err = new Error('Location not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('location_detail', {title: 'Location', locations: results.locations, staff_at_location: results.staff_at_location});
    });
};


// Display locations create form on GET.
exports.locations_create_get = function(req, res, next) {
    res.render('location_form', {title: 'Create Location'});
    
};

// Handle locations create on POST.
exports.locations_create_post = [
    // Validate and sanitize the city & country fields.
    body('city', 'City name required').trim().isLength({ min: 1}).escape(),
    body('country', 'Country name required').trim().isLength({ min: 1}).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a location object with escaped and trimmed data.
        var location = new Locations(
            { city: req.body.city, country: req.body.country}
        );
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('location_form', {title: 'Create Location', location: location, errors:errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if location with same city name already exists
            Locations.findOne({ 'city' : req.body.city })
            .exec( function(err, found_location) {
                if (err) { return next(err); }

                if (found_location) {
                    // Location exists, redirect to its detail page.
                    res.redirect(found_location.url);
                }
                else {

                    location.save(function (err) {
                        if (err) { return next(err); }
                        // Location saved. Redirect to location detail page
                        res.redirect(location.url);
                    });
                }
            });
        }
    }
];

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