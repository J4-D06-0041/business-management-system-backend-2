require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');
const User = require('../models/User');

async function seedUsers() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to DB');

        await sequelize.sync(); // ensure table exists

        const users = [
            {
                username: 'superadmin_user',
                password: 'superadminpass',
                role: 'super-admin',
                firstName: 'Sam',
                lastName: 'Superadmin',
                contactNumber: '1234567890',
                birthdate: '1975-03-20',
                startDate: '2015-01-01'
            },
            {
                username: 'admin_user',
                password: 'adminpass',
                role: 'admin',
                firstName: 'Alice',
                lastName: 'Admin',
                contactNumber: '0987654321',
                birthdate: '1980-01-01',
                startDate: '2020-01-01'
            },
            {
                username: 'sales_user',
                password: 'salespass',
                role: 'sales-person',
                firstName: 'Bob',
                lastName: 'Sales',
                contactNumber: '1122334455',
                birthdate: '1988-04-12',
                startDate: '2021-07-01'
            },
            {
                username: 'staff_user',
                password: 'staffpass',
                role: 'staff',
                firstName: 'Charlie',
                lastName: 'Staff',
                contactNumber: '5566778899',
                birthdate: '1990-09-10',
                startDate: '2022-02-01'
            }
        ];

        for (const user of users) {
            const hashed = await bcrypt.hash(user.password, 10);
            await User.create({
                username: user.username,
                password: hashed,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                contactNumber: user.contactNumber,
                birthdate: user.birthdate,
                startDate: user.startDate
            });
        }

        console.log('✅ Users inserted');
    } catch (err) {
        console.error('❌ Error inserting users:', err);
    } finally {
        await sequelize.close();
    }
}

seedUsers();