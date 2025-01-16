// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

// const courseRoutes = require('./routes/courseRoutes');
// const studentRoutes = require('./routes/studentRoutes');

const { connectMongo } = require('./config/db');


const app = express();

async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await connectMongo();
    console.log('MongoDB connection successful');

    // TODO: Configurer les middlewares Express
    // TODO: Monter les routes
    // TODO: Démarrer le serveur
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  try {
    const mongoClient = getMongoClient();
    if (mongoClient) {
      await mongoClient.close();
      console.log('MongoDB connection closed');
    }
    // TODO: Fermer d'autres connexions si nécessaire
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

startServer();