const express = require("express");
const { Ride } = require("../models");

const router = express.Router();

// Fetch booking history for a user
router.get("/:userId", async (req, res) => {
  try {
    const riderBookings = await Ride.findAll({ where: { riderId: req.params.userId } });
    const driverBookings = await Ride.findAll({ where: { driverId: req.params.userId } });

    res.json({ riderBookings, driverBookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
