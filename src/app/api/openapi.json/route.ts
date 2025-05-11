import AccountRank from "types/riot/AccountRank";
import AccountTier from "types/riot/AccountTier";
import { NextResponse } from "next/server";
import Platform from "types/riot/Platform";
import Position from "types/riot/Position";
import domain from "util/domain";

/**
 * Get the OpenAPI entry document for the GCS REST API.
 * @returns The OpenAPI entry document for the GCS REST API.
 * @see {@link https://spec.openapis.org/oas/v3.1.1 | OpenAPI Specification v3.1.1}
 * @public
 */
export const GET = (): NextResponse =>
	NextResponse.json({
		info: {
			contact: {
				email: "travis@lakuna.pw",
				name: "Travis Martin",
				url: "https://www.lakuna.pw/"
			},
			description:
				'The REST API for accessing tournament-related data for the tier 3 North American League of Legends tournament called the "Gauntlet Championship Series."',
			license: { identifier: "MIT", name: "MIT License" },
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
												type: "string"
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
												description:
													"The duration of the game in milliseconds.",
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
													"The ID of the platform that the game was played on. This can be joined with the game's Riot game ID in the form `{region}_{riotId}` to make the game's Riot match ID.",
												enum: [...Object.values(Platform), null],
												title: "Region"
											},
											riotId: {
												description:
													"The game ID of the game in the Riot API. This can be joined with the game's platform ID in the form `{region}_{riotId}` to make the game's Riot match ID.",
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
															type: ["number", "null"]
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
			"/matches": {}, // TODO
			"/matches/{id}": {}, // TODO
			"/players": {}, // TODO
			"/players/{id}": {}, // TODO
			"/seasons": {}, // TODO
			"/seasons/{id}": {}, // TODO
			"/teams": {}, // TODO
			"/teams/{id}": {} // TODO
		},
		servers: [
			{ description: "The GCS website.", url: new URL("/api", domain).href }
		]
	});
