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
	const collator = new Intl.Collator();

	return (
		<>
			<h1>{"Teams"}</h1>
			<ol>
				{teams
					.sort(({ name: a }, { name: b }) => collator.compare(a, b))
					.map((team) => (
						<li key={team.id}>
							<Link href={getTeamUrl(encodeURIComponent(team.vanityUrlSlug))}>
								{team.name}
							</Link>
						</li>
					))}
			</ol>
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
