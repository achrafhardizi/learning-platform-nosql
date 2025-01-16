// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse :
// API keys
// Access tokens
// Passwords
// Database credentials
// Les clés privées 

// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 
// Pour séparer la configuration du code source
// Pour faciliter le changement de configuration sans modifier le code
// Pour sécuriser les informations sensibles en les stockant en dehors du code source
// Pour permettre des configurations différentes selon les environnements (développement, test, production)
// Pour simplifier le déploiement et la gestion des applications

const { MongoClient } = require('mongodb');
const redis = require('redis');
const { mongodb } = require('./env');

let mongoClient;
let redisClient;
let db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  mongoClient = new MongoClient(mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');
    db = mongoClient.db(mongodb.dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  const redisUri = config.REDIS_URI;
  redisClient = redis.createClient(redisUri);

  redisClient.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
  });

  redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });

  return redisClient;
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  getMongoClient: () => mongoClient,
  getRedisClient: () => redisClient,
  getDb: () => db,
};