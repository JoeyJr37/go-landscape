var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PositionSchema = new Schema(
    {
        title: {type: String, required: true},
    }
);

// Virtual for Positions' URL
PositionSchema
.virtual('url')
.get(function () {
    return '/positions/' + this._id;
});

// Export model
module.exports = mongoose.model('Positions', PositionSchema);