import type { Metadata } from "next";

/**
 * Parameters that are passed to a game page.
 * @public
 */
export interface GamesPageParams {
	/** The match's ID. */
	id: string;
}

/**
 * A page that displays information about a game.
 * @param props - The properties that are passed to the page.
 * @returns The game page.
 */
export default function Page() {
	// TODO
	return <p>{"Coming soon..."}</p>;
}

/**
 * The game page's metadata.
 * @public
 */
export const generateMetadata = (): Metadata => {
	// TODO
	return {};
};
