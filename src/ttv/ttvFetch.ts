import "util/env";
import getToken from "./getToken";

/**
 * Makes a request to a Twitch API endpoint. Automatically applies the Twitch API key to the `Authorization` header and the Twitch client ID to the `Client-Id` header.
 * @param input - The request input.
 * @param init - The request initialization data.
 * @param id - The Twitch client ID to use, or `undefined` to automatically use `process.env.TWITCH_CLIENT_ID`.
 * @param secret - The Twitch client secret to use, or `undefined` to automatically use `process.env.TWITCH_CLIENT_SECRET`.
 * @returns The response.
 * @throws `Error` if the response has a bad status or if the Twitch client ID or secret is missing.
 * @public
 */
export default async function ttvFetch(
	input: Request | RequestInfo | URL,
	init?: RequestInit,
	id?: string,
	secret?: string
): Promise<Response> {
	const realId = id ?? process.env["TWITCH_CLIENT_ID"];
	const realSecret = secret ?? process.env["TWITCH_CLIENT_SECRET"];
	if (!realId || !realSecret) {
		throw new Error("Missing Twitch client ID or secret.");
	}

	const token = await getToken(id, secret);
	const request = new Request(input, init);
	request.headers.set("Authorization", `Bearer ${token.access_token}`);
	request.headers.set("Client-Id", realId);
	const response = await fetch(request);
	if (!response.ok) {
		throw new Error(
			`Bad Twitch API response: ${JSON.stringify(await response.json())}`
		);
	}

	return response;
}
