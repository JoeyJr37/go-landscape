var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema(
    {
        city: {type: String, required: true},
        country: {type: String, required: true}
    }
);

// Virtual for Locations' URL
LocationSchema
.virtual('url')
.get(function () {
    return '/dashboard/locations/' + this._id;
});

// Export model
module.exports = mongoose.model('Locations', LocationSchema);