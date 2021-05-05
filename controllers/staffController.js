var Staff = require('../models/staff');
var Locations = require('../models/location');
var History = require('../models/history');
var Teams = require('../models/team');
var Positions = require('../models/positions');

var async = require('async');

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
              .populate('team')
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
exports.staff_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Staff create GET');
};

// Handle staff create on POST.
exports.staff_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Staff create POST');
};

// Display staff delete form on GET.
exports.staff_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Staff delete GET');
};

// Handle staff delete on POST.
exports.staff_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Staff delete POST');
};

// Display staff update form on GET.
exports.staff_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Staff update GET');
};

// Handle staff update on POST.
exports.staff_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Staff update POST');
};