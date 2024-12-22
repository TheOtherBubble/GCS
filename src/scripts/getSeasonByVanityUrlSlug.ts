import db from "./db";
import { eq } from "drizzle-orm";
import { seasonsTable } from "./schema";

/**
 * Get a season by its vanity URL slug.
 * @param vanityUrlSlug - The (decoded) vanity URL slug.
 * @returns The season, if any matches.
 * @public
 */
export default async function getSeasonByVanityUrlSlug(
	vanityUrlSlug: string
): Promise<typeof seasonsTable.$inferSelect | undefined> {
	const [season] = await db
		.select()
		.from(seasonsTable)
		.where(eq(seasonsTable.vanityUrlSlug, vanityUrlSlug))
		.limit(1);
	return season;
}
