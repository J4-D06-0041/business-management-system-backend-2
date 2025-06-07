const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Equipment = require('./Equipment');
const Customer = require('./Customer');

const Sale = sequelize.define('Sale', {
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

Sale.belongsTo(User, { foreignKey: 'userId' });
Sale.belongsTo(Equipment, { foreignKey: 'equipmentId' });
Sale.belongsTo(Customer, { foreignKey: 'customerId' });

module.exports = Sale;