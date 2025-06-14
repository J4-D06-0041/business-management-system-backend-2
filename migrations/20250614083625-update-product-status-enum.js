'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE Products 
      MODIFY COLUMN status ENUM('active', 'inactive', 'returnable') 
      NOT NULL DEFAULT 'active';
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE Products 
      MODIFY COLUMN status ENUM('active', 'inactive') 
      NOT NULL DEFAULT 'active';
    `);
  }
};
