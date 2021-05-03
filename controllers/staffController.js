var Staff = require('../models/staff');
var Locations = require('../models/location');

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
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

// Display list of all books.
exports.staff_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Staff list');
};

// Display detail page for a specific staff.
exports.staff_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Staff detail: ' + req.params.id);
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