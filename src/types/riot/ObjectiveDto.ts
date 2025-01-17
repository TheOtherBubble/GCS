/**
 * Information about a class of objectives in a match.
 * @public
 */
export default interface ObjectiveDto {
	/** Whether or not this team got the first of this class of objective in this match. */
	first: boolean;

	/** The number of times that this team killed this class of objective in this match. */
	kills: number;
}
