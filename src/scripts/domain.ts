/**
 * Equivalent to `window.location.origin`, but it can be used on both the server and the client.
 * @public
 */
export default process.env["VERCEL_ENV"] === "development" ||
process.env.NODE_ENV === "development"
	? `http://localhost:${process.env["PORT"] ?? "3000"}`
	: "https://vln.lakuna.pw"; // TODO: Update once domain is set up.
