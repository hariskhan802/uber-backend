const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Fare extends Model {}
  Fare.init(
    {
      baseFare: DataTypes.FLOAT,
      perKmRate: DataTypes.FLOAT,
    },
    { sequelize, modelName: "Fare" }
  );
  return Fare;
};
