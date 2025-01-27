/**
 * A Riot API regional routing value.
 * @public
 */
enum Cluster {
	/** North and South America. */
	AMERICAS = "americas",

	/** Asia. */
	ASIA = "asia",

	/** Europe. */
	EUROPE = "europe",

	/** Southeast Asia. Not usable with the account API. */
	SEA = "sea",

	/** Esports. Not documented anywhere, but listed among the account API regions. */
	ESPORTS = "esports"
}

export default Cluster;
