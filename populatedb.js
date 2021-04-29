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

function staffCreate(first_name, last_name, date_of_birth, phone, email, pastor, location, position, cb) {
  staffdetail = 
    {
        first_name:first_name, 
        last_name: last_name,
        date_of_birth: date_of_birth,
        phone:phone,
        email:email,
        pastor: pastor,
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
          staffCreate(first_name, last_name, phone, email, pastor, location, position, callback);
        },
        function(callback) {
          bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authors[0], [genres[0],], callback);
        },
        function(callback) {
          bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0], [genres[0],], callback);
        },
        function(callback) {
          bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1], [genres[1],], callback);
        },
        function(callback) {
          bookCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authors[1], [genres[1],], callback);
        },
        function(callback) {
          bookCreate('Test Book 1', 'Summary of test book 1', 'ISBN111111', authors[4], [genres[0],genres[1]], callback);
        },
        function(callback) {
          bookCreate('Test Book 2', 'Summary of test book 2', 'ISBN222222', authors[4], false, callback)
        }
        ],
        // optional callback
        cb);
}


function createBookInstances(cb) {
    async.parallel([
        function(callback) {
          bookInstanceCreate(books[0], 'London Gollancz, 2014.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[1], ' Gollancz, 2011.', false, 'Loaned', callback)
        },
        function(callback) {
          bookInstanceCreate(books[2], ' Gollancz, 2015.', false, false, callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
        },
        function(callback) {
          bookInstanceCreate(books[0], 'Imprint XXX2', false, false, callback)
        },
        function(callback) {
          bookInstanceCreate(books[1], 'Imprint XXX3', false, false, callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createPositionsLocations,
    createBooks,
    createBookInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+bookinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



