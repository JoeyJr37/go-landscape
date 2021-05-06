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
exports.history_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: history create GET');
};

// Handle history create on POST.
exports.history_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: history create POST');
};

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