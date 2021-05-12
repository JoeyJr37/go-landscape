var Staff = require('../models/staff');
var Locations = require('../models/location');
var History = require('../models/history');
var Positions = require('../models/positions');

var async = require('async');
const { body, validationResult } = require('express-validator');

exports.index = function(req, res) {

    async.parallel({
        staff_count: function(callback) {
            Staff.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        locations_count: function(callback) {
            Locations.countDocuments({}, callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'GO Landscape', error: err, data: results });
    });
};

// Display list of all staff.
exports.staff_list = function(req, res, next) {

    Staff.find({}, 'first_name last_name location')
      .populate('location')
      .exec(function (err, list_staff) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('staff_list', { title: 'Staff List', staff_list: list_staff });
      });
  };

// Display detail page for a specific staff.
exports.staff_detail = function(req, res, next) {

    async.parallel({
        staff: function(callback) {

            Staff.findById(req.params.id)
              .populate('location')
              .populate('position')
              .exec(callback);
        },
        history: function(callback) {

          History.find({ 'staff_member': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.staff==null) { // No results.
            var err = new Error('Staff not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('staff_detail', { title: results.staff.first_name, staff: results.staff, history: results.history } );
    });

};

// Display staff create form on GET.
exports.staff_create_get = function(req, res, next) {
    // Get all locations & positions to be used in creating staff
    async.parallel({
        locations: function(callback) {
            Locations.find(callback);
        },
        positions: function(callback) {
            Positions.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('staff_form', { title: 'Create Staff', locations: results.locations, positions: results.positions });
    });
};

// Handle staff create on POST.
exports.staff_create_post = [
    // Validate and sanitize fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last name must be specified.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').isISO8601().toDate(),
    body('phone_number', 'Phone number must not be empty').trim().isLength({ min: 1}).escape(),
    body('email_address', 'Email address must not be empty').trim().isLength({ min: 1}).escape(),
    body('location.*').escape(),
    body('pastor', 'Field Staff Pastor must not be empty').trim().isLength({ min: 1}).escape(),
    body('position.*').escape(),

    // Process request after validation and sanitization
    (req, res, next) => {
        
        // Extract the validation errors from a request
        const errors = validationResult(req);

        // Create staff object with data
        var staff = new Staff(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                date_of_birth: req.body.date_of_birth,
                phone_number: req.body.phone_number,
                email_address: req.body.email_address,
                location: req.body.location,
                pastor: req.body.pastor,
                position: req.body.position
            });
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values & error messages

            // Get all locations and positions for form.
            async.parallel({
                locations: function(callback) {
                    Locations.find(callback);
                },
                positions: function(callback) {
                    Positions.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('staff_form', { title: 'Create Staff', locations: results.locations, positions: results.positions, staff: staff, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save staff.
            staff.save(function(err) {
                if (err) { return next(err); }
                // successful - redirect to new staff record
                res.redirect(staff.url);
            });
        }
    }
];

// Display staff delete form on GET.
exports.staff_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Staff delete GET');
};

// Handle staff delete on POST.
exports.staff_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Staff delete POST');
};

// Display staff update form on GET.
exports.staff_update_get = function(req, res, next) {
    // Get staff, locations & position for form.
    async.parallel({
        staff: function(callback) {
            Staff.findById(req.params.id).populate('location').populate('position').exec(callback);
        },
        positions: function(callback) {
            Positions.find(callback);
        },
        locations: function(callback) {
            Locations.find(callback);
        },
        }, function(err, results) {
            if (err) { return next(err); }
            if (results.staff==null) { // No results.
                var err = new Error('Staff not found');
                err.status = 404;
                return next(err);
            }
            // Success.
        
            res.render('staff_form', { title: 'Update Staff', positions: results.positions, locations: results.locations, staff: results.staff });
        });

};

// Handle staff update on POST.
exports.staff_update_post = [

    // Validate and sanitise fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last name must be specified.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').isISO8601().toDate(),
    body('phone_number', 'Phone number must not be empty').trim().isLength({ min: 1}).escape(),
    body('email_address', 'Email address must not be empty').trim().isLength({ min: 1}).escape(),
    body('location.*').escape(),
    body('pastor', 'Field Staff Pastor must not be empty').trim().isLength({ min: 1}).escape(),
    body('position.*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped/trimmed data and old id.
        var staff = new Staff(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                date_of_birth: req.body.date_of_birth,
                phone_number: req.body.phone_number,
                email_address: req.body.email_address,
                location: req.body.location,
                pastor: req.body.pastor,
                position: req.body.position,
                _id:req.params.id //This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                positions: function(callback) {
                    Positions.find(callback);
                },
                locations: function(callback) {
                    Locations.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected positions as checked.
                for (let i = 0; i < results.positions.length; i++) {
                    if (staff.positions.indexOf(results.positions[i]._id) > -1) {
                        results.positions[i].checked='true';
                    }
                }
                res.render('staff_form', { title: 'Update Staff',positions: results.positions, locations: results.locations, staff: staff, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Staff.findByIdAndUpdate(req.params.id, staff, {}, function (err,theStaff) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.redirect(theStaff.url);
                });
        }
    }
];