import getTeamUrl, { getTeamUrlByEncodedSlug } from "util/getTeamUrl";
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

	const season = await getSeasonById(team.seasonId);

	return <TeamCard team={team} season={season} />;
}

/**
 * The team page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = async (props: PageProps<TeamsPageParams>) => {
	const { slug } = await props.params;
	const team = await getTeamByEncodedSlug(slug);
	return (
		team
			? {
					description: `Gauntlet Championship Series team "${team.name}."`,
					openGraph: { url: getTeamUrl(team) },
					title: team.name
				}
			: {
					description: "An unknown team in the Gauntlet Championship Series.",
					openGraph: { url: getTeamUrlByEncodedSlug(slug) },
					title: "Unknown Team"
				}
	) satisfies Metadata;
};
