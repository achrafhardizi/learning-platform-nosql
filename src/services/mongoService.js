// Question: Pourquoi créer des services séparés ?
// Réponse:

const { ObjectId } = require("mongodb");
const { connectMongo } = require("../config/db");
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

async function findAll(collectionName) {
    const cacheKey = `${collectionName}:all`;
    const cachedData = await getCachedData(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const db = await connectMongo();
    const collection = db.collection(collectionName);
    try {
        const documents = await collection.find().toArray();
        await cacheData(cacheKey, documents, 3600); // Cache for 1 hour
        return documents;
    } catch (error) {
        console.error("Error finding all documents:", error);
        throw error;
    }
}

async function create(collectionName, document) {
    const db = await connectMongo();
    const collection = db.collection(collectionName);
    try {
        const result = await collection.insertOne(document);
        return result.ops[0];
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
}

async function deleteById(collectionName, id) {
    const db = await connectMongo();
    const collection = db.collection(collectionName);
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error deleting document by ID:", error);
        throw error;
    }
}

async function updateById(collectionName, id, update) {
    const db = await connectMongo();
    const collection = db.collection(collectionName);
    try {
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: update }
        );
        return result.matchedCount > 0;
    } catch (error) {
        console.error("Error updating document by ID:", error);
        throw error;
    }
}

// Export des services
module.exports = {
    findOneById,
    findAll,
    create,
    deleteById,
    updateById,
};
