import AccountRank from "types/riot/AccountRank";
import AccountTier from "types/riot/AccountTier";
import MatchFormat from "types/MatchFormat";
import { NextResponse } from "next/server";
import Platform from "types/riot/Platform";
import Position from "types/riot/Position";

/**
 * The entry document for the GCS REST API.
 * @public
 */
export const entryDocument = {
	info: {
		description:
			'The REST API for accessing tournament-related data for the tier 3 North American League of Legends tournament called the "Gauntlet Championship Series."',
		summary: "The REST API for the GCS.",
		title: "GCS REST API",
		version: "1.0.0"
	},
	jsonSchemaDialect: "https://spec.openapis.org/oas/3.1/dialect/base",
	openapi: "3.1.1",
	paths: {
		"/accounts": {
			description:
				"Get a list of identifying information of Riot accounts that are associated with Gauntlet Championship Series players.",
			get: {
				description:
					"Get a list of identifying information of Riot accounts that are associated with Gauntlet Championship Series players.",
				operationId: "getAccounts",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description:
										"A list of identifying information of Riot accounts that are associated with Gauntlet Championship Series players.",
									items: {
										description:
											"The identifying information of a Riot account that is associated with a Gauntlet Championship Series player.",
										properties: {
											name: {
												description: "The name of the Riot account.",
												maxLength: 16,
												title: "Name",
												type: "string"
											},
											puuid: {
												description:
													"The encrypted player universally unique identifier (PUUID) of the Riot account. This can't be used with the Riot API since PUUIDs are encrypted per API key.",
												maxLength: 78,
												minLength: 78,
												title: "PUUID",
												type: "string"
											},
											region: {
												description: "The platform ID of the Riot account.",
												enum: Object.values(Platform),
												title: "Region"
											},
											tagLine: {
												description: "The tag line of the Riot account.",
												maxLength: 5,
												title: "Tag Line",
												type: "string"
											}
										},
										required: ["name", "puuid", "region", "tagLine"],
										title: "Account",
										type: "object"
									},
									title: "Accounts",
									type: "array",
									uniqueItems: true
								}
							}
						},
						description:
							"A list of identifying information of Riot accounts that are associated with Gauntlet Championship Series players."
					}
				},
				summary:
					"Get a list of Riot accounts that are associated with GCS players."
			},
			summary:
				"Get a list of Riot accounts that are associated with GCS players."
		},
		"/accounts/{puuid}": {
			description:
				"Get a Riot account that is associated with a Gauntlet Championship Series player.",
			get: {
				description:
					"Get a Riot account that is associated with a Gauntlet Championship Series player.",
				operationId: "getAccount",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description:
										"A Riot account that is associated with a Gauntlet Championship Series player.",
									properties: {
										cacheDate: {
											description:
												"The Unix timestamp of the moment when the Riot account was last fetched from the Riot API.",
											title: "Cache Date",
											type: "number"
										},
										isPrimary: {
											description:
												"Whether or not the Riot account is the primary account of its associated player.",
											title: "Is Primary?",
											type: "boolean"
										},
										isVerified: {
											description:
												"Whether or not the Riot account is verified as belonging to its associated player.",
											title: "Is Verified?",
											type: "boolean"
										},
										name: {
											description: "The name of the Riot account.",
											maxLength: 16,
											title: "Name",
											type: "string"
										},
										playerId: {
											description:
												"The ID of the player that is associated with the Riot account.",
											maxLength: 36,
											title: "Player ID",
											type: "string"
										},
										puuid: {
											description:
												"The encrypted player universally unique identifier (PUUID) of the Riot account. This can't be used with the Riot API since PUUIDs are encrypted per API key.",
											maxLength: 78,
											minLength: 78,
											title: "PUUID",
											type: "string"
										},
										rank: {
											description: "The solo/duo rank of the Riot account.",
											enum: Object.values(AccountRank),
											title: "Rank"
										},
										region: {
											description: "The platform ID of the Riot account.",
											enum: Object.values(Platform),
											title: "Region"
										},
										tagLine: {
											description: "The tag line of the Riot account.",
											maxLength: 5,
											title: "Tag Line",
											type: "string"
										},
										tier: {
											description: "The solo/duo tier of the Riot account.",
											enum: Object.values(AccountTier),
											title: "Tier"
										}
									},
									required: [
										"cacheDate",
										"isPrimary",
										"isVerified",
										"name",
										"playerId",
										"puuid",
										"rank",
										"region",
										"tagLine",
										"tier"
									],
									title: "Account",
									type: ["object", "null"]
								}
							}
						},
						description:
							"A Riot account that is associated with a Gauntlet Championship Series player."
					}
				},
				summary: "Get a Riot account that is associated with a GCS player."
			},
			parameters: [
				{
					description:
						"The encrypted player universally unique identifier (PUUID) of the Riot account. This can't be used with the Riot API since PUUIDs are encrypted per API key.",
					in: "path",
					name: "puuid",
					required: true,
					schema: {
						description:
							"The encrypted player universally unique identifier (PUUID) of the Riot account. This can't be used with the Riot API since PUUIDs are encrypted per API key.",
						maxLength: 78,
						minLength: 78,
						title: "PUUID",
						type: "string"
					}
				}
			],
			summary: "Get a Riot account that is associated with a GCS player."
		},
		"/documents": {
			description:
				"Get a list of IDs of Gauntlet Championship Series documents.",
			get: {
				description:
					"Get a list of IDs of Gauntlet Championship Series documents.",
				operationId: "getDocuments",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description:
										"A list of IDs of Gauntlet Championship Series documents.",
									items: {
										description: "The ID of the document.",
										title: "ID",
										type: "number"
									},
									title: "Documents",
									type: "array",
									uniqueItems: true
								}
							}
						},
						description:
							"A list of IDs of Gauntlet Championship Series documents."
					}
				},
				summary: "Get a list of GCS documents."
			},
			summary: "Get a list of GCS documents."
		},
		"/documents/{id}": {
			description: "Get a Gauntlet Championship Series document.",
			get: {
				description: "Get a Gauntlet Championship Series document.",
				operationId: "getDocument",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description: "A Gauntlet Championship Series document.",
									properties: {
										id: {
											description: "The ID of the document.",
											title: "ID",
											type: "number"
										},
										text: {
											description:
												"The contents of the document in CommonMark syntax.",
											title: "Text",
											type: ["string", "null"]
										}
									},
									required: ["id", "text"],
									title: "Document",
									type: ["object", "null"]
								}
							}
						},
						description: "A Gauntlet Champonship Series document."
					}
				},
				summary: "Get a GCS document."
			},
			parameters: [
				{
					description: "The ID of the document.",
					in: "path",
					name: "id",
					required: true,
					schema: {
						description: "The ID of the document.",
						title: "ID",
						type: "number"
					}
				}
			],
			summary: "Get a GCS document."
		},
		"/games": {
			description:
				"Get a list of identifying information of games that are cached by the Gauntlet Championship Series.",
			get: {
				description:
					"Get a list of identifying information of games that are cached by the Gauntlet Championship Series.",
				operationId: "getGames",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description:
										"A list of identifying information of games that are cached by the Gauntlet Championship Series.",
									items: {
										description:
											"The identifying information of a game that is cached by the Gauntlet Championship Series.",
										properties: {
											id: {
												description: "The ID of the game.",
												title: "ID",
												type: "number"
											},
											tournamentCode: {
												description: "The tournament code of the game.",
												maxLength: 0x40,
												title: "Tournament Code",
												type: "string"
											}
										},
										required: ["id", "tournamentCode"],
										title: "Game",
										type: "object"
									},
									title: "Games",
									type: "array",
									uniqueItems: true
								}
							}
						},
						description:
							"A list of identifying information of games that are cached by the Gauntlet Championship Series."
					}
				},
				summary: "Get a list of games that are cached by the GCS."
			},
			summary: "Get a list of games that are cached by the GCS."
		},
		"/games/{id}": {
			description:
				"Get a game that is cached by the Gauntlet Championship Series.",
			get: {
				description:
					"Get a game that is cached by the Gauntlet Championship Series.",
				operationId: "getGame",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description:
										"A game that is cached by the Gauntlet Championship Series.",
									properties: {
										duration: {
											description: "The duration of the game in milliseconds.",
											title: "Duration",
											type: ["number", "null"]
										},
										id: {
											description: "The ID of the game.",
											title: "ID",
											type: "number"
										},
										map: {
											description:
												"The ID of the map that the game was played on. See https://static.developer.riotgames.com/docs/lol/maps.json.",
											title: "Map",
											type: ["number", "null"]
										},
										matchId: {
											description:
												"The ID of the match that is associated with the game.",
											title: "Match ID",
											type: ["number", "null"]
										},
										mode: {
											description:
												"The mode of the game. See https://static.developer.riotgames.com/docs/lol/gameModes.json.",
											maxLength: 0x20,
											title: "Mode",
											type: ["string", "null"]
										},
										queue: {
											description:
												"The ID of the queue that the game was in. See https://static.developer.riotgames.com/docs/lol/queues.json.",
											title: "Queue",
											type: ["number", "null"]
										},
										region: {
											description:
												"The ID of the platform that the game was played on. This can be joined with the game's Riot game ID in the form `region + \"_\" + riotId` to make the game's Riot match ID.",
											enum: [...Object.values(Platform), null],
											title: "Region"
										},
										riotId: {
											description:
												"The game ID of the game in the Riot API. This can be joined with the game's platform ID in the form `region + \"_\" + riotId` to make the game's Riot match ID.",
											title: "Riot ID",
											type: ["number", "null"]
										},
										startTimestamp: {
											description:
												"The Unix timestamp of the moment that the game was started on the game server.",
											title: "Start Timestamp",
											type: ["number", "null"]
										},
										teams: {
											description: "The teams in the game.",
											items: {
												description: "A team in a completed game.",
												properties: {
													bans: {
														description:
															"The champions that were banned by the team in the draft for its game.",
														items: {
															description:
																"A champion that was banned by a team in the draft for its game.",
															properties: {
																champ: {
																	description:
																		"The key (Data Dragon)/ID (Riot API) of the champion that was banned.",
																	title: "Champion",
																	type: "number"
																},
																order: {
																	description:
																		"The order in which the champion was banned.",
																	title: "Order",
																	type: "number"
																}
															},
															required: ["champ", "order"],
															title: "Ban",
															type: "object"
														},
														title: "Bans",
														type: "array",
														uniqueItems: true
													},
													id: {
														description: "The ID of the team.",
														title: "ID",
														type: "number"
													},
													isWinner: {
														description:
															"Whether or not the team won its game.",
														title: "Is Winner?",
														type: "boolean"
													},
													players: {
														description: "The players on the team.",
														items: {
															description: "A player on a team in a game.",
															properties: {
																allyJgCs: {
																	description:
																		"The player's total number of monsters killed in their own side of the jungle.",
																	title: "Ally Jungle Creep Score",
																	type: "number"
																},
																assists: {
																	description:
																		"The number of assists that the player got.",
																	title: "Assists",
																	type: "number"
																},
																champ: {
																	description:
																		"The key (Data Dragon)/ID (Riot API) of the champion that the player played.",
																	title: "Champion",
																	type: "number"
																},
																champDmg: {
																	description:
																		"The amount of damage that the player dealt to champions.",
																	title: "Champion Damage",
																	type: "number"
																},
																deaths: {
																	description:
																		"The number of deaths that the player had.",
																	title: "Deaths",
																	type: "number"
																},
																enemyJgCs: {
																	description:
																		"The player's total number of monsters killed in their enemy's side of the jungle.",
																	title: "Enemy Jungle Creep Score",
																	type: "number"
																},
																item0: {
																	description:
																		"The ID of the item in the player's first item slot at the end of the game.",
																	title: "Item 0",
																	type: "number"
																},
																item1: {
																	description:
																		"The ID of the item in the player's second item slot at the end of the game.",
																	title: "Item 1",
																	type: "number"
																},
																item2: {
																	description:
																		"The ID of the item in the player's third item slot at the end of the game.",
																	title: "Item 2",
																	type: "number"
																},
																item3: {
																	description:
																		"The ID of the item in the player's fourth item slot at the end of the game.",
																	title: "Item 3",
																	type: "number"
																},
																item4: {
																	description:
																		"The ID of the item in the player's fifth item slot at the end of the game.",
																	title: "Item 4",
																	type: "number"
																},
																item5: {
																	description:
																		"The ID of the item in the player's sixth item slot at the end of the game.",
																	title: "Item 5",
																	type: "number"
																},
																item6: {
																	description:
																		"The ID of the item in the player's seventh (trinket) item slot at the end of the game.",
																	title: "Item 6",
																	type: "number"
																},
																kills: {
																	description:
																		"The number of kills that the player got.",
																	title: "Kills",
																	type: "number"
																},
																laneCs: {
																	description:
																		"The player's total number of minions killed, including team minions, melee lane minions, super lane minions, ranged lane minions, and siege lane minions.",
																	title: "Lane Creep Score",
																	type: "number"
																},
																level: {
																	description:
																		"The player's champion level at the end of the game.",
																	title: "Level",
																	type: "number"
																},
																name: {
																	description:
																		"The game name of the player when the game was played.",
																	maxLength: 16,
																	title: "Name",
																	type: "string"
																},
																neutralCs: {
																	description:
																		"The player's total number of neutral minions killed, including pets and jungle monsters.",
																	title: "Neutral Creep Score",
																	type: "number"
																},
																objectivesStolen: {
																	description:
																		"The number of objectives that the player stole.",
																	title: "Objectives Stolen",
																	type: "number"
																},
																pentakills: {
																	description:
																		"The number of pentakills that the player got.",
																	title: "Pentakills",
																	type: "number"
																},
																position: {
																	description:
																		"The position that the player most likely played, as determined by the Riot API.",
																	enum: Object.values(Position),
																	title: "Position"
																},
																puuid: {
																	description:
																		"The encrypted player universally unique identifier (PUUID) of the player. This can't be used with the Riot API since PUUIDs are encrypted per API key.",
																	maxLength: 78,
																	minLength: 78,
																	title: "PUUID",
																	type: "string"
																},
																summoner1: {
																	description:
																		"The ID of the player's first summoner spell.",
																	title: "Summoner 1",
																	type: "number"
																},
																summoner2: {
																	description:
																		"The ID of the player's second summoner spell.",
																	title: "Summoner 2",
																	type: "number"
																},
																towerDmg: {
																	description:
																		"The amount of damage that the player dealt to towers/turrets.",
																	title: "Tower Damage",
																	type: "number"
																},
																wardCs: {
																	description:
																		"The player's total number of wards killed.",
																	title: "Ward Creep Score",
																	type: "number"
																}
															},
															required: [
																"allyJgCs",
																"assists",
																"champ",
																"champDmg",
																"deaths",
																"enemyJgCs",
																"item0",
																"item1",
																"item2",
																"item3",
																"item4",
																"item5",
																"item6",
																"kills",
																"laneCs",
																"level",
																"name",
																"neutralCs",
																"objectivesStolen",
																"pentakills",
																"position",
																"puuid",
																"summoner1",
																"summoner2",
																"towerDmg",
																"wardCs"
															],
															title: "Player",
															type: "object"
														},
														title: "Players",
														type: "array",
														uniqueItems: true
													},
													riotId: {
														description:
															"The ID of the team in the Riot API. Typically, this is `100` for the blue team or `200` for the red team.",
														title: "Riot ID",
														type: "number"
													}
												},
												required: [
													"isWinner",
													"riotId",
													"id",
													"bans",
													"players"
												],
												title: "Team",
												type: "object"
											},
											title: "Teams",
											type: ["array", "null"],
											uniqueItems: true
										},
										tournamentCode: {
											description: "The tournament code of the game.",
											maxLength: 0x40,
											title: "Tournament Code",
											type: "string"
										},
										type: {
											description:
												"The type of the game. See https://static.developer.riotgames.com/docs/lol/gameTypes.json.",
											maxLength: 0x40,
											title: "Type",
											type: ["string", "null"]
										},
										version: {
											description:
												'The version that the game was played on. This is a four-part version ID; the first two parts are the "patch" that the game was played on.',
											maxLength: 0x20,
											title: "Version",
											type: ["string", "null"]
										}
									},
									required: [
										"id",
										"matchId",
										"tournamentCode",
										"duration",
										"riotId",
										"map",
										"mode",
										"queue",
										"region",
										"startTimestamp",
										"type",
										"version",
										"teams"
									],
									title: "Game",
									type: ["object", "null"]
								}
							}
						},
						description:
							"A game that is cached by the Gauntlet Championship Series."
					}
				},
				summary: "Get a game that is cached by the GCS."
			},
			parameters: [
				{
					description: "The ID of the game.",
					in: "path",
					name: "id",
					required: true,
					schema: {
						description: "The ID of the game.",
						title: "ID",
						type: "number"
					}
				}
			],
			summary: "Get a game that is cached by the GCS."
		},
		"/matches": {
			description:
				"Get a list of identifying information of Gauntlet Championship Series matches (series).",
			get: {
				description:
					"Get a list of identifying information of Gauntlet Championship Series matches (series).",
				operationId: "getMatches",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description:
										"A list of identifying information of Gauntlet Championship Series matches (series).",
									items: {
										description:
											"The identifying information of a Gauntlet Championship Series match (series).",
										properties: {
											id: {
												description: "The ID of the match.",
												title: "ID",
												type: "number"
											},
											round: {
												description:
													"The round in which the match took place. One-based. There are two rounds per week, with odd-numbered rounds taking place on Saturdays and even-numbered rounds taking place on Sundays.",
												title: "Round",
												type: "number"
											},
											seasonId: {
												description:
													"The ID of the season in which the match took place.",
												title: "Season ID",
												type: "number"
											},
											timeSlot: {
												description:
													"The time slot in which the match took place. One-based.",
												title: "Time Slot",
												type: "number"
											}
										},
										required: ["id", "round", "seasonId", "timeSlot"],
										title: "Match",
										type: "object"
									},
									title: "Matches",
									type: "array",
									uniqueItems: true
								}
							}
						},
						description:
							"A list of identifying information of Gauntlet Championship Series matches (series)."
					}
				},
				summary: "Get a list of GCS matches."
			},
			summary: "Get a list of GCS matches."
		},
		"/matches/{id}": {
			description: "Get a Gauntlet Championship Series match.",
			get: {
				description: "Get a Gauntlet Championship Series match.",
				operationId: "getMatch",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description: "A Gauntlet Championship Series match.",
									properties: {
										blueTeamId: {
											description:
												"The ID of the blue team in the match. The blue team will be on the blue side in the first game of the match, but may be on either side for each subsequent game.",
											title: "Blue Team ID",
											type: "number"
										},
										format: {
											description: "The format of the match.",
											enum: Object.values(MatchFormat),
											title: "Format"
										},
										gameIds: {
											description: "The IDs of the games in the match.",
											items: {
												description: "The ID of a game.",
												title: "Game ID",
												type: "number"
											},
											title: "Game IDs",
											type: "array",
											uniqueItems: true
										},
										id: {
											description: "The ID of the match.",
											title: "ID",
											type: "number"
										},
										isPlayoffs: {
											description:
												"Whether or not the match is part of the playoffs.",
											title: "Is Playoffs?",
											type: "boolean"
										},
										redTeamId: {
											description:
												"The ID of the red team in the match. The red team will be on the red side in the first game of the match, but may be on either side for each subsequent game.",
											title: "Red Team ID",
											type: "number"
										},
										round: {
											description:
												"The round in which the match took place. One-based. There are two rounds per week, with odd-numbered rounds taking place on Saturdays and even-numbered rounds taking place on Sundays.",
											title: "Round",
											type: "number"
										},
										seasonId: {
											description:
												"The ID of the season in which the match took place.",
											title: "Season ID",
											type: "number"
										},
										timeSlot: {
											description:
												"The time slot in which the match took place. One-based.",
											title: "Time Slot",
											type: "number"
										}
									},
									required: [
										"blueTeamId",
										"format",
										"id",
										"isPlayoffs",
										"redTeamId",
										"round",
										"seasonId",
										"timeSlot",
										"games"
									],
									title: "Match",
									type: ["object", "null"]
								}
							}
						},
						description: "A Gauntlet Championship Series match."
					}
				},
				summary: "Get a GCS match."
			},
			parameters: [
				{
					description: "The ID of the match.",
					in: "path",
					name: "id",
					required: true,
					schema: {
						description: "The ID of the match.",
						title: "ID",
						type: "number"
					}
				}
			],
			summary: "Get a GCS match."
		},
		"/players": {
			description:
				"Get a list of identifying information of Gauntlet Championship Series players.",
			get: {
				description:
					"Get a list of identifying information of Gauntlet Championship Series players.",
				operationId: "getPlayers",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description:
										"A list of identifying information of Gauntlet Championship Series players.",
									items: {
										description:
											"The identifying information of a Gauntlet Championship Series player.",
										properties: {
											discordId: {
												description:
													"The ID (snowflake) of the player's Discord account.",
												maxLength: 0x40,
												title: "Discord ID",
												type: "string"
											},
											displayName: {
												description: "The display name of the player.",
												maxLength: 0x20,
												title: "Display Name",
												type: ["string", "null"]
											},
											id: {
												description: "The ID of the player.",
												maxLength: 36,
												title: "ID",
												type: "string"
											},
											name: {
												description:
													"The name of the player's Discord account.",
												maxLength: 0x20,
												title: "Name",
												type: "string"
											},
											slug: {
												description: "The player's vanity URL slug.",
												maxLength: 0x20,
												title: "Slug",
												type: ["string", "null"]
											}
										},
										required: [
											"id",
											"discordId",
											"displayName",
											"name",
											"slug"
										],
										title: "Player",
										type: "object"
									},
									title: "Players",
									type: "array",
									uniqueItems: true
								}
							}
						},
						description:
							"A list of identifying information of Gauntlet Championship Series players."
					}
				},
				summary: "Get a list of GCS players."
			},
			summary: "Get a list of GCS players."
		},
		"/players/{id}": {
			description: "Get a Gauntlet Championship Series player.",
			get: {
				description: "Get a Gauntlet Championship Series player.",
				operationId: "getPlayer",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description: "A Gauntlet Championship Series player.",
									properties: {
										accountPuuids: {
											description:
												"The encrypted player universally unique identifier (PUUID) of the player's Riot accounts. These can't be used with the Riot API since PUUIDs are encrypted per API key.",
											items: {
												description:
													"The encrypted player universally unique identifier (PUUID) of a Riot account. This can't be used with the Riot API since PUUIDs are encrypted per API key.",
												title: "Account PUUID",
												type: "string"
											},
											title: "Account PUUIDs",
											type: "array",
											uniqueItems: true
										},
										bannedUntil: {
											description:
												"The date that the user is banned until in the format YYYY-MM-DD. If this is `null` or a date in the past, this user is not banned.",
											title: "Banned Until",
											type: ["string", "null"]
										},
										bgChamp: {
											description:
												"The ID (Data Dragon)/name (Riot API) of the champion in the background of the player's profile.",
											maxLength: 0x20,
											title: "Background Champion",
											type: ["string", "null"]
										},
										bgSkin: {
											description:
												"The number of the skin in the background of the player's profile.",
											title: "Background Skin",
											type: ["number", "null"]
										},
										bio: {
											description:
												"The player's biography in CommonMark syntax.",
											maxLength: 0x100,
											title: "Biography",
											type: ["string", "null"]
										},
										discordId: {
											description:
												"The ID (snowflake) of the player's Discord account.",
											maxLength: 0x40,
											title: "Discord ID",
											type: "string"
										},
										displayName: {
											description: "The display name of the player.",
											maxLength: 0x20,
											title: "Display Name",
											type: ["string", "null"]
										},
										id: {
											description: "The ID of the player.",
											maxLength: 36,
											title: "ID",
											type: "string"
										},
										isAdmin: {
											description:
												"Whether or not the player is an administrator.",
											title: "Is Administrator?",
											type: "boolean"
										},
										name: {
											description: "The name of the player's Discord account.",
											maxLength: 0x20,
											title: "Name",
											type: "string"
										},
										primaryRole: {
											description: "The player's primary role.",
											enum: [...Object.values(Position), null],
											title: "Primary Role"
										},
										seasons: {
											description:
												"The seasons that the player has signed up for.",
											items: {
												description:
													"A season that a player has signed up for.",
												properties: {
													draftedAt: {
														description:
															"The Unix timestamp of the moment when the player was drafted to a team. May be `null` for players that were never drafted or for players that were manually assigned to teams by administrators.",
														title: "Drafted At",
														type: ["number", "null"]
													},
													id: {
														description: "The ID of the season.",
														title: "ID",
														type: "number"
													},
													notes: {
														description:
															"Additional notes about the player's registration.",
														title: "Notes",
														type: ["string", "null"]
													},
													pointValue: {
														description:
															"The point value of the player in the season. May be `null` for players who signed up but were not admitted into the draft class.",
														title: "Point Value",
														type: ["number", "null"]
													},
													registeredAt: {
														description:
															"The Unix timestamp of the moment when the player registered for the season.",
														title: "Registered At",
														type: "number"
													}
												},
												required: [
													"draftedAt",
													"notes",
													"pointValue",
													"registeredAt",
													"id"
												],
												title: "Season",
												type: "object"
											},
											title: "Seasons",
											type: "array",
											uniqueItems: true
										},
										secondaryRole: {
											description: "The player's secondary role.",
											enum: [...Object.values(Position), null],
											title: "Secondary Role"
										},
										slug: {
											description: "The player's vanity URL slug.",
											maxLength: 0x20,
											title: "Slug",
											type: ["string", "null"]
										},
										teams: {
											description:
												"The teams that the player has been a member of.",
											items: {
												description:
													"A team that a player has been a member of.",
												properties: {
													id: {
														description: "The ID of the team.",
														title: "ID",
														type: "number"
													},
													isCaptain: {
														description:
															"Whether or not the player is the captain of the team.",
														title: "Is Captain?",
														type: "boolean"
													}
												},
												required: ["id", "isCaptain"],
												title: "Team",
												type: "object"
											},
											title: "Teams",
											type: "array",
											uniqueItems: true
										},
										twitchId: {
											description: "The ID of the player's Twitch account.",
											maxLength: 0x40,
											title: "Twitch ID",
											type: ["string", "null"]
										},
										youtubeId: {
											description: "The ID of the player's YouTube account.",
											maxLength: 0x40,
											title: "YouTube ID",
											type: ["string", "null"]
										}
									},
									required: [
										"id",
										"bannedUntil",
										"bgChamp",
										"bgSkin",
										"bio",
										"discordId",
										"displayName",
										"isAdmin",
										"name",
										"primaryRole",
										"secondaryRole",
										"slug",
										"twitchId",
										"youtubeId",
										"accountPuuids",
										"teams",
										"seasons"
									],
									title: "Player",
									type: ["object", "null"]
								}
							}
						},
						description: "A Gauntlet Championship Series player."
					}
				},
				summary: "Get a GCS player."
			},
			parameters: [
				{
					description: "The ID of the player.",
					in: "path",
					name: "id",
					required: true,
					schema: {
						description: "The ID of the player.",
						maxLength: 36,
						title: "ID",
						type: "string"
					}
				}
			],
			summary: "Get a GCS player."
		},
		"/seasons": {
			description:
				"Get a list of identifying information of Gauntlet Championship Series seasons.",
			get: {
				description:
					"Get a list of identifying information of Gauntlet Championship Series seasons.",
				operationId: "getSeasons",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description:
										"A list of identifying information of Gauntlet Championship Series seasons.",
									items: {
										description:
											"The identifying information of a Gauntlet Championship Series seasons.",
										properties: {
											id: {
												description: "The ID of the season.",
												title: "ID",
												type: "number"
											},
											name: {
												description: "The name of the season.",
												maxLength: 0x40,
												title: "Name",
												type: "string"
											},
											slug: {
												description: "The vanity URL slug of the season.",
												maxLength: 0x20,
												title: "Slug",
												type: "string"
											}
										},
										required: ["id", "name", "slug"],
										title: "Season",
										type: "object"
									},
									title: "Seasons",
									type: "array",
									uniqueItems: true
								}
							}
						},
						description:
							"A list of identifying information of Gauntlet Championship Series seasons."
					}
				},
				summary: "Get a list of GCS seasons."
			},
			summary: "Get a list of GCS seasons."
		},
		"/seasons/{id}": {
			description: "Get a Gauntlet Championship Series season.",
			get: {
				description: "Get a Gauntlet Championship Series season.",
				operationId: "getSeason",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description: "A Gauntlet Championship Series season.",
									properties: {
										id: {
											description: "The ID of the season.",
											title: "ID",
											type: "number"
										},
										matchIds: {
											description: "The IDs of the matches in the season.",
											items: {
												description: "The ID of a match in the season.",
												title: "Match ID",
												type: "number"
											},
											title: "Match IDs",
											type: "array",
											uniqueItems: true
										},
										name: {
											description: "The name of the season.",
											maxLength: 0x40,
											title: "Name",
											type: "string"
										},
										players: {
											description:
												"The players that registered for the season.",
											items: {
												description: "A player that registered for the season",
												properties: {
													draftedAt: {
														description:
															"The Unix timestamp of the moment when the player was drafted to a team. May be `null` for players that were never drafted or for players that were manually assigned to teams by administrators.",
														title: "Drafted At",
														type: ["number", "null"]
													},
													id: {
														description: "The ID of the player.",
														maxLength: 36,
														title: "ID",
														type: "string"
													},
													notes: {
														description:
															"Additional notes about the player's registration.",
														title: "Notes",
														type: ["string", "null"]
													},
													pointValue: {
														description:
															"The point value of the player in the season. May be `null` for players who signed up but were not admitted into the draft class.",
														title: "Point Value",
														type: ["number", "null"]
													},
													registeredAt: {
														description:
															"The Unix timestamp of the moment when the player registered for the season.",
														title: "Registered At",
														type: "number"
													}
												},
												required: [
													"id",
													"draftedAt",
													"notes",
													"pointValue",
													"registeredAt"
												],
												title: "Player",
												type: "object"
											},
											title: "Players",
											type: "array",
											uniqueItems: true
										},
										playoffsStageId: {
											description:
												'The playoffs stage ID of the season. This can be joined with the playoffs tournament ID in the form `"https://widget.toornament.com/tournaments/" + playoffsTourneyId + "/stages/" + playoffsStageId + "/"` to get the URL for the season\'s playoffs bracket widget.',
											maxLength: 0x20,
											title: "Playoffs Stage ID",
											type: ["string", "null"]
										},
										playoffsTourneyId: {
											description:
												'The playoffs tournament ID of the season. This can be joined with the playoffs stage ID in the form `"https://widget.toornament.com/tournaments/" + playoffsTourneyId + "/stages/" + playoffsStageId + "/"` to get the URL for the season\'s playoffs bracket widget.',
											maxLength: 0x20,
											title: "Playoffs Tournament ID",
											type: ["string", "null"]
										},
										slug: {
											description: "The vanity URL slug of the season.",
											maxLength: 0x20,
											title: "Slug",
											type: "string"
										},
										startDate: {
											description:
												"The date that the season started in the format YYYY-MM-DD. The first round of matches takes place on the first Saturday after this date (or on this date if it is a Saturday).",
											title: "Start Date",
											type: "string"
										},
										teamIds: {
											description: "The IDs of the teams in the season",
											items: {
												description: "The ID of a team in the season",
												title: "Team ID",
												type: "number"
											},
											title: "Team IDs",
											type: "array",
											uniqueItems: true
										}
									},
									required: [
										"id",
										"name",
										"playoffsStageId",
										"playoffsTourneyId",
										"slug",
										"startDate",
										"teamIds",
										"players",
										"matchIds"
									],
									title: "Season",
									type: ["object", "null"]
								}
							}
						},
						description: "A Gauntlet Championship Series season."
					}
				},
				summary: "Get a GCS season."
			},
			parameters: [
				{
					description: "The ID of the season.",
					in: "path",
					name: "id",
					required: true,
					schema: {
						description: "The ID of the season.",
						title: "ID",
						type: "number"
					}
				}
			],
			summary: "Get a GCS season."
		},
		"/teams": {
			description:
				"Get a list of identifying information of Gauntlet Championship Series teams.",
			get: {
				description:
					"Get a list of identifying information of Gauntlet Championship Series teams.",
				operationId: "getTeams",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description:
										"A list of identifying information of Gauntlet Championship Series teams.",
									items: {
										description:
											"The identifying information of a Gauntlet Championship Series team.",
										properties: {
											id: {
												description: "The ID of the team.",
												title: "ID",
												type: "number"
											},
											name: {
												description: "The name of the team.",
												maxLength: 0x40,
												title: "Name",
												type: "string"
											},
											slug: {
												description: "The vanity URL slug of the team.",
												maxLength: 0x20,
												title: "Slug",
												type: "string"
											}
										},
										required: ["id", "name", "slug"],
										title: "Team",
										type: "object"
									},
									title: "Teams",
									type: "array",
									uniqueItems: true
								}
							}
						},
						description:
							"A list of identifying information of Gauntlet Championship Series teams."
					}
				},
				summary: "Get a list of GCS teams."
			},
			summary: "Get a list of GCS teams."
		},
		"/teams/{id}": {
			description: "Get a Gauntlet Championship Series team.",
			get: {
				description: "Get a Gauntlet Championship Series team.",
				operationId: "getTeam",
				responses: {
					"200": {
						content: {
							"application/json": {
								schema: {
									description: "A Gauntlet Championship Series team.",
									properties: {
										code: {
											description: "The team's code.",
											maxLength: 4,
											title: "Code",
											type: "string"
										},
										color: {
											description:
												'The red-green-blue hexadecimal triplet of the team\'s theme color (i.e. `"50c878"`).',
											maxLength: 6,
											minLength: 6,
											title: "Color",
											type: "string"
										},
										draftOrder: {
											description:
												"The team's pick order within the player draft.",
											title: "Draft Order",
											type: "number"
										},
										id: {
											description: "The ID of the team.",
											title: "ID",
											type: "number"
										},
										isWinner: {
											description: "Whether or not the team won its season.",
											title: "Is Winner?",
											type: "boolean"
										},
										logoUrl: {
											description: "The URL of the team's logo image.",
											maxLength: 0x800,
											title: "Logo URL",
											type: "string"
										},
										matchIds: {
											description:
												"The IDs of the matches that the team participated in.",
											items: {
												description:
													"The ID of a match that the team participated in.",
												title: "Match ID",
												type: "number"
											},
											title: "Match IDs",
											type: "array",
											uniqueItems: true
										},
										name: {
											description: "The name of the team.",
											maxLength: 0x40,
											title: "Name",
											type: "string"
										},
										players: {
											description: "The players that are members of the team.",
											items: {
												description: "A player that is a member of the team.",
												properties: {
													id: {
														description: "The ID of the player.",
														maxLength: 36,
														title: "ID",
														type: "string"
													},
													isCaptain: {
														description:
															"Whether or not the player is the captain of the team.",
														title: "Is Captain?",
														type: "boolean"
													}
												},
												required: ["id", "isCaptain"],
												title: "Player",
												type: "object"
											},
											title: "Players",
											type: "array",
											uniqueItems: true
										},
										pool: {
											description: "The pool that the team is part of.",
											title: "Pool",
											type: "number"
										},
										seasonId: {
											description:
												"The ID of the season that the team is part of.",
											title: "Season ID",
											type: "number"
										},
										slug: {
											description: "The vanity URL slug of the team.",
											maxLength: 0x20,
											title: "Slug",
											type: "string"
										}
									},
									required: [
										"code",
										"color",
										"draftOrder",
										"id",
										"isWinner",
										"logoUrl",
										"name",
										"pool",
										"seasonId",
										"slug",
										"players",
										"matchIds"
									],
									title: "Team",
									type: ["object", "null"]
								}
							}
						},
						description: "A Gauntlet Championship Series team."
					}
				},
				summary: "Get a GCS team."
			},
			parameters: [
				{
					description: "The ID of the team.",
					in: "path",
					name: "id",
					required: true,
					schema: {
						description: "The ID of the team.",
						title: "ID",
						type: "number"
					}
				}
			],
			summary: "Get a GCS team."
		}
	},
	servers: [{ description: "The GCS website.", url: "/api" }]
};

/**
 * Get the OpenAPI entry document for the GCS REST API.
 * @returns The OpenAPI entry document for the GCS REST API.
 * @see {@link https://spec.openapis.org/oas/v3.1.1 | OpenAPI Specification v3.1.1}
 * @public
 */
export const GET = (): NextResponse => NextResponse.json(entryDocument);
