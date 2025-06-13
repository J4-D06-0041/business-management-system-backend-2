const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Equipment = require('./Equipment');
const Customer = require('./Customer');
const SaleItem = require('./SaleItem');

const Sale = sequelize.define('Sale', {
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'confirmed-with-discrepancies'),
    allowNull: false,
    defaultValue: 'pending'
  },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

// Sale.hasMany(SaleItem, { foreignKey: 'saleId', as: 'items' });
// Sale.belongsTo(User, { foreignKey: 'userId' });
// Sale.belongsTo(Equipment, { foreignKey: 'equipmentId' });
// Sale.belongsTo(Customer, { foreignKey: 'customerId' });

module.exports = Sale;