import type { Platform } from "types/db/Platform";
import getClusterForPlatform from "./getClusterForPlatform";
import getMatchDto from "riot/getMatchDto";

/**
 * Get a match from the Riot ID with a game ID.
 * @param id - The game ID.
 * @param platform - The platform ID.
 * @param key - The Riot API key to use.
 * @returns The match.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function getMatchDtoByGameId(
	id: number,
	platform: Platform = "NA1",
	key: string | undefined = void 0
) {
	return await getMatchDto(
		`${platform}_${id.toString()}`,
		getClusterForPlatform(platform),
		key
	);
}
