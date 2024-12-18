import {
	boolean,
	char,
	date,
	integer,
	pgEnum,
	pgTable,
	unique,
	varchar
} from "drizzle-orm/pg-core";

/**
 * The table of players. Players are linked to one Discord account and any number of Riot accounts, and may participate in any number of seasons on any number of teams.
 * @public
 */
export const players = pgTable("players", {
	// A player-selected champion to use as a background on player cards, stored as a champion name.
	backgroundChampion: varchar({ length: 0x20 }),

	// A player-selected champion skin to use as a background on player cards, stored as a champion skin number.
	backgroundSkinNumber: integer(),

	// The date that the user is banned until.
	bannedUntilDate: date(),

	// A player-defined biography.
	biography: varchar({ length: 0x100 }),

	// A Discord snowflake (64-bit integer) stored as a string. The longest 64-bit integer contains 20 digits.
	discordId: varchar({ length: 20 }).unique().notNull(),

	// Unique identifier, in case an admin needs to change a user's Discord account.
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// Whether or not this user is an administrator.
	isAdministator: boolean().notNull().default(false),

	// A nickname. If this isn't defined, the game name of the player's primary Riot account is used instead. If neither is defined, the Discord snowflake is used instead.
	name: varchar({ length: 0x20 }),

	// The player's Twitch ID.
	twitchId: varchar({ length: 0x40 }),

	// The player's YouTube ID.
	youtubeId: varchar({ length: 0x40 })
});

/**
 * The table of Riot accounts. Each Riot account is linked to one player. Riot account game names and tag lines are cached to reduce calls to the Riot API.
 * @public
 */
export const accounts = pgTable(
	"accounts",
	{
		// The date and time that the account was last cached.
		cacheDate: date().notNull().defaultNow(),

		// The game name of the account at the last time that the account was cached. The longest allowed game name is 16 characters.
		gameNameCache: varchar({ length: 16 }).notNull(),

		// Whether or not this account is the primary account of the associated player. Must be null for non-primary accounts.
		isPrimary: boolean(),

		// The ID of the player that the account is linked to.
		playerId: integer()
			.references(() => players.id)
			.notNull(),

		// The Player Universally Unique ID (PUUID) of the account. PUUIDs are always 78 characters long.
		puuid: char({ length: 78 }).primaryKey(),

		// The tag line of the account at the last time that the account was cached. The longest allowed tag line is 5 characters.
		tagLineCache: varchar({ length: 5 }).notNull()
	},
	(self) => [unique().on(self.isPrimary, self.playerId)]
);

/**
 * The table of seasons. Seasons may consist of any number of matches between any number of teams split up into any number of pools.
 * @public
 */
export const seasons = pgTable("seasons", {
	// Unique identifier.
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// The season's name. If undefined, the season's ID is used instead.
	name: varchar({ length: 0x40 }),

	// The season's start date.
	startDate: date().notNull().defaultNow()
});

/**
 * The table of teams. Each team participates in one pool of one season, and has one captain out of any number of players.
 * @public
 */
export const teams = pgTable(
	"teams",
	{
		// The team's code.
		code: varchar({ length: 4 }).notNull(),

		// The red-green-blue hexadecimal triplet of the team's theme color.
		color: char({ length: 6 }).notNull(),

		// Unique identifier.
		id: integer().primaryKey().generatedAlwaysAsIdentity(),

		// Whether or not the team won its season. Must be null for non-winners.
		isWinner: boolean(),

		// The URL of the team's logo image.
		logoUrl: varchar({ length: 0x800 }).notNull(),

		// The team's name.
		name: varchar({ length: 0x40 }).notNull(),

		// The pool that the team belongs to.
		pool: integer().notNull().default(0),

		// The ID of the team's season.
		seasonId: integer()
			.references(() => seasons.id)
			.notNull()
	},
	(self) => [
		unique().on(self.code, self.seasonId),
		unique().on(self.isWinner, self.seasonId),
		unique().on(self.name, self.seasonId)
	]
);

/**
 * The relation between teams and players, indicating which teams a player belongs to and which players compose a team. One player per team may be the team's captain.
 * @public
 */
export const teamPlayers = pgTable(
	"teamPlayers",
	{
		// Whether or not the player is the captain of the team. Must be null for non-captains.
		isCaptain: boolean(),

		// The ID of the player.
		playerId: integer()
			.references(() => players.id)
			.notNull(),

		// The ID of the team.
		teamId: integer()
			.references(() => teams.id)
			.notNull()
	},
	(self) => [
		unique().on(self.isCaptain, self.teamId),
		unique().on(self.playerId, self.teamId)
	]
);

/**
 * Formats that a match can take.
 * @public
 */
export const matchFormat = pgEnum("matchFormat", [
	"Block of 1",
	"Block of 3",
	"Best of 3",
	"Best of 5",
	"Best of 7"
]);

/**
 * Teams in a match.
 * @public
 */
export const matchTeam = pgEnum("matchTeam", ["Red", "Blue"]);

/**
 * The table of matches. Each match belongs to a week of a season, is played between two teams, and may be composed of any number of games (depending on the match's format).
 * @public
 */
export const matches = pgTable("matches", {
	// The ID of the red team.
	blueTeamId: integer()
		.references(() => teams.id)
		.notNull(),

	// The format of the match.
	format: matchFormat().notNull(),

	// Unique identifier.
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// The ID of the red team.
	redTeamId: integer()
		.references(() => teams.id)
		.notNull(),

	// The ID of the match's season.
	seasonId: integer()
		.references(() => seasons.id)
		.notNull(),

	// The week of its season that the match took place during.
	week: integer().notNull(),

	// The team that won the match, if it has concluded.
	winner: matchTeam()
});

/**
 * The table of games, regardless of whether they are upcoming, in progress, or completed. Games may (in the case of stage games) or may not be (in the case of inhouses) be part of a match.
 * @public
 */
export const games = pgTable("games", {
	// Unique identifier.
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// The ID of the match that the game is part of.
	matchId: integer().references(() => matches.id),

	// The tournament code that players in the game use to join the game.
	tournamentCode: varchar({ length: 0x40 }).notNull()
});

/**
 * The table of game results, which represent the players and statistics in a completed game. A game result may not correspond to a game if the game result isn't part of a tournament or inhouse (such as games that are just pulled from the Riot API to collect statistics).
 * @public
 */
export const gameResults = pgTable("gameResults", {
	// The duration of the game in seconds.
	duration: integer().notNull(),

	// The ID of the game that these results correspond to, if any. May be null if the game result isn't part of a tournament or inhouse (such as games that are just pulled from the Riot API to collect statistics).
	gameId: integer()
		.references(() => games.id)
		.unique(),

	// The game/match ID of the game in the Riot API.
	id: integer().primaryKey(),

	// The game map.
	map: varchar({ length: 0x40 }).notNull(),

	// The game mode.
	mode: varchar({ length: 0x20 }).notNull(),

	// The game name.
	name: varchar({ length: 0x40 }).notNull(),

	// The platform that the game was played on.
	platform: varchar({ length: 0x40 }).notNull(),

	// The queue that the game was in.
	queue: varchar({ length: 0x40 }).notNull(),

	// The date that the game was started on the game server.
	startDate: date().notNull(),

	// The game type.
	type: varchar({ length: 0x40 }).notNull(),

	// The version (patch) that the game was played on.
	version: varchar({ length: 0x20 }).notNull()
});

/**
 * A team in a game result. This is just cached data from the Riot API. Always corresponds to a game result, but may not always correspond to a team (such as for game results that are just pulled from the Riot API to collect statistics).
 * @public
 */
export const teamGameResults = pgTable(
	"teamGameResults",
	{
		// The ID of the game result that these results correspond to.
		gameResultId: integer()
			.references(() => gameResults.id)
			.notNull(),

		// Unique identifier.
		id: integer().primaryKey().generatedAlwaysAsIdentity(),

		// Whether or not this team won the game.
		isWinner: boolean().notNull(),

		// The ID of the team, if any. May be null if the game result isn't part of a tournament or inhouse (such as games that are just pulled from the Riot API to collect statistics).
		teamId: integer().references(() => teams.id)
	},
	(self) => [unique().on(self.gameResultId, self.isWinner)]
);

/**
 * A ban in a team game result. This is just cached data from the Riot API. Always corresponds to a team game result.
 * @public
 */
export const teamGameResultBans = pgTable(
	"teamGameResultBans",
	{
		// The ID of the champion that was banned.
		championId: integer().notNull(),

		// The order in which this ban occurred.
		order: integer().notNull(),

		// The ID of the team game result that this ban correspond to.
		teamGameResultId: integer()
			.references(() => teamGameResults.id)
			.notNull()
	},
	(self) => [
		unique().on(self.championId, self.teamGameResultId),
		unique().on(self.order, self.teamGameResultId)
	]
);

/**
 * A player in a team game result. This is just cached data from the Riot API. Always corresponds to a team game result, but may not always correspond to a player (such as for game results that are just pulled from the Riot API to collect statistics).
 * @public
 */
export const playerGameResults = pgTable(
	"playerGameResults",
	{
		// The amount of life that the player healed on their allies, excluding regeneration.
		allyHealing: integer().notNull(),

		// The player's creep score from killing monsters in their own jungle.
		allyMonsterCreepScore: integer().notNull(),

		// The number of assists that the player got.
		assists: integer().notNull(),

		// The amount of damage that the player dealt to champions.
		championDamage: integer().notNull(),

		// The ID of the champion that the player played.
		championId: integer().notNull(),

		// The player's creep score from killing monsters in the enemy jungle.
		counterJungleCreepScore: integer().notNull(),

		// The amount of time that the player applied crowd control for.
		crowdControlScore: integer().notNull(),

		// The amount of damage that the player dealt.
		damage: integer().notNull(),

		// The amount of damage that the player took.
		damageTaken: integer().notNull(),

		// The number of deaths that the player has.
		deaths: integer().notNull(),

		// The number of double kills that the player got.
		doubleKills: integer().notNull(),

		// The number of dragon kills that the player got.
		dragonKills: integer().notNull(),

		// Whether or not this player got the first champion kill.
		firstBlood: boolean().notNull(),

		// Whether or not this player got the first tower kill.
		firstTower: boolean().notNull(),

		// The amount of gold that the player earned.
		goldEarned: integer().notNull(),

		// The amount of life that the player healed, excluding regeneration.
		healing: integer().notNull(),

		// Unique identifier.
		id: integer().primaryKey().generatedAlwaysAsIdentity(),

		// The ID of the item in the player's first item slot at the end of the game.
		item0Id: integer().notNull(),

		// The ID of the item in the player's second item slot at the end of the game.
		item1Id: integer().notNull(),

		// The ID of the item in the player's third item slot at the end of the game.
		item2Id: integer().notNull(),

		// The ID of the item in the player's fourth item slot at the end of the game.
		item3Id: integer().notNull(),

		// The ID of the item in the player's fifth item slot at the end of the game.
		item4Id: integer().notNull(),

		// The ID of the item in the player's sixth item slot at the end of the game.
		item5Id: integer().notNull(),

		// The number of kills that the player got.
		kills: integer().notNull(),

		// The player's creep score from killing minions.
		laneCreepScore: integer().notNull(),

		// The number of kills in the player's largest killing spree.
		largestKillingSpree: integer().notNull(),

		// The number of kills in the player's largest multi-kill.
		largestMultiKill: integer().notNull(),

		// The summoner name of the player at the point when this player game result was cached.
		name: integer().notNull(),

		// The amount of damage that the player dealt to objectives.
		objectiveDamage: integer().notNull(),

		// The number of objectives that the player stole.
		objectivesStolen: integer().notNull(),

		// The number of penta kills that the player got.
		pentaKills: integer().notNull(),

		// The ID of the player, if any. May be null if the game result isn't part of a tournament or inhouse (such as games that are just pulled from the Riot API to collect statistics).
		playerId: integer().references(() => players.id),

		// The position that the player most likely played, as determined by the Riot API.
		position: integer().notNull(),

		// The PUUID of the player.
		puuid: integer().notNull(),

		// The number of quadra kills that the player got.
		quadraKills: integer().notNull(),

		// The amount of damage that the player mitigated via resistances.
		selfMitigatedDamage: integer().notNull(),

		// The amount of damage that the player shielded their allies from.
		shieldedDamage: integer().notNull(),

		// The ID of the team game result that these results correspond to.
		teamGameResultId: integer()
			.references(() => teamGameResults.id)
			.notNull(),

		// The amount of damage that the player dealt to towers.
		towerDamage: integer().notNull(),

		// The number of triple kills that the player got.
		tripleKills: integer().notNull(),

		// The number of turrets that the player killed.
		turretKills: integer().notNull(),

		// The number of turrets that the player killed or assisted in killing.
		turretTakedowns: integer().notNull(),

		// The player's vision score.
		visionScore: integer().notNull(),

		// The player's creep score from killing wards.
		wardCreepScore: integer().notNull()
	},
	(self) => [unique().on(self.position, self.teamGameResultId)]
);
