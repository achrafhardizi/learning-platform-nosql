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
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.get('/', courseController.getAllCourses); 
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;