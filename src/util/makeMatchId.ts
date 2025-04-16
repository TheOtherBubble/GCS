import Platform from "types/riot/Platform";

/**
 * Make a match ID from a platform routing value and a game ID.
 * @param gameId - The game ID.
 * @param platform - The platform routing value.
 * @returns The match ID.
 * @public
 */
export default function makeMatchId(
	gameId: number | `${number}`,
	platform: Platform = Platform.NA1
): `${Platform}_${number}` {
	return `${platform}_${gameId.toString() as `${number}`}`;
}
