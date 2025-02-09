import "util/env";

/**
 * Makes a request to a Riot API endpoint. Automatically applies the Riot API key to the `X-Riot-Token` header.
 * @param input - The request input.
 * @param init - The request initialization data.
 * @param key - The Riot API key to use, or `undefined` to automatically use `process.env.RIOT_API_KEY`.
 * @returns The response.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function riotFetch(
	input: Request | RequestInfo | URL,
	init?: RequestInit,
	key?: string
): Promise<Response> {
	const realKey = key ?? process.env["RIOT_API_KEY"];
	if (!realKey) {
		throw new Error("Missing Riot API key.");
	}

	const request = new Request(input, init);
	request.headers.set("X-Riot-Token", realKey);
	const response = await fetch(request);
	if (!response.ok) {
		throw new Error(
			`Bad Riot API response: ${JSON.stringify(await response.json())}`
		);
	}

	return response;
}
