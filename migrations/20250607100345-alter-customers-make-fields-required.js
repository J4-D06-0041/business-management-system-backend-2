'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Customers', 'contactNumber', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Customers', 'unitNumber', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Customers', 'street', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Customers', 'village', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Customers', 'city', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Customers', 'province', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Customers', 'postalCode', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
