import db from "./db";
import { eq } from "drizzle-orm";
import { teamsTable } from "./schema";

/**
 * Get a team by its vanity URL slug.
 * @param slug - The (decoded) vanity URL slug.
 * @returns The team, if any matches.
 * @public
 */
export const getTeamByDecodedSlug = async (slug: string) => {
	return (
		await db
			.select()
			.from(teamsTable)
			.where(eq(teamsTable.vanityUrlSlug, slug))
			.limit(1)
	)[0];
};

/**
 * Get a team by its vanity URL slug.
 * @param slug - The (encoded) vanity URL slug.
 * @returns The team, if any matches.
 * @public
 */
export default async function getTeamByEncodedSlug(slug: string) {
	return getTeamByDecodedSlug(decodeURIComponent(slug));
}
