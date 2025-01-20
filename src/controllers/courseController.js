// Question: Quelle est la différence entre un contrôleur et une route ?
/* Réponse: Une route est une URL spécifique qui correspond à une action dans une application web.
Elle détermine quel contrôleur et quelle méthode doivent être exécutés lorsqu'une requête HTTP correspondante est reçue.
Un contrôleur, en revanche, est une composante qui contient la logique de traitement des requêtes. Il reçoit les requêtes des routes,
exécute la logique métier nécessaire, et renvoie une réponse appropriée au client.*/

// Question : Pourquoi séparer la logique métier des routes ?
/* Réponse : Séparer la logique métier des routes permet de maintenir un code propre, modulaire et facile à maintenir.
Les routes devraient uniquement gérer les requêtes HTTP et déléguer le traitement de la logique métier aux contrôleurs ou aux services.
Cela facilite les tests unitaires, car la logique métier peut être testée indépendamment des routes.*/


const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

// J'ai utilise une base de donne MongoDB deja existante pour les exemples il contient les films
async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  const { title, description, duration, instructor } = req.body;

  if (!title || !description || !duration || !instructor) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newCourse = {
    title,
    description,
    duration,
    instructor,
    createdAt: new Date(),
  };

  try {
    const db = await mongoService.connectMongo();
    const result = await db.collection('courses').insertOne(newCourse);
    const createdCourse = result.ops[0];

    res.status(201).json(createdCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getCourse(req, res) {
  const { id } = req.params;

  try {
    const cacheKey = `courses:${id}`;
    const cachedCourse = await redisService.getCachedData(cacheKey);

    if (cachedCourse) {
      return res.status(200).json(cachedCourse);
    }

    const db = await mongoService.connectMongo();
    const course = await db.collection('courses').findOne({ _id: new ObjectId(id) });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    await redisService.cacheData(cacheKey, course, 3600); // Cache for 1 hour
    res.status(200).json(course);
  } catch (error) {
    console.error('Error getting course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllCourses(req, res) {
  try {
    const cacheKey = 'courses:all';
    const cachedCourses = await redisService.getCachedData(cacheKey);

    if (cachedCourses) {
      return res.status(200).json(cachedCourses);
    }

    const db = await mongoService.connectMongo();
    const courses = await db.collection('courses').find().toArray();

    await redisService.cacheData(cacheKey, courses, 3600); // Cache for 1 hour
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error getting all courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateCourse(req, res) {
  const { id } = req.params;
  const { title, description, duration, instructor } = req.body;

  if (!title || !description || !duration || !instructor) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const db = await mongoService.connectMongo();
    const result = await db.collection('courses').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description, duration, instructor, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;

  try {
    const db = await mongoService.connectMongo();
    const result = await db.collection('courses').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
};