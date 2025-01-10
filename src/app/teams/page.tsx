import Link from "components/Link";
import type { Metadata } from "next";
import getAllTeams from "db/getAllTeams";
import getTeamUrl from "util/getTeamUrl";

/**
 * The teams list page.
 * @returns The teams list page.
 * @public
 */
export default async function Page() {
	const teams = await getAllTeams();

	return (
		<>
			<h1>{"Teams"}</h1>
			<ul>
				{teams
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((team) => (
						<li key={team.id}>
							<Link href={getTeamUrl(encodeURIComponent(team.vanityUrlSlug))}>
								{team.name}
							</Link>
						</li>
					))}
			</ul>
		</>
	);
}

/**
 * The metadata of the teams list page.
 * @public
 */
export const metadata = {
	description: "The list of teams of the Gauntlet Championship Series.",
	openGraph: { url: "/teams" },
	title: "Teams"
} satisfies Metadata;
