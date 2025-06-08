require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./config/db');

const authenticate = require('./middleware/authMiddleware');
const authorizeRole = require('./middleware/authorizeRole');

const User = require('./models/User');
const Product = require('./models/Product');
const Equipment = require('./models/Equipment');
const EquipmentInventory = require('./models/EquipmentInventory');
const Customer = require('./models/Customer');
const Sale = require('./models/Sale');
const SaleItem = require('./models/SaleItem');
const indexjs = require('./models/index');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Connect to DB
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('✅ Database connected successfully');
//     } catch (error) {
//         console.error('❌ DB Error:', error);
//     }
// })();

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
app.use('/api/equipment-inventory', require('./routes/equipmentInventoryRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));

app.get('/', (req, res) => {
  res.status(200).send('OK')
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