import { NextResponse } from "next/server";
import { accountTable } from "db/schema";
import db from "db/db";

/**
 * Get a list of identifying information of Riot accounts that are associated with Gauntlet Championship Series players.
 * @returns A list of identifying information of Riot accounts that are associated with Gauntlet Championship Series players.
 * @public
 */
export const GET = async (): Promise<NextResponse> =>
	NextResponse.json(
		(await db.select().from(accountTable)).map(
			({ name, puuid, region, tagLine }) => ({ name, puuid, region, tagLine })
		)
	);
