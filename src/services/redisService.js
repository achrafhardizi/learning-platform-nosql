// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Pour gérer efficacement le cache avec Redis, il est important de définir des politiques d'expiration pour les clés afin d'éviter une utilisation excessive de la mémoire. Utilisez des structures de données appropriées pour vos besoins (par exemple, des listes, des ensembles, des hachages). Implémentez des stratégies de cache comme LRU (Least Recently Used) pour évincer les anciennes entrées. Surveillez les performances et ajustez les configurations de Redis en fonction de la charge et des besoins de l'application.

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utilisez des noms de clés descriptifs et cohérents pour faciliter la gestion et la compréhension des données. Évitez les clés trop longues pour réduire l'utilisation de la mémoire. Utilisez des namespaces (par exemple, "user:1001:profile") pour organiser les clés de manière logique. Limitez le nombre de clés pour éviter une surcharge de la mémoire et des performances. Enfin, définissez des expirations pour les clés temporaires afin de libérer automatiquement la mémoire.

const { connectRedis } = require("./db");

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
	// TODO: Implémenter une fonction générique de cache
	const redisClient = await connectRedis();
	return new Promise((resolve, reject) => {
		redisClient.set(key, JSON.stringify(data), "EX", ttl, (err) => {
			if (err) {
				return reject(err);
			}
			resolve();
		});
	});
}

async function getCachedData(key) {
	const redisClient = await connectRedis();
	return new Promise((resolve, reject) => {
		redisClient.get(key, (err, data) => {
			if (err) {
				return reject(err);
			}
			resolve(data ? JSON.parse(data) : null);
		});
	});
}

module.exports = {
	// TODO: Exporter les fonctions utilitaires
	cacheData,
	getCachedData,
};
