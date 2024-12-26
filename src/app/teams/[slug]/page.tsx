import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import TeamCard from "components/TeamCard";
import getSeasonById from "db/getSeasonById";
import getTeamByEncodedSlug from "db/getTeamByEncodedSlug";

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
 * @public
 */
export default async function Page(props: PageProps<TeamsPageParams>) {
	const { slug } = await props.params;
	const team = await getTeamByEncodedSlug(slug);
	if (!team) {
		return <p>{"Unknown team."}</p>;
	}

	// TODO: Join.
	const season = await getSeasonById(team.seasonId);

	// TODO
	return <TeamCard team={team} season={season} />;
}

/**
 * The team page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = (): Metadata => {
	// TODO
	return {};
};
