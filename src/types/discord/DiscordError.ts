/**
 * A Discord API error response.
 * @public
 */
export default interface DiscordError {
	/** The error message. */
	message: string;

	/** The error code. */
	code: number;
}
