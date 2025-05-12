import { NextRequest, NextResponse } from "next/server";
import type PageProps from "types/PageProps";
import { accountTable } from "db/schema";
import db from "db/db";
import { eq } from "drizzle-orm";

/**
 * Get account parameters.
 * @public
 */
export interface GetAccountParams {
	/** The encrypted player universally unique identifier (PUUID) of the Riot account. This can't be used with the Riot API since PUUIDs are encrypted per API key. */
	puuid: string;
}

/**
 * Get a Riot account that is associated with a Gauntlet Championship Series player.
 * @param _ - The request.
 * @param props - The page properties.
 * @returns A Riot account that is associated with a Gauntlet Championship Series player.
 * @public
 */
export const GET = async (
	_: NextRequest,
	props: PageProps<GetAccountParams>
): Promise<NextResponse> => {
	const { puuid } = await props.params;
	const [account] = await db
		.select()
		.from(accountTable)
		.where(eq(accountTable.puuid, puuid))
		.limit(1);
	if (!account) {
		return NextResponse.json(null);
	}

	const {
		cacheDate,
		isPrimary,
		isVerified,
		name,
		playerId,
		rank,
		region,
		tagLine,
		tier
	} = account;

	return NextResponse.json({
		cacheDate: cacheDate.valueOf(),
		isPrimary: Boolean(isPrimary),
		isVerified,
		name,
		playerId,
		puuid,
		rank,
		region,
		tagLine,
		tier
	});
};
