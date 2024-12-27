import type Region from "./Region";

/**
 * Parameters for creating a Riot Games tournament provider.
 * @public
 */
export default interface ProviderRegistrationParameters {
	/** The region in which the provider will run tournaments. */
	region: Region;

	/** The callback URL to which tournament game results will be posted. */
	url: string;
}
