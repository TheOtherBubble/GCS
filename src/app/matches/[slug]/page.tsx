import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import { getMatchBySlug } from "db/getMatchById";

/**
 * Parameters that are passed to a match page.
 * @public
 */
export interface MatchesPageParams {
	/** The match's ID (stringified). */
	slug: string;
}

/**
 * A page that displays information about a match.
 * @param props - The properties that are passed to the page.
 * @returns The match page.
 * @public
 */
export default async function Page(props: PageProps<MatchesPageParams>) {
	const { slug } = await props.params;
	const match = await getMatchBySlug(slug);
	if (!match) {
		return <p>{"Unknown match."}</p>;
	}

	// TODO
	return <p>{"Coming soon..."}</p>;
}

/**
 * The match page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = (): Metadata => {
	// TODO
	return {};
};
