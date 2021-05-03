var Staff = require('../models/staff');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
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