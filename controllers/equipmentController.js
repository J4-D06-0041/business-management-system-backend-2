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
        console.error('createEquipment Error:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findAll({ include: [{ model: User, as: 'salesPerson' }] });
        res.json(equipment);
    } catch (err) {
        console.error('getAllEquipment Error:', err);
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
        console.error('getEquipmentById Error:', err);
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
        console.error('updateEquipment Error:', err);
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
        console.error('deleteEquipment Error:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getLoggedInUserEquipment = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const equipment = await Equipment.findAll({
            where: { userId },
            include: [{ model: User, as: 'salesPerson' }]
        });
        if (!equipment.length) return res.status(404).json({ message: 'No equipment assigned to this user' });
        res.json(equipment);
    } catch (err) {
        console.error('getLoggedInUserEquipment Error:', err);
        res.status(500).json({ error: err.message });
    }
}