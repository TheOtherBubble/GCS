import db from "./db";
import { eq } from "drizzle-orm";
import { teamTable } from "./schema";

/**
 * Get a team from an encoded slug.
 * @param slug - The team's URI-encoded vanity URL slug.
 * @returns The team, if any matches.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getTeamBySlug(slug: string) {
	return (
		await db
			.select()
			.from(teamTable)
			.where(eq(teamTable.vanityUrlSlug, decodeURIComponent(slug)))
			.limit(1)
	)[0];
}
