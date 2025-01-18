import { eq, or } from "drizzle-orm";
import {
	gameResultTable,
	gameTable,
	playerGameResultTable,
	teamGameResultTable
} from "./schema";
import db from "./db";

/**
 * Get all of a set of player's game results, including the games, game results, and team game results.
 * @param puuids - The PUUIDs of the players.
 * @returns The players' game results. Includes the game, game result, team game result, and player game result.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getGameResultsByPlayers(...puuids: string[]) {
	return await db
		.select()
		.from(gameTable)
		.innerJoin(
			gameResultTable,
			eq(gameTable.tournamentCode, gameResultTable.tournamentCode)
		)
		.innerJoin(
			teamGameResultTable,
			eq(gameResultTable.id, teamGameResultTable.gameResultId)
		)
		.innerJoin(
			playerGameResultTable,
			eq(teamGameResultTable.id, playerGameResultTable.teamGameResultId)
		)
		.where(
			or(...puuids.map((puuid) => eq(playerGameResultTable.puuid, puuid)))
		);
}
