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

module.exports = router;
