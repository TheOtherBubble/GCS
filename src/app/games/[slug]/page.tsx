import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import getGameBySlug from "util/getGameBySlug";
import getGameUrl from "util/getGameUrl";

/**
 * Parameters that are passed to a game page.
 * @public
 */
export interface GamesPageParams {
	/** The match's ID (stringified). */
	slug: `${number}`;
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

	/*
	// TODO
	const [match] = game.matchId ? await getMatches(game.matchId) : [];

	// The tournament code is visible if the viewer is logged in and either the game isn't associated with a match or the viewer is on a team in the associated match.
	const session = await auth();
	const canViewTournamentCode =
		session?.user &&
		(!match ||
			(await isPlayerOnTeams(
				session.user.id,
				match.blueTeamId,
				match.redTeamId
			)));
	*/

	return <p>{"Coming soon..."}</p>;
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
		openGraph: { url: getGameUrl(slug) },
		title: `Game #${slug}`
	} satisfies Metadata;
};
