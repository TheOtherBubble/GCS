import getPlayerUrl, { getPlayerUrlBySlug } from "util/getPlayerUrl";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import PlayerCard from "components/PlayerCard";
import getAccountsByPlayer from "db/getAccountsByPlayer";
import getPlayerBySlug from "db/getPlayerBySlug";
import getPlayerGameResultsByPlayer from "db/getPlayerGameResultsByPlayer";
import getTeamsByPlayer from "db/getTeamsByPlayer";

/**
 * Parameters that are passed to a player page.
 * @public
 */
export interface PlayersPageParams {
	/** The player's encoded display name or Discord name or ID. */
	slug: string;
}

/**
 * A page that displays information about a player.
 * @param props - The properties that are passed to the page.
 * @returns The player page.
 * @public
 */
export default async function Page(props: PageProps<PlayersPageParams>) {
	const { slug } = await props.params;
	const player = await getPlayerBySlug(slug);
	if (!player) {
		return <p>{"Unknown player."}</p>;
	}

	const accounts = await getAccountsByPlayer(player);
	const games = await getPlayerGameResultsByPlayer(player);
	const teams = await getTeamsByPlayer(player);

	return (
		<PlayerCard
			player={player}
			accounts={accounts}
			games={games.map((game) => game.playerGameResult)}
			teams={teams}
		/>
	);
}

/**
 * The player page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = async (props: PageProps<PlayersPageParams>) => {
	const { slug } = await props.params;
	const player = await getPlayerBySlug(slug);
	return (
		player
			? {
					description: `Gauntlet Championship Series player "${player.displayName ?? player.name}."`,
					openGraph: { url: getPlayerUrl(player) },
					title: player.displayName ?? player.name
				}
			: {
					description: "An unknown player in the Gauntlet Championship Series.",
					openGraph: { url: getPlayerUrlBySlug(slug) },
					title: "Unknown Player"
				}
	) satisfies Metadata;
};
