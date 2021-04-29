var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeamSchema = new Schema(
    {
        name: {type: String, required: true},
        // members: {type: String, required: true},
    }
);

// Virtual for team's URL
TeamSchema
.virtual('url')
.get(function() {
    return '/teams/' + this._id;
});

// Export model
module.exports = mongoose.model('Teams', TeamSchema);
