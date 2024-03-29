var express = require('express');
var router = express.Router();

// Require controller modules.
var staff_controller = require('../controllers/staffController');
var locations_controller = require('../controllers/locationsController');
var history_controller = require('../controllers/historyController');

/// STAFF ROUTES ///

// GET catalog home page.
router.get('/', staff_controller.staff_list);

// GET request for creating a Staff member. 
// NOTE This must come before routes that display Staff (uses id).
router.get('/staff/create', staff_controller.staff_create_get);

// POST request for creating Staff member.
router.post('/staff/create', staff_controller.staff_create_post);

// GET request to delete Staff member.
router.get('/staff/:id/delete', staff_controller.staff_delete_get);

// POST request to delete Staff member.
router.post('/staff/:id/delete', staff_controller.staff_delete_post);

// GET request to update Staff member.
router.get('/staff/:id/update', staff_controller.staff_update_get);

// POST request to update Staff member.
router.post('/staff/:id/update', staff_controller.staff_update_post);

// GET request for one Staff member.
router.get('/staff/:id', staff_controller.staff_detail);

// GET request for list of all Staff members.
router.get('/staff', staff_controller.staff_list);

/// HISTORY ROUTES ///

// GET request for creating Updates
router.get('/history/create', history_controller.history_create_get);

// POST request for creating Updates
router.post('/history/create', history_controller.history_create_post);

/// LOCATIONS ROUTES ///

// GET request for creating Location. NOTE This must come before route for id (i.e. display author).
router.get('/locations/create', locations_controller.locations_create_get);

// POST request for creating Location.
router.post('/locations/create', locations_controller.locations_create_post);

// GET request to delete Location.
router.get('/locations/:id/delete', locations_controller.locations_delete_get);

// POST request to delete Location.
router.post('/locations/:id/delete', locations_controller.locations_delete_post);

// GET request to update Location.
router.get('/locations/:id/update', locations_controller.locations_update_get);

// POST request to update Location.
router.post('/locations/:id/update', locations_controller.locations_update_post);

// GET request for one Location.
router.get('/locations/:id', locations_controller.locations_detail);

// GET request for list of all Locations.
router.get('/locations', locations_controller.locations_list);

module.exports = router;