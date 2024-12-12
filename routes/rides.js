const express = require("express");
const { Ride, User } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { riderId, pickupLocation, dropLocation } = req.body;
    const ride = await Ride.create({ riderId, pickupLocation, dropLocation });
    res.status(201).send(ride);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ride = await Ride.findByPk(req.params.id, {
      include: [
        { model: User, as: "rider", attributes: ["name", "email"] },
        { model: User, as: "driver", attributes: ["name", "email"] },
      ],
    });
    if (!ride) return res.status(404).send({ message: "Ride not found" });
    res.send(ride);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const rides = await Ride.findAll({
      where: { riderId: req.params.userId },
    });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/accept", async (req, res) => {
  try {
    const { driverId } = req.body;
    const ride = await Ride.findByPk(req.params.id);
    if (!ride || ride.status !== "requested") {
      return res.status(400).json({ message: "Ride cannot be accepted" });
    }
    ride.driverId = driverId;
    ride.status = "accepted";
    await ride.save();
    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/complete", async (req, res) => {
    try {
      const ride = await Ride.findByPk(req.params.id);
      if (!ride || ride.status !== "accepted") {
        return res.status(400).json({ message: "Ride cannot be completed" });
      }
      ride.status = "completed";
      ride.fare = 25.0; // This could be calculated dynamically based on distance
      await ride.save();
      res.json(ride);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
