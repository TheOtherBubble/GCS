import type {
	gameResultTable,
	playerGameResultTable,
	teamGameResultBanTable,
	teamGameResultTable
} from "db/schema";
import type MatchDto from "types/riot/MatchDto";
import closestMatch from "./closestMatch";

/**
 * Converts the Riot API representation of a game result to the database representations of game, team, ban, and player results.
 * @param riot - The Riot API game result.
 * @param puuids - A map of the IDs of the teams in the match to the lists of the PUUIDS of the accounts of the players on those teams.
 * @returns The game result, the team game results, the team game result bans, and the player game results.
 * @public
 */
export default function convertResult(
	riot: MatchDto,
	puuids?: Map<number, string[]>
): [
	typeof gameResultTable.$inferInsert,
	(typeof teamGameResultTable.$inferInsert)[],
	(typeof teamGameResultBanTable.$inferInsert)[],
	(typeof playerGameResultTable.$inferInsert)[]
] {
	const game = {
		duration:
			riot.info.gameDuration * ("gameEndTimestamp" in riot.info ? 1000 : 1),
		id: riot.info.gameId,
		mapId: riot.info.mapId,
		mode: riot.info.gameMode,
		platformId: riot.info.platformId,
		queueId: riot.info.queueId,
		startTimestamp: riot.info.gameStartTimestamp,
		tournamentCode: riot.info.tournamentCode,
		type: riot.info.gameType,
		version: riot.info.gameVersion
	} satisfies typeof gameResultTable.$inferInsert;

	const players = [];
	for (const player of riot.info.participants) {
		players.push({
			assists: player.assists,
			championDamage: player.totalDamageDealtToChampions,
			championKey: player.championId,
			deaths: player.deaths,
			gameResultId: riot.info.gameId,
			item0Id: player.item0,
			item1Id: player.item1,
			item2Id: player.item2,
			item3Id: player.item3,
			item4Id: player.item4,
			item5Id: player.item5,
			item6Id: player.item6,
			kills: player.kills,
			level: player.champLevel,
			name: player.riotIdGameName,
			position: player.teamPosition,
			puuid: player.puuid,
			summoner1Id: player.summoner1Id,
			summoner2Id: player.summoner2Id,
			teamId: player.teamId
		} satisfies typeof playerGameResultTable.$inferInsert);
	}

	const teams = [];
	const bans = [];
	for (const team of riot.info.teams) {
		teams.push({
			gameResultId: riot.info.gameId,
			isWinner: team.win,
			riotId: team.teamId,
			teamId:
				puuids &&
				closestMatch(
					players
						.filter(({ teamId }) => teamId === team.teamId)
						.map(({ puuid }) => puuid),
					puuids
				)
		} satisfies typeof teamGameResultTable.$inferInsert);

		for (const ban of team.bans) {
			bans.push({
				championKey: ban.championId,
				gameResultId: riot.info.gameId,
				order: ban.pickTurn,
				teamId: team.teamId
			} satisfies typeof teamGameResultBanTable.$inferInsert);
		}
	}

	return [game, teams, bans, players];
}
