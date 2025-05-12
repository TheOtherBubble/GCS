import { NextResponse } from "next/server";
import db from "db/db";
import { teamTable } from "db/schema";

/**
 * Get a list of identifying information of Gauntlet Championship Series teams.
 * @returns A list of identifying information of Gauntlet Championship Series teams.
 * @public
 */
export const GET = async (): Promise<NextResponse> =>
	NextResponse.json(
		(await db.select().from(teamTable)).map(({ id, name, slug }) => ({
			id,
			name,
			slug
		}))
	);
