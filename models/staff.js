var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StaffSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        date_of_birth: { type: Date, required: true },
        phone_number: { type: String },
        email_address: { type: String},
        history: [ { type: String} ],
        pastor: { type: String, required: true },
        location: { type: Schema.Types.ObjectId, ref: 'Locations', required: true},
        // team: { type: Schema.Types.ObjectId, ref: 'Teams', required: true},
        position: { type: Schema.Types.ObjectId, ref: 'Positions', required: true },
        updated: {type: Date, default: Date.now},
        // team_members
        // status
        
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
    return '/staff/' + this._id;
});

// Export model
module.exports = mongoose.model('Staff', StaffSchema);