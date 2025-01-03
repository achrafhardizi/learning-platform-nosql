// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :


const DEFAULT_TTL = 3600; // 1 hour in seconds

const createKey = (prefix, identifier) => `${prefix}:${identifier}`;


// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  // TODO: Implémenter une fonction générique de cache
  const client = getRedisClient();
  const serializedData = JSON.stringify(data);
  await client.setEx(key, ttl, serializedData);
}

module.exports = {
  // TODO: Exporter les fonctions utilitaires
  cacheData,
};