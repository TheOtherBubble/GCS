import isDev from "./isDev";

/**
 * Equivalent to `window.location.origin`, but it can be used on both the server and the client.
 * @public
 */
export default isDev
	? `http://localhost:${process.env["PORT"] ?? "3000"}/`
	: "https://www.gcsleague.com/";
