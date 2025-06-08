/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - role
 *         - firstName
 *         - lastName
 *         - contactNumber
 *         - birthdate
 *         - startDate
 *         - status
 *         - unitNumber
 *         - street
 *         - village
 *         - brgy
 *         - city
 *         - province
 *         - postalCode
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [super-admin, admin, sales-person, staff]
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         contactNumber:
 *           type: string
 *         birthdate:
 *           type: string
 *           format: date-time
 *         startDate:
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
 *           enum: [active, inactive]
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
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/', authenticate, authorizeRole('admin', 'super-admin'), controller.getAllUsers);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current logged in user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authenticate, controller.getCurrentUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/:id', authenticate, authorizeRole('admin', 'super-admin'), controller.getUserById);

/**
 * @swagger
 * /api/users/roles/sales:
 *   get:
 *     summary: Get all users with role sales-person
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sales-person users
 */
router.get('/roles/sales', authenticate, authorizeRole('admin', 'super-admin'), controller.getSalesPersons);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - role
 *               - firstName
 *               - lastName
 *               - contactNumber
 *               - birthdate
 *               - startDate
 *               - status
 *               - unitNumber
 *               - street
 *               - village
 *               - brgy
 *               - city
 *               - province
 *               - postalCode
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [super-admin, admin, sales-person, staff]
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date-time
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *               unitNumber:
 *                 type: string
 *               street:
 *                 type: string
 *               village:
 *                 type: string
 *               brgy:
 *                 type: string
 *               city:
 *                 type: string
 *               province:
 *                 type: string
 *               postalCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: User already exists
 */
router.post('/', authenticate, authorizeRole('admin', 'super-admin'), controller.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
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
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [super-admin, admin, sales-person, staff]
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date-time
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *               unitNumber:
 *                 type: string
 *               street:
 *                 type: string
 *               village:
 *                 type: string
 *               brgy:
 *                 type: string
 *               city:
 *                 type: string
 *               province:
 *                 type: string
 *               postalCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put('/:id', authenticate, authorizeRole('admin', 'super-admin'), controller.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/:id', authenticate, authorizeRole('admin', 'super-admin'), controller.deleteUser);

module.exports = router;
