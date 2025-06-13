const Sale = require('./Sale');
const SaleItem = require('./SaleItem');
const Product = require('./Product');
const Customer = require('./Customer');
const Equipment = require('./Equipment');
const User = require('./User');

// Set up associations
Sale.hasMany(SaleItem, { foreignKey: 'saleId' });
Sale.belongsTo(Customer, { foreignKey: 'customerId' });
Sale.belongsTo(Equipment, { foreignKey: 'equipmentId' });
Sale.belongsTo(User, { foreignKey: 'userId' });

SaleItem.belongsTo(Sale, { foreignKey: 'saleId' });
SaleItem.belongsTo(Product, { foreignKey: 'productId' });

// Export models (optional, for organized access)
module.exports = {
  Sale,
  SaleItem,
  Product,
  Customer,
  Equipment,
};