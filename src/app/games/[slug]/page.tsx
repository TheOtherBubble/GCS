import AdminPanel from "./AdminPanel";
import type { JSX } from "react";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import { auth } from "db/auth";
import getAccountsByTeams from "db/getAccountsByTeams";
import getGameBySlug from "util/getGameBySlug";
import getGameUrl from "util/getGameUrl";
import getMatches from "db/getMatches";
import getTeams from "db/getTeams";
import isPlayerOnTeams from "db/isPlayerOnTeams";
import style from "./page.module.scss";

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

	let adminPanel: JSX.Element | undefined = void 0;
	if (session?.user?.isAdministator) {
		const teams = match && (await getTeams(match.blueTeamId, match.redTeamId));
		const blueTeam = teams?.find(({ id }) => id === match?.blueTeamId);
		const redTeam = teams?.find(({ id }) => id === match?.redTeamId);
		const accounts =
			match && (await getAccountsByTeams(match.blueTeamId, match.redTeamId));
		const blueAccounts = accounts
			?.filter(({ teamPlayer: { teamId } }) => teamId === match?.blueTeamId)
			.map(({ account }) => account);
		const redAccounts = accounts
			?.filter(({ teamPlayer: { teamId } }) => teamId === match?.redTeamId)
			.map(({ account }) => account);

		adminPanel = (
			<AdminPanel
				game={game}
				blueTeam={blueTeam}
				blueAccounts={blueAccounts}
				redTeam={redTeam}
				redAccounts={redAccounts}
				style={{ maxWidth: 512 }} // Temporary until the page gets an actual format.
			/>
		);
	}

	return (
		<div className={style["content"]}>
			<p>{"Coming soon..."}</p>
			{canViewTournamentCode && <p>{"You belong to a team in this match."}</p>}
			{adminPanel}
		</div>
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
		openGraph: { url: getGameUrl(slug) },
		title: `Game #${slug}`
	} satisfies Metadata;
};
