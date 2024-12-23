import {
	boolean,
	char,
	date,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	timestamp,
	unique,
	varchar
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

/**
 * The table of players. Players are linked to one Discord account and any number of Riot accounts, and may participate in any number of seasons on any number of teams.
 * @public
 */
export const playersTable = pgTable("players", {
	// A player-selected champion to use as a background on player cards, stored as a champion ID.
	backgroundChampionId: varchar({ length: 0x20 }),

	// A player-selected champion skin to use as a background on player cards, stored as a skin ID.
	backgroundSkinId: varchar({ length: 0x20 }),

	// The date that the user is banned until.
	bannedUntilDate: date(),

	// A player-defined biography.
	biography: varchar({ length: 0x100 }),

	// A Discord snowflake (64-bit integer) stored as a string.
	discordId: varchar({ length: 0x40 }).notNull(),

	// The user's email address. Used by Auth.js to link OAuth accounts to users.
	email: varchar({ length: 0x40 }),

	// Required by Auth.js, but always null.
	emailVerified: timestamp(),

	// A UUID that represents the player. Supplied by Auth.js. Must be a `varchar` to make Auth.js happy, despite always being 36 characters.
	id: varchar({ length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),

	// Required by Auth.js, but always null. Image is instead determined with `backgroundChampionId` and `backgroundSkinId`.
	image: varchar({ length: 0x200 }),

	// Whether or not this user is an administrator.
	isAdministator: boolean().notNull().default(false),

	// The player's display name. Passed through `encodeURIComponent` and then used as a slug to make the player's URL.
	name: varchar({ length: 0x20 }).notNull(),

	// The player's Twitch ID.
	twitchId: varchar({ length: 0x40 }),

	// The player's YouTube ID.
	youtubeId: varchar({ length: 0x40 })
});

/**
 * The table of OAuth accounts. Used by Auth.js.
 * @public
 */
export const oauthAccountsTable = pgTable(
	"oauthAccounts",
	{
		// The access token.
		// eslint-disable-next-line camelcase
		access_token: varchar({ length: 0x100 }),

		// The epoch timestamp that the access token expires at.
		// eslint-disable-next-line camelcase
		expires_at: integer(),

		// The ID token. Required by Auth.js, but always null.
		// eslint-disable-next-line camelcase
		id_token: varchar({ length: 0x100 }),

		// The account's provider. Always `"discord"`.
		provider: varchar({ length: 0x20 }).notNull(),

		// The provider account ID. Equivalent to the user's Discord snowflake.
		providerAccountId: varchar({ length: 0x100 }).notNull(),

		// The refresh token.
		// eslint-disable-next-line camelcase
		refresh_token: varchar({ length: 0x100 }),

		// The token's scope.
		scope: varchar({ length: 0x100 }),

		// The session's state. Required by Auth.js, but always null.
		// eslint-disable-next-line camelcase
		session_state: varchar({ length: 0x100 }),

		// The type of the token.
		// eslint-disable-next-line camelcase
		token_type: varchar({ length: 0x20 }),

		// The account's type.
		type: varchar({ length: 0x20 }).$type<AdapterAccountType>().notNull(),

		// The ID of the associated player.
		userId: varchar({ length: 36 })
			.notNull()
			.references(() => playersTable.id, { onDelete: "cascade" })
	},
	(self) => [primaryKey({ columns: [self.provider, self.providerAccountId] })]
);

/**
 * An OAuth session for a player.
 * @public
 */
export const sessionsTable = pgTable("sessions", {
	// The timestamp that the session expires at.
	expires: timestamp().notNull(),

	// The session token.
	sessionToken: varchar({ length: 0x100 }).primaryKey(),

	// The player that the session belongs to.
	userId: varchar({ length: 36 })
		.notNull()
		.references(() => playersTable.id, { onDelete: "cascade" })
});

/**
 * Tiers that an account can be.
 * @public
 */
export const accountTierEnum = pgEnum("accountTier", [
	"IRON",
	"BRONZE",
	"SILVER",
	"GOLD",
	"PLATINUM",
	"EMERALD",
	"DIAMOND",
	"MASTER",
	"GRANDMASTER",
	"CHALLENGER"
]);

/**
 * Ranks that an account can be within a tier.
 * @public
 */
export const accountRankEnum = pgEnum("accountRank", ["I", "II", "III", "IV"]);

/**
 * The table of Riot accounts. Each Riot account is linked to one player. Riot account game names and tag lines are cached to reduce calls to the Riot API.
 * @public
 */
export const accountsTable = pgTable(
	"accounts",
	{
		// The Riot account ID of the account. 56 character maximum length.
		accountId: varchar({ length: 56 }).notNull(),

		// The date and time that the account was last cached.
		cacheDate: date().notNull().defaultNow(),

		// The game name of the account at the last time that the account was cached. The longest allowed game name is 16 characters.
		gameNameCache: varchar({ length: 16 }).notNull(),

		// Whether or not this account is the primary account of the associated player. Must be null for non-primary accounts.
		isPrimary: boolean(),

		// Whether or not the associated player has verified ownership of this account.
		isVerified: boolean().notNull().default(false),

		// The ID of the player that the account is linked to.
		playerId: varchar({ length: 36 })
			.references(() => playersTable.id, { onDelete: "cascade" })
			.notNull(),

		// The ID of the profile icon that the account must select in order to verify that the associated player owns it. Randomly selected from icons in the starter pack (IDs 0 through 28), which every player owns.
		profileIconIdToVerify: integer().notNull(),

		// The Player Universally Unique ID (PUUID) of the account. PUUIDs are always 78 characters long.
		puuid: char({ length: 78 }).primaryKey(),

		// The solo/duo rank (within a tier) of the account at the last time that the account was cached.
		rankCache: accountRankEnum().notNull(),

		// The account's platform (region) ID (i.e. `"NA1"` for North America).
		region: varchar({ length: 4 }).notNull(),

		// The account's summoner ID. 63 character maximum length.
		summonerId: varchar({ length: 63 }).notNull(),

		// The tag line of the account at the last time that the account was cached. The longest allowed tag line is 5 characters.
		tagLineCache: varchar({ length: 5 }).notNull(),

		// The solo/duo tier of the account at the last time that the account was cached.
		tierCache: accountTierEnum().notNull()
	},
	(self) => [
		unique().on(self.accountId, self.region),
		unique().on(self.isPrimary, self.playerId),
		unique().on(self.region, self.summonerId)
	]
);

/**
 * The table of seasons. Seasons may consist of any number of matches between any number of teams split up into any number of pools.
 * @public
 */
export const seasonsTable = pgTable("seasons", {
	// Unique identifier.
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// The season's name.
	name: varchar({ length: 0x40 }).notNull().unique(),

	// The season's start date.
	startDate: date().notNull().defaultNow(),

	// The season's vanity URL slug. Passed through `encodeURIComponent` and then used as a slug to make the season's URL.
	vanityUrlSlug: varchar({ length: 0x20 }).notNull().unique()
});

/**
 * The table of teams. Each team participates in one pool of one season, and has one captain out of any number of players.
 * @public
 */
export const teamsTable = pgTable(
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
		pool: integer().notNull().default(1),

		// The ID of the team's season.
		seasonId: integer()
			.references(() => seasonsTable.id, { onDelete: "cascade" })
			.notNull(),

		// The team's vanity URL slug. Passed through `encodeURIComponent` and then used as a slug to make the team's URL.
		vanityUrlSlug: varchar({ length: 0x20 }).notNull().unique()
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
export const teamPlayersTable = pgTable(
	"teamPlayers",
	{
		// Whether or not the player is the captain of the team. Must be null for non-captains.
		isCaptain: boolean(),

		// The ID of the player.
		playerId: varchar({ length: 36 })
			.references(() => playersTable.id, { onDelete: "cascade" })
			.notNull(),

		// The ID of the team.
		teamId: integer()
			.references(() => teamsTable.id, { onDelete: "cascade" })
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
export const matchFormatEnum = pgEnum("matchFormat", [
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
export const matchTeamEnum = pgEnum("matchTeam", ["Red", "Blue"]);

/**
 * The table of matches. Each match belongs to a week of a season, is played between two teams, and may be composed of any number of games (depending on the match's format).
 * @public
 */
export const matchesTable = pgTable("matches", {
	// The ID of the red team.
	blueTeamId: integer()
		.references(() => teamsTable.id, { onDelete: "cascade" })
		.notNull(),

	// The format of the match.
	format: matchFormatEnum().notNull(),

	// Unique identifier.
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// The ID of the red team.
	redTeamId: integer()
		.references(() => teamsTable.id, { onDelete: "cascade" })
		.notNull(),

	// The one-based round of its season that the match will take place. There are two rounds per week.
	round: integer().notNull(),

	// The ID of the match's season.
	seasonId: integer()
		.references(() => seasonsTable.id, { onDelete: "cascade" })
		.notNull(),

	// The team that won the match, if it has concluded.
	winner: matchTeamEnum()
});

/**
 * The table of games, regardless of whether they are upcoming, in progress, or completed. Games may (in the case of stage games) or may not be (in the case of inhouses) be part of a match.
 * @public
 */
export const gamesTable = pgTable("games", {
	// Unique identifier.
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// The ID of the match that the game is part of.
	matchId: integer().references(() => matchesTable.id, {
		onDelete: "set null"
	}),

	// The tournament code that players in the game use to join the game.
	tournamentCode: varchar({ length: 0x40 }).notNull()
});

/**
 * The table of game results, which represent the players and statistics in a completed game. A game result may not correspond to a game if the game result isn't part of a tournament or inhouse (such as games that are just pulled from the Riot API to collect statistics).
 * @public
 */
export const gameResultsTable = pgTable("gameResults", {
	// The duration of the game in seconds.
	duration: integer().notNull(),

	// The ID of the game that these results correspond to, if any. May be null if the game result isn't part of a tournament or inhouse (such as games that are just pulled from the Riot API to collect statistics).
	gameId: integer()
		.references(() => gamesTable.id, { onDelete: "set null" })
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
export const teamGameResultsTable = pgTable(
	"teamGameResults",
	{
		// The ID of the game result that these results correspond to.
		gameResultId: integer()
			.references(() => gameResultsTable.id, { onDelete: "cascade" })
			.notNull(),

		// Unique identifier.
		id: integer().primaryKey().generatedAlwaysAsIdentity(),

		// Whether or not this team won the game.
		isWinner: boolean().notNull(),

		// The ID of the team, if any. May be null if the game result isn't part of a tournament or inhouse (such as games that are just pulled from the Riot API to collect statistics).
		teamId: integer().references(() => teamsTable.id, { onDelete: "set null" })
	},
	(self) => [unique().on(self.gameResultId, self.isWinner)]
);

/**
 * A ban in a team game result. This is just cached data from the Riot API. Always corresponds to a team game result.
 * @public
 */
export const teamGameResultBansTable = pgTable(
	"teamGameResultBans",
	{
		// The ID of the champion that was banned.
		championId: varchar({ length: 0x20 }).notNull(),

		// The order in which this ban occurred.
		order: integer().notNull(),

		// The ID of the team game result that this ban correspond to.
		teamGameResultId: integer()
			.references(() => teamGameResultsTable.id, { onDelete: "cascade" })
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
export const playerGameResultsTable = pgTable(
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
		championId: varchar({ length: 0x20 }).notNull(),

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

		// The amount of gold that the player has over their lane opponent at 14 minutes into the game (when the Rift Herald spawns and turret plating falls off).
		gd14: integer().notNull(),

		// The amount of gold that the player has over their lane opponent at 20 minutes into the game (when Baron Nashor/Atakhan spawns).
		gd20: integer().notNull(),

		// The amount of gold that the player has over their lane opponent at 6 minutes into the game (when the Voidgrubs spawn).
		gd6: integer().notNull(),

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
		playerId: varchar({ length: 36 }).references(() => playersTable.id, {
			onDelete: "set null"
		}),

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
			.references(() => teamGameResultsTable.id, { onDelete: "cascade" })
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
