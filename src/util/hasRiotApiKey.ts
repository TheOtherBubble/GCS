import "util/env";

/**
 * Determine whether or not a Riot API key is set.
 * @public
 */
export default function hasRiotApiKey(): boolean {
	return "RIOT_API_KEY" in process.env;
}
