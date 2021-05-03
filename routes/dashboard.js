var express = require('express');
var router = express.Router();

// Require controller modules.
var staff_controller = require('../controllers/staffController');
var locations_controller = require('../controllers/locationsController');
var positions_controller = require('../controllers/positionsController');
var teams_controller = require('../controllers/teamsController');

/// STAFF ROUTES ///

// GET catalog home page.
router.get('/', staff_controller.index);

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

/// POSITIONS ROUTES ///
/*
// GET request for creating a Position. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

/// TEAMS ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);

// POST request for creating BookInstance.
router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);

// GET request to delete BookInstance.
router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);

// POST request to delete BookInstance.
router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);

// GET request to update BookInstance.
router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// POST request to update BookInstance.
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);

// GET request for one BookInstance.
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

// GET request for list of all BookInstance.
router.get('/bookinstances', book_instance_controller.bookinstance_list);
*/
module.exports = router;