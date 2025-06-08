const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
        type: DataTypes.ENUM('super-admin', 'admin', 'sales-person', 'staff'),
        allowNull: false
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    contactNumber: { type: DataTypes.STRING, allowNull: false },
    birthdate: DataTypes.DATEONLY,
    startDate: DataTypes.DATEONLY,
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    },
    unitNumber: DataTypes.STRING,
    street: DataTypes.STRING,
    village: DataTypes.STRING,
    brgy: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    postalCode: DataTypes.STRING,
});

module.exports = User;