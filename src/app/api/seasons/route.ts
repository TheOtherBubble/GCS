import { NextResponse } from "next/server";
import db from "db/db";
import { seasonTable } from "db/schema";

/**
 * Get a list of identifying information of Gauntlet Championship Series seasons.
 * @returns A list of identifying information of Gauntlet Championship Series seasons.
 * @public
 */
export const GET = async (): Promise<NextResponse> =>
	NextResponse.json(
		(await db.select().from(seasonTable)).map(({ id, name, slug }) => ({
			id,
			name,
			slug
		}))
	);
