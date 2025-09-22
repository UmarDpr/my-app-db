const express = require("express");
const router = express.Router();
const SessionType = require("../models/session_type"); // Capitalized

// POST /api/session_type
router.post("/", async (req, res) => {
  try {
    const statusMap = req.body.status === 1 ? "Active" : "Inactive"; // if frontend sends 0/1

    const sessionType = new SessionType({
      sessionTypeId: req.body.sessionTypeId,
      sessionTypeName: req.body.sessionTypeName,
      status: statusMap
    });

    const savedSessionType = await sessionType.save();
    res.status(201).json({ message: "Session Type saved", data: savedSessionType });
  } catch (err) {
    res.status(500).json({ error: "Error saving session type", details: err });
  }
});

// GET all session types
router.get("/", async (req, res) => {
  try {
    const sessionTypes = await SessionType.find();
    res.json(sessionTypes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching session types", details: err });
  }
});

// GET by ID
router.get("/:id", async (req, res) => {
  try {
    const sessionType = await SessionType.findById(req.params.id);
    if (!sessionType) return res.status(404).json({ message: "Session Type not found" });
    res.json(sessionType);
  } catch (err) {
    res.status(500).json({ error: "Error fetching session type", details: err });
  }
});

// PUT / update
router.put("/:id", async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.body.status !== undefined) {
      updateData.status = req.body.status === 1 ? "Active" : "Inactive";
    }

    const updatedSessionType = await SessionType.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedSessionType) return res.status(404).json({ message: "Session Type not found" });
    res.json({ message: "Session Type updated", data: updatedSessionType });
  } catch (err) {
    res.status(500).json({ error: "Error updating session type", details: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedSessionType = await SessionType.findByIdAndDelete(req.params.id);
    if (!deletedSessionType) return res.status(404).json({ message: "Session Type not found" });
    res.json({ message: "Session Type deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting session type", details: err });
  }
});

module.exports = router;
