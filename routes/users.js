const express = require("express");
const { User } = require("../models");

const router = express.Router();

// Get user profile
// Get all drivers
router.get("/drivers", async (req, res) => {
  try {
    const drivers = await User.findAll({
      where: { role: "driver" },
      attributes: ["id", "name", "email"],
    });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "role"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
