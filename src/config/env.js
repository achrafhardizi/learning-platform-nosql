// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
/* Réponse : Il est important de valider les variables d'environnement au démarrage pour s'assurer que l'application dispose de toutes les configurations 
nécessaires pour fonctionner correctement. Cela permet de détecter rapidement les erreurs de configuration et d'éviter des comportements inattendus ou des pannes
 en production. De plus, cela améliore la sécurité en garantissant que des valeurs sensibles ou critiques sont correctement définies.*/

// Question: Que se passe-t-il si une variable requise est manquante ?
/* Réponse : Si une variable requise est manquante, l'application peut ne pas fonctionner correctement. Cela peut entraîner des erreurs, des comportements inattendus
 ou même des pannes complètes. Il est donc crucial de vérifier la présence de toutes les variables d'environnement nécessaires au démarrage de l'application et
 de fournir des valeurs par défaut ou des messages d'erreur clairs si elles sont absentes.*/

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  // Si une variable manque, lever une erreur explicative
  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(`Les variables d'environnement suivantes sont manquantes: ${missingVars.join(', ')}`);
  }
}

validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redisCache: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};