// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  try {
    // Validate input
    const { error, value } = validateCourse(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create course
    const result = await mongoService.insertOne(COLLECTION, value);

    // Invalidate cache
    await redisService.invalidatePattern(`${CACHE_PREFIX}:*`);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
};