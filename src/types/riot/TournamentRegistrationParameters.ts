/**
 * Parameters for creating a Riot Games tournament.
 * @public
 */
export default interface TournamentRegistrationParameters {
	/** The name of the tournament. */
	name?: string;

	/** The ID of the tournament provider. */
	providerId: number;
}
