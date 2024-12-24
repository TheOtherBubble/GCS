import type { Metadata } from "next";

/**
 * Parameters that are passed to a match page.
 * @public
 */
export interface MatchesPageParams {
	/** The match's ID. */
	id: string;
}

/**
 * A page that displays information about a match.
 * @param props - The properties that are passed to the page.
 * @returns The match page.
 * @public
 */
export default function Page() {
	// TODO
	return <p>{"Coming soon..."}</p>;
}

/**
 * The match page's metadata.
 * @public
 */
export const generateMetadata = (): Metadata => {
	// TODO
	return {};
};
