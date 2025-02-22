import domain from "util/domain";

/**
 * Get the players endpoint schema.
 * @public
 */
export const GET = () =>
	Response.json({
		$id: new URL("/players/schema", domain).href,
		$schema: "https://json-schema.org/draft/2020-12/schema",
		description: "A list of GCS players.",
		items: {
			properties: {
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
				"bgChamp",
				"bgSkin",
				"bio",
				"discordId",
				"discordName",
				"displayName",
				"id",
				"role1",
				"role2",
				"twitchId",
				"youtubeId"
			],
			type: "object"
		},
		title: "Players",
		type: "array",
		uniqueItems: true
	});
