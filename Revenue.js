const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('Revenue', RevenueSchema);
