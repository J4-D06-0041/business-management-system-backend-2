/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - contactNumber
 *         - unitNumber
 *         - street
 *         - village
 *         - brgy
 *         - city
 *         - province
 *         - postalCode
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the customer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         contactNumber:
 *           type: string
 *         email:
 *           type: string
 *           nullable: true
 *         unitNumber:
 *           type: string
 *         street:
 *           type: string
 *         village:
 *           type: string
 *         brgy:
 *           type: string
 *         city:
 *           type: string
 *         province:
 *           type: string
 *         postalCode:
 *           type: string
 *         ltoNumber:
 *           type: string
 *           nullable: true
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           nullable: true
 *           description: Optional tags for the customer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         firstName: John
 *         lastName: Doe
 *         contactNumber: "1234567890"
 *         email: john.doe@example.com
 *         unitNumber: "12B"
 *         street: "Main Street"
 *         village: "Green Village"
 *         brgy: "Barangay 1"
 *         city: "Metro City"
 *         province: "Metro Province"
 *         postalCode: "1234"
 *         ltoNumber: "LTO-56789"
 *         tags: ["VIP", "Loyal", "Illegal-Seller"]
 *         createdAt: "2025-06-07T12:00:00Z"
 *         updatedAt: "2025-06-07T12:00:00Z"
 */
const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Invalid input
 */
router.post('/', authenticate, authorizeRole('super-admin', 'admin', 'sales-person'), CustomerController.createCustomer);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.get('/', authenticate, authorizeRole('super-admin', 'admin', 'sales-person'), CustomerController.getAllCustomers);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 */
router.get('/:id', authenticate, authorizeRole('super-admin', 'admin', 'sales-person'), CustomerController.getCustomerById);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customers]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 */
router.put('/:id', authenticate, authorizeRole('super-admin', 'admin', 'sales-person'), CustomerController.updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customers]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */
router.delete('/:id', authenticate, authorizeRole('super-admin', 'admin'), CustomerController.deleteCustomer);

module.exports = router;