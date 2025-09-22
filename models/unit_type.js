const mongoose = require('mongoose');

const unitTypeSchema = new mongoose.Schema({
  unitTypeId: {
    type: String,
    required: true,
    unique: true
  },
  unitTypeName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("UnitType", unitTypeSchema);
