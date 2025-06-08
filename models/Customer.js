const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Customer = sequelize.define('Customer', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    contactNumber: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    unitNumber: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },
    village: { type: DataTypes.STRING, allowNull: false },
    brgy: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    province: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false},
    ltoNumber: { type: DataTypes.STRING, allowNull: true },
    tags: { type: DataTypes.JSON, allowNull: true, defaultValue: [] }
});

module.exports = Customer;