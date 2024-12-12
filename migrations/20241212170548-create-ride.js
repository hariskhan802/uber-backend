'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      riderId: {
        type: Sequelize.INTEGER
      },
      driverId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      pickupLocation: {
        type: Sequelize.STRING
      },
      dropLocation: {
        type: Sequelize.STRING
      },
      fare: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rides');
  }
};