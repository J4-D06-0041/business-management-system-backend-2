/**
 * @swagger
 * tags:
 *   name: EquipmentInventory
 *   description: Manage inventory assigned to equipment
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EquipmentInventory:
 *       type: object
 *       required:
 *         - equipmentId
 *         - productId
 *         - quantity
 *       properties:
 *         id:
 *           type: integer
 *         equipmentId:
 *           type: integer
 *         productId:
 *           type: integer
 *         quantity:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/equipmentInventoryController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

/**
 * @swagger
 * /api/equipment-inventory:
 *   post:
 *     summary: Assign a product to equipment inventory
 *     tags: [EquipmentInventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [equipmentId, productId, quantity]
 *             properties:
 *               equipmentId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product assigned to equipment inventory
 */
router.post('/', authenticate, authorizeRole('admin', 'super-admin'), controller.assignProductToEquipment);

/**
 * @swagger
 * /api/equipment-inventory/my-equipment-inventory:
 *   get:
 *     summary: Get inventory assigned to the currently logged-in user
 *     tags: [EquipmentInventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Equipment inventory for logged-in user
 *       404:
 *         description: No equipment assigned
 */
router.get('/my-equipment-inventory', authenticate, controller.getLoggedInUserInventory);

/**
 * @swagger
 * /api/equipment-inventory/all:
 *   get:
 *     summary: Get all equipment inventory entries
 *     tags: [EquipmentInventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all equipment inventory entries
 */
router.get('/all', authenticate, authorizeRole('admin', 'super-admin'), controller.getAllEquipmentInventory);

/**
 * @swagger
 * /api/equipment-inventory/return:
 *   post:
 *     summary: Return product to main inventory from equipment
 *     tags: [EquipmentInventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [equipmentId, productId, quantity]
 *             properties:
 *               equipmentId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Inventory updated after product return
 */
router.post('/return', authenticate, authorizeRole('admin', 'super-admin'), controller.returnProductToInventory);

/**
 * @swagger
 * /api/equipment-inventory/{equipmentId}:
 *   get:
 *     summary: Get inventory for a specific equipment
 *     tags: [EquipmentInventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: equipmentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Equipment inventory list
 */
router.get('/:equipmentId', authenticate, authorizeRole('admin', 'super-admin'), controller.getEquipmentInventory);

/**
 * @swagger
 * /api/equipment-inventory/by-product/{productId}:
 *   get:
 *     summary: Get all equipment inventory entries for a specific product
 *     tags: [EquipmentInventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Equipment inventory list for the product
 */
router.get('/by-product/:productId', authenticate, authorizeRole('admin', 'super-admin'), controller.getEquipmentInventoryByProduct);

/**
 * @swagger
 * /api/equipment-inventory/{equipmentId}/{productId}:
 *   put:
 *     summary: Update quantity of an assigned product
 *     tags: [EquipmentInventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: equipmentId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: productId
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
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Equipment inventory updated
 */
router.put('/:equipmentId/:productId', authenticate, authorizeRole('admin', 'super-admin'), controller.updateEquipmentInventory);

module.exports = router;