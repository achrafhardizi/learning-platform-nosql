// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Séparer les routes dans différents fichiers permet de mieux organiser le code, de le rendre plus lisible et maintenable. Cela facilite également la gestion des routes, surtout dans les grandes applications, en permettant de diviser le code en modules logiques. De plus, cela permet à plusieurs développeurs de travailler simultanément sur différentes parties de l'application sans se marcher sur les pieds.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse : Pour organiser les routes de manière cohérente, il est recommandé de suivre ces bonnes pratiques :
// 1. Grouper les routes par fonctionnalité ou module (par exemple, toutes les routes liées aux utilisateurs dans un fichier userRoutes.js).
// 2. Utiliser des noms de routes clairs et descriptifs qui reflètent l'action effectuée (par exemple, /users/create pour créer un utilisateur).
// 3. Utiliser des méthodes HTTP appropriées (GET, POST, PUT, DELETE) pour les différentes actions.
// 4. Structurer les routes de manière hiérarchique et logique (par exemple, /users/:id pour accéder à un utilisateur spécifique).
// 5. Documenter les routes et leurs paramètres pour faciliter la compréhension et la maintenance du code.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     description: Create a new course with the provided details.
 *     responses:
 *       201:
 *         description: Course created successfully
 */
router.post('/', courseController.createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     description: Retrieve a specific course by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 */
router.get('/:id', courseController.getCourse);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve a list of all courses.
 *     responses:
 *       200:
 *         description: List of courses retrieved successfully
 */
router.get('/', courseController.getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     description: Update the details of a specific course by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
router.put('/:id', courseController.updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     description: Delete a specific course by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.delete('/:id', courseController.deleteCourse);

// router.get('/stats', courseController.getCourseStats);

module.exports = router;