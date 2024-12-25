import { eq, or } from "drizzle-orm";
import db from "scripts/db";
import { playersTable } from "scripts/schema";

/**
 * Get a player from a slug.
 * @param slug - The player's encoded display name or Discord name or ID.
 * @returns The player.
 * @public
 */
export default async function getPlayerFromSlug(slug: string) {
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

	const displayNamePlayer = players.find(
		(player) => player.displayName === decoded
	);
	if (displayNamePlayer) {
		return displayNamePlayer;
	}

	const namePlayer = players.find((player) => player.name === decoded);
	if (namePlayer) {
		return namePlayer;
	}

	return players.find((player) => player.id === decoded);
}
