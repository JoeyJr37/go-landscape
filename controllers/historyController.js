var History = require('../models/history');
var Staff = require('../models/staff');

var async = require('async');
const { body, validationResult } = require('express-validator');

// Display list of all Genre.
exports.history_list = function(req, res) {
    res.send('NOT IMPLEMENTED: history list');
};

// Display detail page for a specific history.
exports.history_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: history detail: ' + req.params.id);
};

// Display history create form on GET.
exports.history_create_get = function(req, res, next) {
    Staff.find({},'first_name')
    .exec(function (err, staff_members) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('history_form', {title: 'Add Field Staff Update', staff_member_list: staff_members});
    });

};

// Handle history create on POST.
exports.history_create_post = [

    // Validate and sanitise fields.
    body('staff_member', 'Staff Member must be specified').trim().isLength({ min: 1 }).escape(),
    body('status_message', 'Update must be specified').trim().isLength({ min: 1 }).escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        var update = new History(
            {   
                status_message: req.body.status_message,
                staff_member: req.body.staff_member,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Staff.find({},'first_name')
                .exec(function (err, staff_members) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('history_form', { title: 'Add Field Staff Update', staff_member_list: staff_members, errors: errors.array(), update: update });
            });
            return;
        }
        else {
            // Data from form is valid.
            update.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(`/dashboard/staff/${update.staff_member}`);
                });
        }
    }
];

// Display history delete form on GET.
exports.history_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: history delete GET');
};

// Handle history delete on POST.
exports.history_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: history delete POST');
};

// Display history update form on GET.
exports.history_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: history update GET');
};

// Handle history update on POST.
exports.history_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: history update POST');
};