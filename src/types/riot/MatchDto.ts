import type InfoDto from "./InfoDto";
import type MetadataDto from "./MetadataDto";

/**
 * Information about a match.
 * @public
 */
export default interface MatchDto {
	/** Match metadata. */
	metadata: MetadataDto;

	/** Match information. */
	info: InfoDto;
}

/*
TODO: To make enumerations or types for:
info
	gameMode
	gameType
	mapId
	participants
		championTransform - (0 for none, 1 for red Kayn ("slayer"), 2 for blue Kayn ("Assassin"))
	platformId
	queueId

TODO: To be saved in the database:
metadata
	matchId
info
	gameDuration - depends on `gameVersion`.
	gameId
	gameMode
	gameType
	gameVersion
	mapId
	participants
		assists
		champLevel
		championId - needs to be determined from `championName` prior to patch 11.4.
		deaths
		item0
		item1
		item2
		item3
		item4
		item5
		item6
		kills
		participantId
		puuid
		riotIdGameName
		riotIdTagline
		summoner1Id
		summoner2Id
		summonerId
		teamId
		teamPosition
		totalDamageDealtToChampions
		win
	platformId - string, constants probably in documentation.
	queueId - integer, constants in documentation.
	teams
		teamId
		win
*/
