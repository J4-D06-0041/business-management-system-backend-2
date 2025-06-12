const EquipmentInventory = require('../models/EquipmentInventory');
const Product = require('../models/Product');
const Equipment = require('../models/Equipment');

exports.getLoggedInUserInventory = async (req, res) => {
  try {
    const userId = req.user.id;

    const equipments = await Equipment.findAll({ where: { userId } });
    if (!equipments.length) return res.status(404).json({ message: 'No equipment assigned to this user' });

    const equipmentIds = equipments.map(e => e.id);

    const inventory = await EquipmentInventory.findAll({
      where: { equipmentId: equipmentIds },
      include: [Product]
    });

    res.json(inventory);
  } catch (err) {
    console.error('getLoggedInUserInventory Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.assignProductToEquipment = async (req, res) => {
  try {
    const { equipmentId, productId, quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient product quantity in inventory' });
    }

    let record = await EquipmentInventory.findOne({ where: { equipmentId, productId } });
    if (record) {
      record.quantity += quantity;
      await record.save();
    } else {
      record = await EquipmentInventory.create({ equipmentId, productId, quantity });
    }

    product.quantity -= quantity;
    await product.save();

    res.status(200).json(record);
  } catch (err) {
    console.error('assignProductToEquipment Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateEquipmentInventory = async (req, res) => {
  try {
    const { equipmentId, productId } = req.params;
    const { quantity } = req.body;

    const record = await EquipmentInventory.findOne({ where: { equipmentId, productId } });
    if (!record) return res.status(404).json({ message: 'Inventory record not found' });

    record.quantity = quantity;
    await record.save();
    res.json(record);
  } catch (err) {
    console.error('updateEquipmentInventory Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getEquipmentInventory = async (req, res) => {
  try {
    const { equipmentId } = req.params;

    const inventory = await EquipmentInventory.findAll({
      where: { equipmentId },
      include: [Product]
    });

    res.json(inventory);
  } catch (err) {
    console.error('getEquipmentInventory Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.returnProductToInventory = async (req, res) => {
  try {
    const { equipmentId, productId, quantity } = req.body;

    const record = await EquipmentInventory.findOne({ where: { equipmentId, productId } });
    if (!record) return res.status(404).json({ message: 'Inventory record not found' });
    if (record.quantity < quantity) {
      return res.status(400).json({ message: 'Return quantity exceeds inventory quantity' });
    }

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    record.quantity -= quantity;
    await record.save();

    product.quantity += quantity;
    await product.save();

    res.json(record);
  } catch (err) {
    console.error('returnProductToInventory Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEquipmentInventory = async (req, res) => {
  try {
    const inventory = await EquipmentInventory.findAll({
      include: [
        { model: Equipment, attributes: ['name', 'description'] },
        { model: Product, attributes: ['name', 'description', 'price'] }
      ]
    });

    // Convert price to number
    const inventoryWithNumericPrice = inventory.map(item => {
      const data = item.toJSON();
      if (data.Product && typeof data.Product.price === 'string') {
        data.Product.price = parseFloat(data.Product.price);
      }
      return data;
    });

    res.json(inventoryWithNumericPrice);
  } catch (err) {
    console.error('getAllEquipmentInventory Error:', err);
    res.status(500).json({ error: err.message });
  }
}

exports.getEquipmentInventoryByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const inventory = await EquipmentInventory.findAll({
      where: { productId },
      include: [Equipment]
    });

    if (!inventory.length) return res.status(404).json({ message: 'No inventory found for this product' });

    res.json(inventory);
  } catch (err) {
    console.error('getEquipmentInventoryByProduct Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getEquipmentInventoryByEquipment = async (req, res) => {
  try {
    const { equipmentId } = req.params;

    const inventory = await EquipmentInventory.findAll({
      where: { equipmentId },
      include: [Product]
    });

    if (!inventory.length) return res.status(404).json({ message: 'No inventory found for this equipment' });

    res.json(inventory);
  } catch (err) {
    console.error('getEquipmentInventoryByEquipment Error:', err);
    res.status(500).json({ error: err.message });
  }
};

