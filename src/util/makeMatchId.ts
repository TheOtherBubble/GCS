import type { platformEnum } from "db/schema";

/**
 * Make a match ID from a platform routing value and a game ID.
 * @param gameId - The game ID.
 * @param platform - The platform routing value.
 * @returns The match ID.
 * @public
 */
export default function makeMatchId(
	gameId: number | `${number}`,
	platform: (typeof platformEnum.enumValues)[number] = "NA1"
): `${(typeof platformEnum.enumValues)[number]}_${number}` {
	return `${platform}_${gameId.toString() as `${number}`}`;
}
