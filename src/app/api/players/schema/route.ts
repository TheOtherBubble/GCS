import { NextResponse } from "next/server";
import domain from "util/domain";

/**
 * Get the players endpoint schema.
 * @public
 */
export const GET = (): NextResponse =>
	NextResponse.json({
		$id: new URL("/api/players/schema", domain).href,
		$schema: "https://json-schema.org/draft/2020-12/schema",
		description: "A list of GCS players.",
		items: {
			description: "A GCS player.",
			properties: {
				discordId: {
					description:
						"The player's Discord account's ID (snowflake). 64 character maximum length. Uniqueness is guaranteed by Discord, not by the GCS database.",
					type: "string"
				},
				discordName: {
					description:
						"The player's Discord account's name. 32 character maximum length. Uniqueness is guaranteed by Discord, not by the GCS database.",
					type: "string"
				},
				id: {
					description: "A unique, immutable UUIDv4 for the player.",
					type: "string"
				}
			},
			required: ["discordId", "discordName", "id"],
			type: "object"
		},
		title: "Players",
		type: "array",
		uniqueItems: true
	});
