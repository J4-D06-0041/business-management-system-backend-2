/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Sales transactions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Sale:
 *       type: object
 *       required:
 *         - userId
 *         - equipmentId
 *         - totalAmount
 *         - timestamp
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         equipmentId:
 *           type: integer
 *         customerId:
 *           type: integer
 *           nullable: true
 *         totalAmount:
 *           type: number
 *           format: float
 *         timestamp:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [pending, confirmed, confirmed-with-discrepancies]
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/salesController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a sale and deduct from equipment inventory
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [equipmentId, items]
 *             properties:
 *               customerId:
 *                 type: integer
 *                 nullable: true
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productId, quantity, price]
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Sale successfully recorded
 *       400:
 *         description: Invalid input or insufficient inventory
 */
router.post(
  '/',
  authenticate,
  authorizeRole('super-admin', 'admin', 'sales-person'),
  controller.createSale
);

/**
 * @swagger
 * /api/sales/my-sales:
 *   get:
 *     summary: Get sales made by the currently logged-in user
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sales made by the user
 */
router.get(
  '/my-sales',
  authenticate,
  authorizeRole('sales-person'),
  controller.getLoggedInUserSales
);

/**
 * @swagger
 * /api/sales/my-sales/{id}:
 *   get:
 *     summary: Get a specific sale made by the currently logged-in user
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale details for the logged-in user
 *       404:
 *         description: Sale not found for the user
 */
router.get(
  '/my-sales/:id',
  authenticate,
  authorizeRole('sales-person'),
  controller.getLoggedInUserSaleById
);

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all sales
 */
router.get(
  '/',
  authenticate,
  authorizeRole('super-admin', 'admin'),
  controller.getAllSales
);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Get a sale by ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale details
 *       404:
 *         description: Sale not found
 */
router.get(
  '/:id',
  authenticate,
  authorizeRole('super-admin', 'admin'),
  controller.getSaleById
);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Update a sale by ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *     responses:
 *       200:
 *         description: Sale updated successfully
 */
router.put(
  '/:id',
  authenticate,
  authorizeRole('super-admin', 'admin'),
  controller.updateSale
);
module.exports = router;