// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  try {
    const db = getMongoDb();
    const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null;

    if (!objectId) {
      throw new Error('Invalid ID format');
    }

    return await db.collection(collection).findOne({ _id: objectId });
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById
};