var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StaffSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        date_of_birth: { type: Date, required: true },
        phone_number: { type: String },
        email_address: { type: String},
        location: { type: Schema.Types.ObjectId, ref: 'Locations', required: true},
        pastor: { type: String},
        position: { type: Schema.Types.ObjectId, ref: 'Positions', required: true },
        team: { type: Schema.Types.ObjectId, ref: 'Teams'},
        // history: [ { type: Schema.Types.ObjectId, ref: 'History'} ],
        // status: most recently updated history object
        // team_members
    }
);

// Virtual for staff's age
StaffSchema
.virtual('age')
.get(function () {
    return Date.now - this.date_of_birth;
});

// Virtual for staff's url
StaffSchema
.virtual('url')
.get(function () {
    return '/dashboard/staff/' + this._id;
});

// Export model
module.exports = mongoose.model('Staff', StaffSchema);