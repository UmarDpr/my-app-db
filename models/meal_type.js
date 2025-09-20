const mongoose = require('mongoose');

const mealTypeSchema = new mongoose.Schema({
  mealTypeId: {
    type: String,
    required: true,
    unique: true // MT001, MT002...
  },
  mealTypeName: {
    type: String,
    required: true // Veg, Non-Veg
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("MealType", mealTypeSchema);
