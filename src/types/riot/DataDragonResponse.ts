/**
 * The value returned from a Data Dragon endpoint.
 * @see {@link https://developer.riotgames.com/docs/lol#data-dragon | Data Dragon}
 * @public
 */
export default interface DataDragonResponse<T> {
	/** The type of data in the response. */
	type: string;

	/** The format of the response. */
	format: string;

	/** The version of Data Dragon. */
	version: string;

	/** The data in the response. */
	data: T;
}
