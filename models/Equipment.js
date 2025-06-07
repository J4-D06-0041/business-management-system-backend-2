const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Equipment = sequelize.define('Equipment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  plateNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vinNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  registrationDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  registrationExpiryDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true
});

// Association: Each equipment belongs to one sales-person (User)
Equipment.belongsTo(User, { as: 'salesPerson', foreignKey: 'userId' });

module.exports = Equipment;