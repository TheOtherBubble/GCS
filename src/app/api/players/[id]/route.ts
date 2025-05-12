import { NextRequest, NextResponse } from "next/server";
import {
	accountTable,
	draftPlayerTable,
	playerTable,
	teamPlayerTable
} from "db/schema";
import type PageProps from "types/PageProps";
import db from "db/db";
import { eq } from "drizzle-orm";
import leftHierarchy from "util/leftHierarchy";

/**
 * Get game parameters.
 * @public
 */
export interface GetGameParams {
	/** The ID of the player. */
	id: string;
}

/**
 * Get a Gauntlet Championship Series player.
 * @param _ - The request.
 * @param props - The page properties.
 * @returns A Gauntlet Championship Series player.
 * @public
 */
export const GET = async (
	_: NextRequest,
	props: PageProps<GetGameParams>
): Promise<NextResponse> => {
	const { id } = await props.params;
	const rows = await db
		.select()
		.from(playerTable)
		.leftJoin(accountTable, eq(playerTable.id, accountTable.playerId))
		.where(eq(playerTable.id, id));
	const [row] = rows;
	if (!row) {
		return NextResponse.json(null);
	}

	const { player } = row;
	const {
		bannedUntil,
		bgChamp,
		bgSkin,
		bio,
		discordId,
		displayName,
		isAdmin,
		name,
		primaryRole,
		secondaryRole,
		slug,
		twitchId,
		youtubeId
	} = player;
	const accounts = leftHierarchy(rows, "account");
	const teams = await db
		.select()
		.from(teamPlayerTable)
		.where(eq(teamPlayerTable.playerId, id));
	const seasons = await db
		.select()
		.from(draftPlayerTable)
		.where(eq(draftPlayerTable.playerId, id));

	return NextResponse.json({
		accountPuuids: accounts.map(({ puuid }) => puuid),
		bannedUntil,
		bgChamp,
		bgSkin,
		bio,
		discordId,
		displayName,
		isAdmin,
		name,
		primaryRole,
		seasons: seasons.map(
			({ draftedAt, seasonId, notes, pointValue, registeredAt }) => ({
				draftedAt: draftedAt?.valueOf() ?? null,
				id: seasonId,
				notes,
				pointValue,
				registeredAt: registeredAt.valueOf()
			})
		),
		secondaryRole,
		slug,
		teams: teams.map(({ teamId, isCaptain }) => ({
			id: teamId,
			isCaptain: Boolean(isCaptain)
		})),
		twitchId,
		youtubeId
	});
};
