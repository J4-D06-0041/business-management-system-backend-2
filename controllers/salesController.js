const Sale = require('../models/Sale');
const SaleItem = require('../models/SaleItem');
const EquipmentInventory = require('../models/EquipmentInventory');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Equipment = require('../models/Equipment');

exports.createSale = async (req, res) => {
    const { customerId, items } = req.body;
    const userId = req.user.id;

    const equipment = await Equipment.findOne({ where: { userId } });
    if (!equipment) {
        return res.status(400).json({ message: 'No equipment assigned to this user' });
    }
    const equipmentId = equipment.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'No sale items provided' });
    }

    try {
        let totalAmount = 0;

        // Check inventory and calculate total
        for (const item of items) {
            const { productId, quantity } = item;
            const inventory = await EquipmentInventory.findOne({ where: { equipmentId, productId } });
            if (!inventory || inventory.quantity < quantity) {
                return res.status(400).json({ message: `Insufficient inventory for product ${productId}` });
            }

            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: `Product ${productId} not found` });
            }

            if (typeof item.price !== 'number' || item.price <= 0) {
                return res.status(400).json({ message: `Invalid price for product ${productId}` });
            }
            totalAmount += item.price * quantity;
        }

        // Create sale
        const sale = await Sale.create({
            userId,
            equipmentId,
            customerId,
            totalAmount,
            timestamp: new Date()
        });

        // Create sale items and deduct from inventory
        for (const item of items) {
            const { productId, quantity, price } = item;
            await SaleItem.create({ saleId: sale.id, productId, quantity, price });

            const inventory = await EquipmentInventory.findOne({ where: { equipmentId, productId } });
            inventory.quantity -= quantity;
            await inventory.save();
        }

        res.status(201).json({ sale, items });
    } catch (error) {
        console.error('Sale creation failed:', error);
        res.status(500).json({ error: 'Failed to create sale' });
    }
};
