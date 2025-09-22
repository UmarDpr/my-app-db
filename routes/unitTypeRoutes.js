const express = require("express");
const router = express.Router();
const UnitType = require("../models/unit_type");

// POST /api/unit_type
router.post("/", async (req, res) => {
  try {
    // map frontend 0/1 to Active/Inactive
    const statusMap = req.body.status === 1 ? "Active" : "Inactive";

    const unitType = new UnitType({
      unitTypeId: req.body.unitTypeId,
      unitTypeName: req.body.unitTypeName,
      status: statusMap
    });

    const savedUnitType = await unitType.save();
    res.status(201).json({ message: "Unit Type saved", data: savedUnitType });
  } catch (err) {
    res.status(500).json({ error: "Error saving unit type", details: err });
  }
});

// GET all unit types
router.get("/", async (req, res) => {
  try {
    const unitTypes = await UnitType.find();
    res.json(unitTypes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching unit types", details: err });
  }
});

// GET unit type by ID
router.get("/:id", async (req, res) => {
  try {
    const unitType = await UnitType.findById(req.params.id);
    if (!unitType) return res.status(404).json({ message: "Unit Type not found" });
    res.json(unitType);
  } catch (err) {
    res.status(500).json({ error: "Error fetching unit type", details: err });
  }
});

// PUT / update
router.put("/:id", async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.body.status !== undefined) {
      updateData.status = req.body.status === 1 ? "Active" : "Inactive";
    }

    const updatedUnitType = await UnitType.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedUnitType) return res.status(404).json({ message: "Unit Type not found" });
    res.json({ message: "Unit Type updated", data: updatedUnitType });
  } catch (err) {
    res.status(500).json({ error: "Error updating unit type", details: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedUnitType = await UnitType.findByIdAndDelete(req.params.id);
    if (!deletedUnitType) return res.status(404).json({ message: "Unit Type not found" });
    res.json({ message: "Unit Type deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting unit type", details: err });
  }
});

module.exports = router;
