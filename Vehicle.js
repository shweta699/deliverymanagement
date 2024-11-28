const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true },
  ownerName: { type: String, required: true },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
