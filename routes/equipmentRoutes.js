/**
 * @swagger
 * tags:
 *   name: Equipment
 *   description: Equipment (e.g., trucks) assigned to sales-persons
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *         purchaseDate:
 *           type: string
 *           format: date-time
 *         plateNumber:
 *           type: string
 *         vinNumber:
 *           type: string
 *         registrationDate:
 *           type: string
 *           format: date-time
 *         registrationExpiryDate:
 *           type: string
 *           format: date-time
 *         userId:
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
const controller = require('../controllers/equipmentController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

/**
 * @swagger
 * /api/equipment:
 *   get:
 *     summary: Get all equipment
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of equipment
 */
router.get('/', authenticate, authorizeRole('admin', 'super-admin'), controller.getAllEquipment);

/**
 * @swagger
 * /api/equipment/my-equipment:
 *   get:
 *     summary: Get equipment assigned to the authenticated sales-person
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of equipment assigned to the sales-person
 */
router.get('/my-equipment', authenticate, authorizeRole('sales-person'), controller.getLoggedInUserEquipment);

/**
 * @swagger
 * /api/equipment:
 *   post:
 *     summary: Create new equipment
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, userId]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: integer
 *               purchaseDate:
 *                 type: string
 *                 format: date
 *               plateNumber:
 *                 type: string
 *               vinNumber:
 *                 type: string
 *               registrationDate:
 *                 type: string
 *                 format: date
 *               registrationExpiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Equipment created
 */
router.post('/', authenticate, authorizeRole('admin', 'super-admin'), controller.createEquipment);

/**
 * @swagger
 * /api/equipment/{id}:
 *   get:
 *     summary: Get equipment by ID
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Equipment object
 *       404:
 *         description: Equipment not found
 */
router.get('/:id', authenticate, authorizeRole('admin', 'super-admin'), controller.getEquipmentById);

/**
 * @swagger
 * /api/equipment/{id}:
 *   put:
 *     summary: Update equipment by ID
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: integer
 *               purchaseDate:
 *                 type: string
 *                 format: date
 *               plateNumber:
 *                 type: string
 *               vinNumber:
 *                 type: string
 *               registrationDate:
 *                 type: string
 *                 format: date
 *               registrationExpiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Equipment updated
 *       404:
 *         description: Equipment not found
 */
router.put('/:id', authenticate, authorizeRole('admin', 'super-admin'), controller.updateEquipment);

/**
 * @swagger
 * /api/equipment/{id}:
 *   delete:
 *     summary: Deactivate (soft delete) equipment
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Equipment deactivated
 *       404:
 *         description: Equipment not found
 */
router.delete('/:id', authenticate, authorizeRole('admin', 'super-admin'), controller.deleteEquipment);

module.exports = router;