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
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
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
    const createdCourse = await mongoService.create('courses', newCourse);
    res.status(201).json(createdCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getCourse(req, res) {
  const { id } = req.params;

  try {
    const course = await mongoService.findOneById('courses', id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error getting course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllCourses(req, res) {
  try {
    const courses = await mongoService.findAll('courses');
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

  const update = {
    title,
    description,
    duration,
    instructor,
    updatedAt: new Date(),
  };

  try {
    const updated = await mongoService.updateById('courses', id, update);

    if (!updated) {
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
    const deleted = await mongoService.deleteById('courses', id);

    if (!deleted) {
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
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
};