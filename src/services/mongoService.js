// Question: Pourquoi créer des services séparés ?
// Réponse:

const { ObjectId } = require("mongodb");
const { connectMongo } = require("./db");
const { cacheData, getCachedData } = require("./redisService");

// Fonctions utilitaires pour MongoDB
async function findOneById(collectionName, id) {
	const cacheKey = `${collectionName}:${id}`;
	const cachedData = await getCachedData(cacheKey);

	if (cachedData) {
		return cachedData;
	}

	const db = await connectMongo();
	const collection = db.collection(collectionName);
	try {
		const document = await collection.findOne({ _id: new ObjectId(id) });
		if (document) {
			await cacheData(cacheKey, document, 3600); // Cache for 1 hour
		}
		return document;
	} catch (error) {
		console.error("Error finding document by ID:", error);
		throw error;
	}
}

// Export des services
module.exports = {
	// TODO: Exporter les fonctions utilitaires
	findOneById,
};
