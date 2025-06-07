'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Equipment', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      plateNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vinNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      registrationDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      registrationExpiryDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.dropTable('Equipment');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
