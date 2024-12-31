import db from "./db";
import { eq } from "drizzle-orm";
import { teamTable } from "./schema";

/**
 * Get a team by its vanity URL slug.
 * @param slug - The (decoded) vanity URL slug.
 * @returns The team, if any matches.
 * @public
 */
export const getTeamByDecodedSlug = async (slug: string) =>
	(
		await db
			.select()
			.from(teamTable)
			.where(eq(teamTable.vanityUrlSlug, slug))
			.limit(1)
	)[0];

/**
 * Get a team by its vanity URL slug.
 * @param slug - The (encoded) vanity URL slug.
 * @returns The team, if any matches.
 * @public
 */
export default async function getTeamByEncodedSlug(slug: string) {
	return getTeamByDecodedSlug(decodeURIComponent(slug));
}
