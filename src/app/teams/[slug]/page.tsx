import type { Metadata } from "next";

/**
 * Parameters that are passed to a team page.
 * @public
 */
export interface TeamsPageParams {
	/** The team's encoded vanity URL slug. */
	slug: string;
}

/**
 * A page that displays information about a team.
 * @param props - The properties that are passed to the page.
 * @returns The team page.
 */
export default function Page() {
	// TODO
	return <p>{"Coming soon..."}</p>;
}

/**
 * The team page's metadata.
 * @public
 */
export const generateMetadata = (): Metadata => {
	// TODO
	return {};
};
