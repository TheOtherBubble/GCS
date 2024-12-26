import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import { getGameBySlug } from "db/getGameById";

/**
 * Parameters that are passed to a game page.
 * @public
 */
export interface GamesPageParams {
	/** The match's ID (stringified). */
	slug: string;
}

/**
 * A page that displays information about a game.
 * @param props - The properties that are passed to the page.
 * @returns The game page.
 * @public
 */
export default async function Page(props: PageProps<GamesPageParams>) {
	const { slug } = await props.params;
	const game = await getGameBySlug(slug);
	if (!game) {
		return <p>{"Unknown game."}</p>;
	}

	// TODO
	return <p>{"Coming soon..."}</p>;
}

/**
 * The game page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = (): Metadata => {
	// TODO
	return {};
};
