const mongoose = require('mongoose');

const sessionTypeSchema = new mongoose.Schema({
  sessionTypeId: {
    type: String,
    required: true,
    unique: true
  },
  sessionTypeName: {
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

module.exports = mongoose.model("SessionType", sessionTypeSchema);
