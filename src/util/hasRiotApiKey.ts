import "util/env";

/**
 * Determine whether or not a Riot API key is set.
 * @public
 */
export default function hasRiotApiKey() {
	return "RIOT_API_KEY" in process.env;
}
