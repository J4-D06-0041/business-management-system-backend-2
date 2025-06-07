const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  price: { type: DataTypes.FLOAT, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = Product;