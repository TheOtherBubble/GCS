import { eq, or } from "drizzle-orm";
import db from "./db";
import { playerTable } from "./schema";

/**
 * Get a player from a slug.
 * @param slug - The player's encoded display name or Discord name or ID.
 * @returns The player.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getPlayerBySlug(slug: string) {
	const decoded = decodeURIComponent(slug);
	const players = await db
		.select()
		.from(playerTable)
		.where(
			or(
				eq(playerTable.displayName, decoded),
				eq(playerTable.name, decoded),
				eq(playerTable.id, decoded)
			)
		);
	return (
		players.find((player) => player.displayName === decoded) ??
		players.find((player) => player.name === decoded) ??
		players.find((player) => player.id === decoded)
	);
}
