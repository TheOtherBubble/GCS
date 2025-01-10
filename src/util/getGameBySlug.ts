import getGames from "db/getGames";

/**
 * Get a game by its stringified ID.
 * @param slug - The stringified ID.
 * @returns The game, if any matches.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getGameBySlug(slug: `${number}`) {
	return (await getGames(parseInt(slug, 10)))[0];
}
