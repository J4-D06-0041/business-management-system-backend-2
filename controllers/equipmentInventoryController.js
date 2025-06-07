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
    res.status(500).json({ error: err.message });
  }
};