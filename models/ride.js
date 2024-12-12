const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ride extends Model {
    static associate(models) {
      Ride.belongsTo(models.User, { as: "rider", foreignKey: "riderId" });
      Ride.belongsTo(models.User, { as: "driver", foreignKey: "driverId" });
    }
  }
  Ride.init(
    {
      riderId: DataTypes.INTEGER,
      driverId: DataTypes.INTEGER,
      status: { type: DataTypes.STRING, defaultValue: "requested" },
      pickupLocation: DataTypes.STRING,
      dropLocation: DataTypes.STRING,
      fare: DataTypes.FLOAT,
    },
    { sequelize, modelName: "Ride" }
  );
  return Ride;
};
