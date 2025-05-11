import { NextResponse } from "next/server";

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
			summary: "The REST API for the Gauntlet Championship Series.",
			title: "GCS REST API",
			version: "1.0.0"
		},
		jsonSchemaDialect: "https://json-schema.org/draft/2020-12/schema",
		openapi: "3.1.1",
		paths: {
			"/accounts": {
				description:
					"Get a list of names, tag lines, regions, and PUUIDs of Riot accounts that are associated with Gauntlet Championship Series players.",
				get: {
					description:
						"Get a list of names, tag lines, regions, and PUUIDs of Riot accounts that are associated with Gauntlet Championship Series players.",
					operationId: "getAccounts",
					responses: {},
					summary:
						"Get a list of Riot accounts that are associated with GCS players."
				},
				summary:
					"Get a list of Riot accounts that are associated with GCS players."
			},
			"/accounts/{puuid}": {},
			"/documents": {},
			"/documents/{id}": {},
			"/games": {},
			"/games/{id}": {},
			"/matches": {},
			"/matches/{id}": {},
			"/players": {},
			"/players/{id}": {},
			"/seasons": {},
			"/seasons/{id}": {},
			"/teams": {},
			"/teams/{id}": {}
		},
		servers: [{ description: "The GCS website.", url: "/api" }]
	});
