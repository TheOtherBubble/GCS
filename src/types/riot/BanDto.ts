/**
 * Information about a ban in a match.
 * @public
 */
export default interface BanDto {
	/** The key of the champion that was banned. Referred to as the champion's ID in the Riot API. */
	championId: number;

	/** The order in which this ban occurred. */
	pickTurn: number;
}
