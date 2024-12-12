const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Fare extends Model {}
  Fare.init(
    {
      baseFare: { type: DataTypes.FLOAT, defaultValue: 50 },
      perKmRate: { type: DataTypes.FLOAT, defaultValue: 150 },
      waitingChargePerMinute: { type: DataTypes.FLOAT, defaultValue: 2 },
    },
    { sequelize, modelName: "Fare" }
  );
  return Fare;
};
