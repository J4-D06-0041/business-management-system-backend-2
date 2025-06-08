const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Sale = require('./Sale');
const Product = require('./Product');

const SaleItem = sequelize.define('SaleItem', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false }
});

// SaleItem.belongsTo(Sale, { foreignKey: 'saleId' });
// SaleItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = SaleItem;