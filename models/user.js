const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: "rider" },
    },
    { sequelize, modelName: "User" }
  );
  return User;
};
