import type { Metadata } from "next";

/**
 * Parameters that are passed to a player page.
 * @public
 */
export interface PlayersPageParams {
	/** The player's encoded name. */
	name: string;
}

/**
 * A page that displays information about a player.
 * @param props - The properties that are passed to the page.
 * @returns The player page.
 */
export default function Page() {
	// TODO
	return <p>{"Coming soon..."}</p>;
}

/**
 * The player page's metadata.
 * @public
 */
export const generateMetadata = (): Metadata => {
	// TODO
	return {};
};
