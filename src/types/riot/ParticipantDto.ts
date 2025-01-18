import type ChallengesDto from "./ChallengesDto";
import type ChampionTransform from "./ChampionTransform";
import type Lane from "./Lane";
import type MissionsDto from "./MissionsDto";
import type PerksDto from "./PerksDto";
import type { Position } from "types/db/Position";

/**
 * Information about a participant in a match.
 * @public
 */
export default interface ParticipantDto {
	/** The number of "all-in" pings used by the participant. */
	allInPings: number;

	/** The number of "assist me" pings used by the participant. */
	assistMePings: number;

	/** The number of assists by the participant. */
	assists: number;

	/** The number of baron kills by the participant. */
	baronKills: number;

	/** An undocumented value. */
	bountyLevel: number;

	/** The experience gained by the participant's champion. */
	champExperience: number;

	/** The participant's champion's level at the end of the game. */
	champLevel: number;

	/** The participant's champion's key. Referred to as the champion's ID by the Riot API. Prior to patch 11.4, this field returned invalid values, so it is best to determine the champion based on `championName` for matches played then. */
	championId: number;

	/** The participant's champion's name. */
	championName: string;

	/** The number of "command" (blue generic) pings used by the participant. */
	commandPings: number;

	/** The participant's champion's transformation. */
	championTransform: ChampionTransform;

	/** The number of consumable items purchased by the participant. */
	consumablesPurchased: number;

	/** Information about the participant's challenge progress. */
	challenges: ChallengesDto;

	/** The participant's damage dealt to structures. */
	damageDealtToBuildings: number;

	/** The participant's damage dealt to objectives. */
	damageDealtToObjectives: number;

	/** The participant's damage dealt to turrets. */
	damageDealtToTurrets: number;

	/** The participant's self-mitigated damage. */
	damageSelfMitigated: number;

	/** The participant's death count. */
	deaths: number;

	/** The number of detector wards placed by the participant. */
	detectorWardsPlaced: number;

	/** The participant's double kill count. */
	doubleKills: number;

	/** The participant's dragon kill count. */
	dragonKills: number;

	/** Whether or not the participant is eligible for progression from this match. */
	eligibleForProgression: boolean;

	/** The number of "enemy missing" pings used by the participant. */
	enemyMissingPings: number;

	/** The number of "enemy vision" pings used by the participant. */
	enemyVisionPings: number;

	/** Whether or not the participant got an assist on the first champion kill. */
	firstBloodAssist: boolean;

	/** Whether or not the participant got the first champion kill. */
	firstBloodKill: boolean;

	/** Whether or not the participant got an assist on the first tower kill. */
	firstTowerAssist: boolean;

	/** Whether or not the participant got the first tower kill. */
	firstTowerKill: boolean;

	/** Whether or not the game ended in early surrender. */
	gameEndedInEarlySurrender: boolean;

	/** Whether or not the game ended in surrender. */
	gameEndedInSurrender: boolean;

	/** The number of "hold" pings used by the participant. */
	holdPings: number;

	/** The number of "get back" pings used by the participant. */
	getBackPings: number;

	/** The participant's gold earned. */
	goldEarned: number;

	/** The participant's gold spent. */
	goldSpent: number;

	/** The most likely position played by the participant when disregarding anything else. Generally, `teamPosition` should be used instead. */
	individualPosition: Position;

	/** The participant's inhibitor kill count. */
	inhibitorKills: number;

	/** The participant's inhibitor takedown count. */
	inhibitorTakedowns: number;

	/** The participant's inhibitors lost count. */
	inhibitorsLost: number;

	/** The participant's first item's ID at the end of the game. */
	item0: number;

	/** The participant's second item's ID at the end of the game. */
	item1: number;

	/** The participant's third item's ID at the end of the game. */
	item2: number;

	/** The participant's fourth item's ID at the end of the game. */
	item3: number;

	/** The participant's fifth item's ID at the end of the game. */
	item4: number;

	/** The participant's sixth item's ID at the end of the game. */
	item5: number;

	/** The participant's seventh item's ID at the end of the game. */
	item6: number;

	/** The participant's items purchased count. */
	itemsPurchased: number;

	/** The participant's killing sprees count. */
	killingSprees: number;

	/** The participant's kill count. */
	kills: number;

	/** An undocumented value. */
	lane: Lane;

	/** The participant's largest critical strike damage. */
	largestCriticalStrike: number;

	/** The participant's largest killing spree. */
	largestKillingSpree: number;

	/** The participant's largest multi-kill. */
	largestMultiKill: number;

	/** The participant's longest time spent living. */
	longestTimeSpentLiving: number;

	/** The participant's magic damage dealt. */
	magicDamageDealt: number;

	/** The participant's magic damage dealt to champions. */
	magicDamageDealtToChampions: number;

	/** The participant's magic damage taken. */
	magicDamageTaken: number;

	/** The participant's mission progress. */
	missions: MissionsDto;

	/** The participant's number of neutral minions killed, including pets and jungle monsters. */
	neutralMinionsKilled: number;

	/** The number of "need vision" pings used by the participant. */
	needVisionPings: number;

	/** The participant's nexuses kill count. */
	nexusKills: number;

	/** The participant's nexuses takedown count. */
	nexusTakedowns: number;

	/** The participant's nexuses lost count. */
	nexusLost: number;

	/** The participant's objective steals count. */
	objectivesStolen: number;

	/** The participant's objective steal assists count. */
	objectivesStolenAssists: number;

	/** The number of "on my way" pings used by the participant. */
	onMyWayPings: number;

	/** The participant's ID. */
	participantId: number;

	/** An undocumented value. */
	playerScore0: number;

	/** An undocumented value. */
	playerScore1: number;

	/** An undocumented value. */
	playerScore2: number;

	/** An undocumented value. */
	playerScore3: number;

	/** An undocumented value. */
	playerScore4: number;

	/** An undocumented value. */
	playerScore5: number;

	/** An undocumented value. */
	playerScore6: number;

	/** An undocumented value. */
	playerScore7: number;

	/** An undocumented value. */
	playerScore8: number;

	/** An undocumented value. */
	playerScore9: number;

	/** An undocumented value. */
	playerScore10: number;

	/** An undocumented value. */
	playerScore11: number;

	/** The participant's pentakill count. */
	pentaKills: number;

	/** The participant's rune page. */
	perks: PerksDto;

	/** The participant's physical damage dealt. */
	physicalDamageDealt: number;

	/** The participant's physical damage dealt to champions. */
	physicalDamageDealtToChampions: number;

	/** The participant's physical damage taken. */
	physicalDamageTaken: number;

	/** An undocumented value. */
	placement: number;

	/** An undocumented value. */
	playerAugment1: number;

	/** An undocumented value. */
	playerAugment2: number;

	/** An undocumented value. */
	playerAugment3: number;

	/** An undocumented value. */
	playerAugment4: number;

	/** The participant's sub-team's ID. */
	playerSubteamId: number;

	/** The number of "push" pings used by the participant. */
	pushPings: number;

	/** The participant's profile icon's ID. */
	profileIcon: number;

	/** The participant's PUUID. */
	puuid: string;

	/** The participant's quadra kill count. */
	quadraKills: number;

	/** The participant's game name. */
	riotIdGameName: string;

	/** The participant's tag line. */
	riotIdTagline: string;

	/** The participant's role. */
	role: string;

	/** The participant's number of sight wards bought. */
	sightWardsBoughtInGame: number;

	/** The number of times that the participant cast their first spell. */
	spell1Casts: number;

	/** The number of times that the participant cast their first spell. */
	spell2Casts: number;

	/** The number of times that the participant cast their first spell. */
	spell3Casts: number;

	/** The number of times that the participant cast their first spell. */
	spell4Casts: number;

	/** The participant's sub-team's placement. */
	subteamPlacement: number;

	/** The number of times that the participant cast their first summoner spell. */
	summoner1Casts: number;

	/** The participant's first summoner spell's ID. */
	summoner1Id: number;

	/** The number of times that the participant cast their second summoner spell. */
	summoner2Casts: number;

	/** The participant's second summoner spell's ID. */
	summoner2Id: number;

	/** The participant's summoner ID. */
	summonerId: string;

	/** The participant's summoner level. */
	summonerLevel: number;

	/** The participant's summoner name. */
	summonerName: string;

	/** Whether or not the participant's team early surrendered. */
	teamEarlySurrendered: boolean;

	/** The participant's team's ID. */
	teamId: number;

	/** The most likely position played by the participant when considering that each player on a team must play a different role. */
	teamPosition: Position;

	/** The participant's time spent crowd controlling other participants. */
	timeCCingOthers: number;

	/** The participant's time spent playing. */
	timePlayed: number;

	/** The participant's total number of monsters killed in their own side of the jungle. */
	totalAllyJungleMinionsKilled: number;

	/** The participant's total damage dealt. */
	totalDamageDealt: number;

	/** The participant's total damage dealt to champions. */
	totalDamageDealtToChampions: number;

	/** The participant's total damage shielded on teammates. */
	totalDamageShieldedOnTeammates: number;

	/** The participant's total damage taken. */
	totalDamageTaken: number;

	/** The participant's total number of monsters killed in their enemy's side of the jungle. */
	totalEnemyJungleMinionsKilled: number;

	/** The participant's total healing applied. */
	totalHeal: number;

	/** The participant's total healing applied to their teammates. */
	totalHealsOnTeammates: number;

	/** The participant's total number of minions killed, including team minions, melee lane minions, super lane minions, ranged lane minions, and siege lane minions. */
	totalMinionsKilled: number;

	/** The participant's total crowd control time applied. */
	totalTimeCCDealt: number;

	/** The participant's total time spent dead. */
	totalTimeSpentDead: number;

	/** The participant's total number of units healed. */
	totalUnitsHealed: number;

	/** The participant's number of triple kills. */
	tripleKills: number;

	/** The participant's true damage dealt. */
	trueDamageDealt: number;

	/** The participant's true damage dealt to champions. */
	trueDamageDealtToChampions: number;

	/** The participant's true damage taken. */
	trueDamageTaken: number;

	/** The participant's number of turret kills. */
	turretKills: number;

	/** The participant's number of turret takedowns. */
	turretTakedowns: number;

	/** The participant's number of turrets lost. */
	turretsLost: number;

	/** The participant's number of unreal kills. */
	unrealKills: number;

	/** The participant's vision score. */
	visionScore: number;

	/** The number of "vision cleared" pings used by the participant. */
	visionClearedPings: number;

	/** The participant's number of vision wards bought. */
	visionWardsBoughtInGame: number;

	/** The participant's number of wards killed. */
	wardsKilled: number;

	/** The participant's number of wards placed. */
	wardsPlaced: number;

	/** Whether or not the participant won the game. */
	win: boolean;
}
