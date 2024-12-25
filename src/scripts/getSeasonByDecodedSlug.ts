import db from "./db";
import { eq } from "drizzle-orm";
import { seasonsTable } from "./schema";

/**
 * Get a season by its vanity URL slug.
 * @param slug - The (decoded) vanity URL slug.
 * @returns The season, if any matches.
 * @public
 */
export default async function getSeasonByDecodedSlug(slug: string) {
	return (
		await db
			.select()
			.from(seasonsTable)
			.where(eq(seasonsTable.vanityUrlSlug, slug))
			.limit(1)
	)[0];
}
