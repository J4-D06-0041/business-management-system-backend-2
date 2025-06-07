const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Equipment = require('./Equipment');
const Product = require('./Product');

const EquipmentInventory = sequelize.define('EquipmentInventory', {
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
});

EquipmentInventory.belongsTo(Equipment, { foreignKey: 'equipmentId' });
EquipmentInventory.belongsTo(Product, { foreignKey: 'productId' });

module.exports = EquipmentInventory;