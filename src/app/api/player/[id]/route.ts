import { type NextRequest, NextResponse } from "next/server";
import {
	accountTable,
	draftPlayerTable,
	gameResultTable,
	gameTable,
	playerGameResultTable,
	playerTable,
	teamPlayerTable
} from "db/schema";
import type PageProps from "types/PageProps";
import db from "db/db";
import { eq } from "drizzle-orm";
import leftHierarchy from "util/leftHierarchy";

/**
 * Parameters that are passed to a player API endpoint.
 * @public
 */
export interface PlayerEndpointParams {
	/** The player's UUIDv4. */
	id: string;
}

/**
 * Get a list of player IDs.
 * @public
 */
export const GET = async (
	_: NextRequest,
	props: PageProps<PlayerEndpointParams>
): Promise<NextResponse> => {
	const [player] = leftHierarchy(
		await db
			.select()
			.from(playerTable)
			.leftJoin(accountTable, eq(playerTable.id, accountTable.playerId))
			.leftJoin(
				playerGameResultTable,
				eq(accountTable.puuid, playerGameResultTable.puuid)
			)
			.leftJoin(
				gameResultTable,
				eq(playerGameResultTable.gameResultId, gameResultTable.id)
			)
			.leftJoin(
				gameTable,
				eq(gameResultTable.tournamentCode, gameTable.tournamentCode)
			)
			.where(eq(playerTable.id, (await props.params).id)),
		"player",
		"account",
		"game"
	);

	return NextResponse.json(
		player
			? {
					accountIds: player.children
						.filter(({ value }) => value.isVerified)
						.map(({ value: { puuid: id } }) => id),
					bgChamp: player.value.bgChamp,
					bgSkin: player.value.bgSkin,
					bio: player.value.bio,
					discordId: player.value.discordId,
					discordName: player.value.name,
					displayName: player.value.displayName,
					gameIds: player.children
						.filter(({ value: { isVerified } }) => isVerified)
						.flatMap(({ children }) => children)
						.flatMap(({ id }) => id),
					id: player.value.id,
					role1: player.value.primaryRole,
					role2: player.value.secondaryRole,
					seasons: (
						await db
							.select()
							.from(draftPlayerTable)
							.where(eq(draftPlayerTable.playerId, player.value.id))
					).map(({ notes, pointValue: pv, seasonId }) => ({
						notes,
						pv,
						seasonId
					})),
					teamIds: (
						await db
							.select()
							.from(teamPlayerTable)
							.where(eq(teamPlayerTable.playerId, player.value.id))
					).map(({ teamId }) => teamId),
					twitchId: player.value.twitchId,
					youtubeId: player.value.youtubeId
				}
			: null
	);
};
