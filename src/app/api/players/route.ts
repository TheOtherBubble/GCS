import { NextResponse } from "next/server";
import db from "db/db";
import { playerTable } from "db/schema";

/**
 * Get a list of player IDs.
 * @public
 */
export const GET = async (): Promise<NextResponse> =>
	NextResponse.json(
		await db
			.select({
				discordId: playerTable.discordId,
				discordName: playerTable.name,
				id: playerTable.id
			})
			.from(playerTable)
	);
