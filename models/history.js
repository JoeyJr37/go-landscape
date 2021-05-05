var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HistorySchema = new Schema(
    {
        status_message: { type: String, required: true },
        staff_member: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
        updated: { type: Date, default: Date.now },
    }
);

// Virtual for staff's url
HistorySchema
.virtual('url')
.get(function () {
    return '/dashboard/history/' + this._id;
});

// Export model
module.exports = mongoose.model('History', HistorySchema);