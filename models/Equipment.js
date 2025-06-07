const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Equipment = sequelize.define('Equipment', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: DataTypes.TEXT,
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
  purchaseDate: DataTypes.DATE,
  plateNumber: DataTypes.STRING,
  vinNumber: DataTypes.STRING,
  registrationDate: DataTypes.DATE,
  registrationExpiryDate: DataTypes.DATE
});

Equipment.belongsTo(User, { foreignKey: 'userId', as: 'salesPerson' });

module.exports = Equipment;