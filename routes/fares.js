const express = require("express");
const router = express.Router();


const FARE_CONFIG = {
  baseFare: 50,
  perKmRate: 150,
  waitingChargePerMinute: 2,
};

router.post("/calculate", (req, res) => {
  try {
    const { distanceInKm, waitingTimeInMinutes = 0 } = req.body;
    const baseFare = FARE_CONFIG.baseFare;
    const perKmRate = FARE_CONFIG.perKmRate;
    const waitingCharges = FARE_CONFIG.waitingChargePerMinute * waitingTimeInMinutes;
    const totalFare = baseFare + distanceInKm * perKmRate + waitingCharges;

    res.json({
      baseFare,
      perKmRate,
      waitingCharges,
      waitingTimeInMinutes,
      distanceInKm,
      totalFare,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
