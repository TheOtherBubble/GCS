import { NextResponse } from "next/server";
import domain from "util/domain";

/**
 * Get the player endpoint schema.
 * @public
 */
export const GET = (): NextResponse =>
	NextResponse.json({
		$id: new URL("/api/player/schema", domain).href,
		$schema: "https://json-schema.org/draft/2020-12/schema",
		description: "A GCS player.",
		properties: {
			accountIds: {
				description: "Unique IDs of this player's accounts.",
				items: {
					description:
						"A unique ID of an account. Unique and immutable. Always exactly 78 characters long.",
					type: "string"
				},
				type: "array",
				uniqueItems: true
			},
			bgChamp: {
				description:
					"The player's selected background champion's ID. This is sometimes referred to as the champion's name in the Riot API. This can be mapped to a champion key (sometimes referred to as a champion ID in the Riot API) using Data Dragon. 32 character maximum length.",
				type: ["string", "null"]
			},
			bgSkin: {
				description: "The player's selected background skin's number.",
				type: ["number", "null"]
			},
			bio: {
				description:
					"The player-defined biography. Supports CommonMark syntax. 256 character maximum length.",
				type: ["string", "null"]
			},
			discordId: {
				description:
					"The player's Discord account's ID. 64 character maximum length. Uniqueness is guaranteed by Discord, not by the GCS database.",
				type: "string"
			},
			discordName: {
				description:
					"The player's Discord account's name. 32 character maximum length. Uniqueness is guaranteed by Discord, not by the GCS database.",
				type: "string"
			},
			displayName: {
				description:
					"The player-defined display name. 32 character maximum length. Unique.",
				type: ["string", "null"]
			},
			gameIds: {
				description: "Unique IDs of this player's played games.",
				items: {
					description: "A unique ID of a game. Unique and immutable.",
					type: "number"
				},
				type: "array",
				uniqueItems: true
			},
			id: {
				description: "A unique, immutable UUIDv4 for the player.",
				type: "string"
			},
			role1: {
				description:
					'The player\'s selected primary role. Must be one of `"TOP"`, `"JUNGLE"`, `"MIDDLE"`, `"BOTTOM"`, or `"UTILITY"`.',
				type: ["string", "null"]
			},
			role2: {
				description:
					'The player\'s selected secondary role. Must be one of `"TOP"`, `"JUNGLE"`, `"MIDDLE"`, `"BOTTOM"`, or `"UTILITY"`.',
				type: ["string", "null"]
			},
			teamIds: {
				description: "Unique IDs of this player's teams.",
				items: {
					description: "A unique ID of a team. Unique and immutable.",
					type: "number"
				},
				type: "array",
				uniqueItems: true
			},
			twitchId: {
				description:
					"The ID of the player's linked Twitch account. 64 character maximum length.",
				type: ["string", "null"]
			},
			youtubeId: {
				description:
					"The ID of the player's linked YouTube account. 64 character maximum length.",
				type: ["string", "null"]
			}
		},
		required: [
			"accounts",
			"bgChamp",
			"bgSkin",
			"bio",
			"discordId",
			"discordName",
			"displayName",
			"id",
			"role1",
			"role2",
			"teamIds",
			"twitchId",
			"youtubeId"
		],
		title: "Player",
		type: ["object", "null"]
	});
