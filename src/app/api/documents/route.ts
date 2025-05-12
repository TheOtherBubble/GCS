import { NextResponse } from "next/server";
import db from "db/db";
import { documentTable } from "db/schema";

/**
 * Get a list of IDs of Gauntlet Championship Series documents.
 * @returns A list of IDs of Gauntlet Championship Series documents.
 * @public
 */
export const GET = async (): Promise<NextResponse> =>
	NextResponse.json(
		(await db.select().from(documentTable)).map(({ id }) => id)
	);
