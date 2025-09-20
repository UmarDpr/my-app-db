const express = require("express");
const router = express.Router();
const MealType = require("../models/meal_type");

router.get("/test", (req, res) => {
  res.send("✅ MealType test route works");
});

//  Create MealType
// POST /api/meal-types

router.post("/", async (req, res) => {
  try {
    const mealType = new MealType({
      mealTypeId: req.body.mealTypeId,
      mealTypeName: req.body.mealTypeName,
      status: req.body.status || "Active"
    });

    const savedMealType = await mealType.save();
    res.status(201).json({ message: "Meal Type saved", data: savedMealType });
  } catch (err) {
    res.status(500).json({ error: "Error saving meal type", details: err });
  }
});

// Get All MealTypes
// GET /api/meal-types

router.get("/", async (req, res) => {
  try {
    const mealTypes = await MealType.find();
    res.json(mealTypes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching meal types", details: err });
  }
});

//  Get MealType by ID
// GET /api/meal-types/:id
router.get("/:id", async (req, res) => {
  try {
    const mealType = await MealType.findById(req.params.id);
    if (!mealType) return res.status(404).json({ message: "Meal Type not found" });
    res.json(mealType);
  } catch (err) {
    res.status(500).json({ error: "Error fetching meal type", details: err });
  }
});

// Update MealType
// PUT /api/meal-types/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedMealType = await MealType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMealType) return res.status(404).json({ message: "Meal Type not found" });
    res.json({ message: "Meal Type updated", data: updatedMealType });
  } catch (err) {
    res.status(500).json({ error: "Error updating meal type", details: err });
  }
});

// Delete MealType
// DELETE /api/meal-types/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedMealType = await MealType.findByIdAndDelete(req.params.id);
    if (!deletedMealType) return res.status(404).json({ message: "Meal Type not found" });
    res.json({ message: "Meal Type deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting meal type", details: err });
  }
});

module.exports = router;
