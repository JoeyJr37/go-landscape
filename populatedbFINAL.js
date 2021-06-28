console.log('This script populates staff and locations to database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

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

// function createHistory(cb) {
//     async.series([
//         function(callback) {
//             historyCreate('', staff_members[0], callback);
//         },
//         function(callback) {
//             historyCreate('Test update 2', staff_members[0], callback);
//         },
//         function(callback) {
//             historyCreate('Test update 3', staff_members[0], callback);
//         },
//         function(callback) {
//             historyCreate('Test update 1', staff_members[1], callback);
//         },
//     ],
//     // optional callback
//     cb);
// }

function createStaffMembers(cb) {
    async.series([
        function(callback) {
          staffCreate('Jonathan', 'Reynolds', '1984-12-30', '+90-531-824-7862', 'jwreyn18@fastmail.com', locations[1], 'Paul Hopkins', positions[0], callback);
        },
        function(callback) {
          staffCreate('Amie', 'Reynolds', '1985-09-09', '+90-531-824-7983', 'acreyn@fastmail.com', locations[1], 'Becca Nelson', positions[0], callback);
        },
        function(callback) {
          staffCreate('Landry', 'Reynolds', '2010-08-02', 'n/a', 'n/a', locations[1], 'n/a', positions[1], callback);
        },
        function(callback) {
          staffCreate('Stryder', 'Reynolds', '2012-04-15', 'n/a', 'n/a', locations[1], 'n/a', positions[1], callback);
        },
        function(callback) {
          staffCreate('Truett', 'Reynolds', '2015-01-31', 'n/a', 'n/a', locations[1], 'n/a', positions[1], callback);
        },
        function(callback) {
          staffCreate('Jachin', 'Reynolds', '2015-09-15', 'n/a', 'n/a', locations[1], 'n/a', positions[1], callback);
        },
        function(callback) {
          staffCreate('Audrea', 'Sprinkle', '1993-12-27', '+90-537-456-9357', 'audrea@fastmail.com', locations[1], 'Karen Mahler', positions[1], callback);
        },
        function(callback) {
          staffCreate('Peter', 'Rask', '1988-08-21', '+90-537-720-7607', 'ptrask@fastmail.com', locations[1], 'Thomas Flippin', positions[1], callback);
        },
        function(callback) {
          staffCreate('Matthew', 'Larsen', '1989-10-06', '+90-538-033-1195', 'mlarsen@fastmail.com', locations[2], 'Daniel Senneff', positions[0], callback);
        },
        function(callback) {
          staffCreate('Abbey', 'Larsen', '1989-09-01', '+90-538-055-1082', 'alo16@fastmail.com', locations[2], 'Teresa Sieh', positions[0], callback);
        },
        function(callback) {
          staffCreate('Matthew Jr', 'Larsen', '2005-10-22', 'n/a', 'n/a', locations[2], 'n/a', positions[1], callback);
        },
        function(callback) {
          staffCreate('Kaleb', 'Larsen', '2014-01-05', 'n/a', 'n/a', locations[2], 'n/a', positions[1], callback);
        },
        function(callback) {
          staffCreate('Jeff', 'Peterson', '1989-10-26', '+212-621-569-753', 'jhtx@protonmail.com', locations[4], 'Cole Marshall', positions[1], callback);
        },
        function(callback) {
          staffCreate('Betsy', 'Peterson', '1991-03-03', '832-303-9293', 'bhtx@protonmail.com', locations[4], 'Patricia Marshall', positions[1], callback);
        },
        function(callback) {
          staffCreate('Nam', 'Nguyen', '1994-08-08', '512-738-4532', 'namhai@fastmail.com', locations[0], 'unknown', positions[0], callback);
        },
        function(callback) {
          staffCreate('Molly', 'Nguyen', '1992-08-19', '512-738-4457', 'mollyrachel@fastmail.com', locations[0], 'unknown', positions[0], callback);
        },
        function(callback) {
          staffCreate('Emberlen', 'Binford', '1993-05-05', '+971-58-589-1849', 'emberlen@fastmail.com', locations[5], 'Keisha Pierce', positions[1], callback);
        },
        function(callback) {
          staffCreate('Jubilee', 'Love', '1999-01-14', '320-441-9952', 'jubilove@protonmail.com', locations[3], 'Mallory Flippin', positions[1], callback);
        },
        function(callback) {
          staffCreate('Zach', 'Hodges', '1994-02-03', '+91-973-813-0257', 'zach2394@protonmail.com', locations[6], 'Thomas Flippin', positions[1], callback);
        },
        function(callback) {
          staffCreate('Tracy', 'Hodges', '1991-10-31', '+977-982-320-7862', 'tracy1031@protonmail.com', locations[6], 'Karen Mahler', positions[1], callback);
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
        function(callback) {
            locationCreate('Unknown', 'Morocco', callback);
        },
        function(callback) {
            locationCreate('Dubai', 'UAE', callback);
        },
        function(callback) {
            locationCreate('Rajasthan', 'India', callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createPositionLocations,
    createStaffMembers,
    createHistory,
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



