#! /usr/bin/env node

console.log('This script populates some test staff and locations to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Staff = require('./models/staff');
var Location = require('./models/location');
var Position = require('./models/positions');
var History = require('./models/history');
var Team = require('./models/team');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var staff_members = [];
var locations = [];
var positions = [];
var histories = [];
var teams = [];

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

function teamCreate(name, cb) {
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

function historyCreate(message, relevant_staff, cb) {
  var story = new History({ status_message: message, staff_member: relevant_staff });
       
  story.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Story: ' + story);
    histories.push(story)
    cb(null, story);
  }   );
}

function staffCreate(first, last, d_birth, phone, email, location, pastor, position, cb) {
  staffdetail = { 
      first_name: first,
      last_name: last,
      date_of_birth: d_birth,
      phone_number: phone,
      email_address: email,
      location: location,
      pastor: pastor,
      position: position,
  };
    
  var staff = new Staff(staffdetail);    
  staff.save(function (err) {
    if (err) {
      // cb(err, null)
      console.log(err);
      return
    }
    console.log('New Staff: ' + staff);
    staff_members.push(staff)
    cb(null, staff)
  }  );
}

function createHistory(cb) {
    async.series([
        function(callback) {
            historyCreate('Test update 1', staff_members[0], callback);
        },
        function(callback) {
            historyCreate('Test update 2', staff_members[0], callback);
        },
        function(callback) {
            historyCreate('Test update 3', staff_members[0], callback);
        },
        function(callback) {
            historyCreate('Test update 1', staff_members[1], callback);
        },
    ],
    // optional callback
    cb);
}

function createTeams(cb) {
    async.series([
        function(callback) {
            teamCreate('Antalya', callback);
        },
        function(callback) {
            teamCreate('Gateway', callback);
        },
        function(callback) {
            teamCreate('Izmir', callback);
        },
    ],
    //optional callback
    cb);
}

function createStaffMembers(cb) {
    async.series([
        function(callback) {
          staffCreate('Jubilee', 'Love', '1973-06-06', '713-515-4627', 'jubi7@protonmail.com', locations[0], 'Mallory Flippin', positions[1], callback);
        },
        function(callback) {
          staffCreate('Samuel', 'Jackson', '1973-06-06', '555-232-1234', 'samljackson@jackson.com', locations[1], 'Vincent Chan', positions[1], callback);
        },
        function(callback) {
          staffCreate('Mikey', 'McPherson', '1973-06-06', '234-123-3456', 'mickey@csi.com', locations[2], 'Miranda Silver', positions[0], callback);
        },
        function(callback) {
          staffCreate('Louie', 'TheFourteenth', '1973-06-06', '123-234-3456', 'king@england.com', locations[3], 'Velvet Fox', positions[0], callback);
        },
        ],
        // optional callback
        cb);
}


function createPositionLocations(cb) {
    async.parallel([
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
            locationCreate('Antalya', 'Turkey', callback);
        },
        function(callback) {
            locationCreate('Izmir', 'Turkey', callback);
        },
        function(callback) {
            locationCreate('Gateway', 'India', callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createPositionLocations,
    createStaffMembers,
    createHistory,
    createTeams,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('All good!');
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



