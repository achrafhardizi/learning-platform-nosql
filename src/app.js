// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
// const studentRoutes = require('./routes/studentRoutes');

const { connectMongo, connectRedis } = require('./config/db');


const app = express();

async function startServer() {
  try {
    await connectRedis();
    console.log('Redis connection successful');
    await connectMongo();
    console.log('MongoDB connection successful');

    app.use(express.json());

    app.use('/api/courses', courseRoutes); 

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
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