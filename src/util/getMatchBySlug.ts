import getMatches from "db/getMatches";

/**
 * Get a match by its stringified ID.
 * @param slug - The stringified ID.
 * @returns The match, if any matches.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getMatchBySlug(slug: `${number}`) {
	return (await getMatches(parseInt(slug, 10)))[0];
}
