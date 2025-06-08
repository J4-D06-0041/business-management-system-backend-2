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

exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [
                { model: SaleItem, include: [Product] },
                { model: Customer },
                { model: Equipment }
            ],
            order: [['timestamp', 'DESC']]
        });

        if (!sales.length) {
            return res.status(404).json({ message: 'No sales found' });
        }

        res.json(sales);
    } catch (error) {
        console.error('Error fetching all sales:', error);
        res.status(500).json({ error: 'Failed to fetch sales' });
    }
};

exports.getSaleById = async (req, res) => {
    const saleId = req.params.id;

    try {
        const sale = await Sale.findByPk(saleId, {
            include: [
                { model: SaleItem, include: [Product] },
                { model: Customer },
                { model: Equipment }
            ]
        });

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.json(sale);
    } catch (error) {
        console.error('Error fetching sale by ID:', error);
        res.status(500).json({ error: 'Failed to fetch sale' });
    }
};

exports.getLoggedInUserSales = async (req, res) => {
    const userId = req.user.id;

    try {
        const sales = await Sale.findAll({
            where: { userId },
            include: [
                { model: SaleItem, include: [Product] },
                { model: Customer }
            ],
            order: [['timestamp', 'DESC']]
        });

        if (!sales.length) {
            return res.status(404).json({ message: 'No sales found for this user' });
        }

        res.json(sales);
    } catch (error) {
        console.error('Error fetching logged-in user sales:', error);
        res.status(500).json({ error: 'Failed to fetch sales' });
    }
};

exports.updateSale = async (req, res) => {
    const saleId = req.params.id;
    const { customerId, items, status } = req.body;

    try {
        const sale = await Sale.findByPk(saleId);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        // Update customer if provided
        if (customerId) {
            const customer = await Customer.findByPk(customerId);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            sale.customerId = customerId;
        }

        // Update status if provided
        if (status) {
            const validStatuses = ['pending', 'confirmed', 'confirmed-with-discrepancies'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }
            sale.status = status;
        }

        // Update sale items and inventory
        if (items && Array.isArray(items)) {
            let totalAmount = 0;

            for (const item of items) {
                const { productId, quantity, price } = item;
                const inventory = await EquipmentInventory.findOne({ where: { equipmentId: sale.equipmentId, productId } });

                if (!inventory || inventory.quantity < quantity) {
                    return res.status(400).json({ message: `Insufficient inventory for product ${productId}` });
                }

                totalAmount += price * quantity;

                // Update or create sale item
                let saleItem = await SaleItem.findOne({ where: { saleId, productId } });
                if (saleItem) {
                    saleItem.quantity = quantity;
                    saleItem.price = price;
                    await saleItem.save();
                } else {
                    await SaleItem.create({ saleId, productId, quantity, price });
                }

                // Deduct from inventory
                inventory.quantity -= quantity;
                await inventory.save();
            }

            sale.totalAmount = totalAmount;
        }

        await sale.save();
        res.json(sale);
    } catch (error) {
        console.error('Error updating sale:', error);
        res.status(500).json({ error: 'Failed to update sale' });
    }
};

exports.getLoggedInUserSaleById = async (req, res) => {
    const saleId = req.params.id;
    const userId = req.user.id;

    try {
        const sale = await Sale.findOne({
            where: { id: saleId, userId },
            include: [
                { model: SaleItem, include: [Product] },
                { model: Customer },
                { model: Equipment }
            ]
        });

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found for this user' });
        }

        res.json(sale);
    } catch (error) {
        console.error('Error fetching logged-in user sale by ID:', error);
        res.status(500).json({ error: 'Failed to fetch sale' });
    }
}