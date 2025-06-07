const Equipment = require('../models/Equipment');
const User = require('../models/User');

exports.createEquipment = async (req, res) => {
    try {
        const {
            name,
            description,
            userId,
            purchaseDate,
            plateNumber,
            vinNumber,
            registrationDate,
            registrationExpiryDate
        } = req.body;
        const equipment = await Equipment.create({
            name,
            description,
            userId,
            purchaseDate,
            plateNumber,
            vinNumber,
            registrationDate,
            registrationExpiryDate
        });
        res.status(201).json(equipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findAll({ include: [{ model: User, as: 'salesPerson' }] });
        res.json(equipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id, {
            include: [{ model: User, as: 'salesPerson' }]
        });
        if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
        res.json(equipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
        await equipment.update(req.body);
        res.json(equipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
        await equipment.update({ status: 'inactive' });
        res.json({ message: 'Equipment deactivated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};