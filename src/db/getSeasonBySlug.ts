import db from "./db";
import { eq } from "drizzle-orm";
import { seasonTable } from "./schema";

/**
 * Get a season from an encoded slug.
 * @param slug - The season's URI-encoded vanity URL slug.
 * @returns The season, if any matches.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getSeasonBySlug(slug: string) {
	return (
		await db
			.select()
			.from(seasonTable)
			.where(eq(seasonTable.vanityUrlSlug, decodeURIComponent(slug)))
			.limit(1)
	)[0];
}
