// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Séparation des responsabilités, Réutilisabilité, Gestion centralisée 
// Question : Comment gérer proprement la fermeture des connexions ?
/* Réponse : 
    Création de fonctions dédiées pour la fermeture de chaque connexion,
    Gestion des erreurs avec try/catch,
    Vérification de l'existence des connexions avant de les fermer,
    Écoute des signaux de terminaison(SIGINT, SIGTERM) pour une fermeture propre,
    Fermeture asynchrone avec await pour s'assurer que les opérations sont terminées,
    Logging pour tracer les fermetures et les erreurs éventuelles
*/

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });

    await mongoClient.connect();
    db = mongoClient.db();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({
      url: config.REDIS_URL,
      retry_strategy: function (options) {
        if (options.total_retry_time > 1000 * 60 * 60) {
          return new Error('Retry time exhausted');
        }
        return Math.min(options.attempt * 100, 3000);
      }
    });

    await redisClient.connect();
    console.log('Redis connected successfully');
  } catch (error) {
    console.error('Redis connection error:', error);
    throw error;
  }
}

async function closeMongo() {
  try {
    if (mongoClient) {
      await mongoClient.close();
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

async function closeRedis() {
  try {
    if (redisClient) {
      await redisClient.quit();
      console.log('Redis connection closed');
    }
  } catch (error) {
    console.error('Error closing Redis connection:', error);
    throw error;
  }
}

// Gestionnaire pour la fermeture propre lors de l'arrêt de l'application
process.on('SIGINT', async () => {
  try {
    await Promise.all([closeMongo(), closeRedis()]);
    console.log('All database connections closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
});

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  closeMongo,
  closeRedis,
  mongoClient,
  redisClient,
  db
};