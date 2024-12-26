import { eq, or } from "drizzle-orm";
import db from "./db";
import { playersTable } from "./schema";

/**
 * Get a player from a slug.
 * @param slug - The player's encoded display name or Discord name or ID.
 * @returns The player.
 * @public
 */
export default async function getPlayerBySlug(slug: string) {
	const decoded = decodeURIComponent(slug);
	const players = await db
		.select()
		.from(playersTable)
		.where(
			or(
				eq(playersTable.displayName, decoded),
				eq(playersTable.name, decoded),
				eq(playersTable.id, decoded)
			)
		);
	return (
		players.find((player) => player.displayName === decoded) ??
		players.find((player) => player.name === decoded) ??
		players.find((player) => player.id === decoded)
	);
}
