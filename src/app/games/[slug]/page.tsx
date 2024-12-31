import CopyToClipboardButton from "components/CopyToClipboardButton";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import { auth } from "db/auth";
import { getGameBySlug } from "db/getGameById";
import { getGameUrlBySlug } from "util/getGameUrl";
import getMatchById from "db/getMatchById";
import getTeamPlayersByPlayer from "db/getTeamPlayersByPlayer";

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

	const match = game.matchId ? await getMatchById(game.matchId) : void 0;

	// The tournament code is visible if the viewer is logged in and either the game isn't associated with a match or the viewer is on a team in the associated match.
	const session = await auth();
	const canViewTournamentCode =
		session?.user &&
		(!match ||
			(await getTeamPlayersByPlayer(session.user)).some(
				(playerTeam) =>
					playerTeam.teamId === match.blueTeamId ||
					playerTeam.teamId === match.redTeamId
			));

	return canViewTournamentCode ? (
		<CopyToClipboardButton text={game.tournamentCode}>
			{"Copy tournament code to clipboard."}
		</CopyToClipboardButton>
	) : (
		<p>{"Coming soon..."}</p>
	);
}

/**
 * The game page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = async (props: PageProps<GamesPageParams>) => {
	const { slug } = await props.params;
	return {
		description: `Gauntlet Championship Series game #${slug}`,
		openGraph: { url: getGameUrlBySlug(slug) },
		title: `Game #${slug}`
	} satisfies Metadata;
};
