import { NextResponse } from "next/server";
import db from "db/db";
import { playerTable } from "db/schema";

/**
 * Get a list of identifying information of Gauntlet Championship Series players.
 * @returns A list of identifying information of Gauntlet Championship Series players.
 * @public
 */
export const GET = async (): Promise<NextResponse> =>
	NextResponse.json(
		(await db.select().from(playerTable)).map(
			({ discordId, displayName, id, name, slug }) => ({
				discordId,
				displayName,
				id,
				name,
				slug
			})
		)
	);
