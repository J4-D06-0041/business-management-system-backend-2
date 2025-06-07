require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./config/db');
const User = require('./models/User');
const authenticate = require('./middleware/authMiddleware');
const authorizeRole = require('./middleware/authorizeRole');
const Product = require('./models/Product');
const Equipment = require('./models/Equipment');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Connect to DB
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');

        await sequelize.sync({ alter: true }); // or force: true
        console.log('✅ Database synchronized');
    } catch (error) {
        console.error('❌ DB Error:', error);
    }
})();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/equipment', require('./routes/equipmentRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Example of a protected route
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.user.role}! You are authenticated.` });
});


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('exit', (code) => {
  console.log(`❗ Process exiting with code: ${code}`);
});

process.on('uncaughtException', err => {
  console.error('❌ Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
  console.error('❌ Unhandled Rejection:', err);
});

setInterval(() => {}, 1000);