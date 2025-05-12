import { NextResponse } from "next/server";
import db from "db/db";
import { gameTable } from "db/schema";

/**
 * Get a list of identifying information of games that are cached by the Gauntlet Championship Series.
 * @returns A list of identifying information of games that are cached by the Gauntlet Championship Series.
 * @public
 */
export const GET = async (): Promise<NextResponse> =>
	NextResponse.json(
		(await db.select().from(gameTable)).map(({ id, tournamentCode }) => ({
			id,
			tournamentCode
		}))
	);
