// controllers/CustomerController.js
const Customer = require('../models/Customer');

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        console.error('Create Customer Error:', error);
        res.status(400).json({ error: error.message });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        console.error('Get All Customers Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error('Get Customer By ID Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
    try {
        const [updated] = await Customer.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCustomer = await Customer.findByPk(req.params.id);
            res.json(updatedCustomer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error('Update Customer Error:', error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
    try {
        const deleted = await Customer.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Customer deleted' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error('Delete Customer Error:', error);
        res.status(500).json({ error: error.message });
    }
};