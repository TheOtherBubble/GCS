/**
 * A variable that goes in a template string in Data Dragon.
 * @public
 */
export default interface DataDragonTemplateVariable {
	/** The type of value that the variable is linked to. */
	link: string;

	/** The variable's coefficient. */
	coeff: number;

	/** The variable's key/name. */
	key: string;
}
