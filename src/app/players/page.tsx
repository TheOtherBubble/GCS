import Link from "components/Link";
import type { Metadata } from "next";
import getAllPlayers from "db/getAllPlayers";
import getPlayerUrl from "util/getPlayerUrl";

/**
 * The players list page.
 * @returns The players list page.
 * @public
 */
export default async function Page() {
	const players = await getAllPlayers();

	return (
		<>
			<h1>{"Players"}</h1>
			<ul>
				{players
					.sort((a, b) =>
						(a.displayName ?? a.name).localeCompare(b.displayName ?? b.name)
					)
					.map((player) => (
						<li key={player.id}>
							<Link href={getPlayerUrl(player)}>
								{player.displayName ?? player.name}
							</Link>
						</li>
					))}
			</ul>
		</>
	);
}

/**
 * The metadata of the players list page.
 * @public
 */
export const metadata = {
	description: "The list of players of the Gauntlet Championship Series.",
	openGraph: { url: "/players" },
	title: "Players"
} satisfies Metadata;
