const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  description: { type: String, required: true },
  componentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
  repair: { type: Boolean, default: true },
});

module.exports = mongoose.model('Issue', IssueSchema);
