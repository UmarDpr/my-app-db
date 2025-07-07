// models/orderDetai.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  eventDate: Date,
  menu: Object,
  venue: String,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderDetails', OrderSchema);
 