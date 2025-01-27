import type { JSX } from "react";
import Link from "components/Link";
import type { Metadata } from "next";
import db from "db/db";
import getTeamUrl from "util/getTeamUrl";
import { teamTable } from "db/schema";

/**
 * The teams list page.
 * @return The teams list page.
 * @public
 */
export default async function Page(): Promise<JSX.Element> {
	const teams = await db.select().from(teamTable);
	const collator = new Intl.Collator();

	return (
		<>
			<h1>{"Teams"}</h1>
			<ol>
				{teams
					.sort(({ name: a }, { name: b }) => collator.compare(a, b))
					.map((team) => (
						<li key={team.id}>
							<Link href={getTeamUrl(team)}>{team.name}</Link>
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
