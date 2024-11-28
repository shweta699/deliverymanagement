const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  repairPrice: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
});

module.exports = mongoose.model('Component', ComponentSchema);
