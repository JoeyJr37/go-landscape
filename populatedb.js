#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')

var Location = require('./models/location')
var Position = require('./models/positions')
var Staff = require('./models/staff')
var Team = require('./models/team')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var locations = []
var positions = []
var staff_names = []
var teams = []

function staffCreate(first_name, last_name, date_of_birth, phone, email, [history] ,pastor, location, position, cb) {
  staffdetail = 
    {
        first_name:first_name, 
        last_name: last_name,
        date_of_birth: date_of_birth,
        phone:phone,
        email:email,
        pastor: pastor,
        [history]:[history],
        location: location,
        position: position,
    }
  
  var staff = new Staff(staffdetail);
       
  staff.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Staff: ' + staff);
    staff_names.push(staff)
    cb(null, staff)
  }  );
}

function locationCreate(city, country, cb) {
  var location = new Location({ city: city, country: country });
       
  location.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Location: ' + location);
    locations.push(location)
    cb(null, location);
  }   );
}

function positionCreate(title, cb) {
  var position = new Position({ title: title });
       
  position.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Position: ' + position);
    positions.push(position)
    cb(null, position);
  }   );
}

function teamsCreate(name, cb) {
  var team = new Team({ name: name });
       
  team.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Team: ' + team);
    teams.push(team)
    cb(null, team);
  }   );
}

function createPositionsLocations(cb) {
    async.series([
        function(callback) {
          positionCreate('Team Leader', callback);
        },
        function(callback) {
          positionCreate('Team Member', callback);
        },
        function(callback) {
          locationCreate('Siliguri', 'India', callback);
        },
        function(callback) {
          locationCreate('Rajasthan', 'India', callback);
        },
        function(callback) {
          locationCreate('Gateway', 'India', callback);
        },
        function(callback) {
          locationCreate('Izmir','Turkey', callback);
        },
        function(callback) {
          locationCreate('Sale','Morocco', callback);
        },
        function(callback) {
          locationCreate('Dubai','UAE', callback);
        },
        function(callback) {
          locationCreate('Antalya','Turkey', callback);
        },
        ],
        // optional callback
        cb);
}


function createStaff(cb) {
    async.parallel([
        function(callback) {
          staffCreate('Jubilee', 'Love', '1-320-441-9952', 'jubilove@protonmail.com', ['Launched: Feb 8th, 2021', 'Fully funded!'], 'Mallory Flippin', locations[2], positions[1], callback);
        },
        function(callback) {
          staffCreate('Audrea', 'Sprinkle', '90-537-456-9357', 'audrea@fastmail.com', ['Went on a trip!', 'Launched: ???'], 'Karen Mahler', locations[6], positions[1], callback);
        },
        function(callback) {
          staffCreate('Emberlen', 'Binford', '1-936-615-3272', 'emberlen@fastmail.com', ['Scheduled a prayer call', 'Launched: 2020', 'Landed: 2020'], 'Keisha Pierce', locations[5], positions[1], callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createPositionsLocations,
    createStaff,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    
    // All done, disconnect from database
    mongoose.connection.close();
});



