/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Sales transactions
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

module.exports = router;