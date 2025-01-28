import {
	accountTable,
	gameTable,
	matchTable,
	playerTable,
	seasonTable,
	teamPlayerTable,
	teamTable
} from "db/schema";
import { and, eq, or } from "drizzle-orm";
import AdminPanel from "./AdminPanel";
import type { JSX } from "react";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import { auth } from "db/auth";
import db from "db/db";
import getGameUrl from "util/getGameUrl";
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
 * @return The game page.
 * @public
 */
export default async function Page(
	props: PageProps<GamesPageParams>
): Promise<JSX.Element> {
	const { slug } = await props.params;
	const [gameRow] = await db
		.select()
		.from(gameTable)
		.leftJoin(matchTable, eq(gameTable.matchId, matchTable.id))
		.leftJoin(seasonTable, eq(matchTable.seasonId, seasonTable.id))
		.where(eq(gameTable.id, parseInt(slug, 10)));
	if (!gameRow) {
		return <p>{"Unknown game."}</p>;
	}

	const { game, match, season } = gameRow;

	// The tournament code is visible if the viewer is logged in and either the game isn't associated with a match or the viewer is on a team in the associated match.
	const session = await auth();
	const canViewTournamentCode =
		session?.user &&
		(!match ||
			(
				await db
					.select()
					.from(teamPlayerTable)
					.where(
						and(
							eq(teamPlayerTable.playerId, session.user.id),
							or(
								eq(teamPlayerTable.teamId, match.blueTeamId),
								eq(teamPlayerTable.teamId, match.redTeamId)
							)
						)
					)
			).length > 0);

	let adminPanel: JSX.Element | undefined = void 0;
	if (session?.user?.isAdministator) {
		const teams =
			match &&
			(await db
				.select()
				.from(teamTable)
				.where(
					or(
						eq(teamTable.id, match.blueTeamId),
						or(eq(teamTable.id, match.redTeamId))
					)
				));
		const blueTeam = teams?.find(({ id }) => id === match?.blueTeamId);
		const redTeam = teams?.find(({ id }) => id === match?.redTeamId);
		const accounts =
			blueTeam &&
			redTeam &&
			(await db
				.select()
				.from(teamTable)
				.innerJoin(teamPlayerTable, eq(teamTable.id, teamPlayerTable.teamId))
				.innerJoin(playerTable, eq(teamPlayerTable.playerId, playerTable.id))
				.innerJoin(accountTable, eq(playerTable.id, accountTable.playerId))
				.where(
					or(eq(teamTable.id, blueTeam.id), eq(teamTable.id, redTeam.id))
				));
		const blueAccounts = accounts
			?.filter(({ teamPlayer: { teamId } }) => teamId === match?.blueTeamId)
			.map(({ account }) => account);
		const redAccounts = accounts
			?.filter(({ teamPlayer: { teamId } }) => teamId === match?.redTeamId)
			.map(({ account }) => account);

		adminPanel = (
			<AdminPanel
				game={game}
				match={match ?? void 0}
				season={season ?? void 0}
				blueTeam={blueTeam}
				blueAccounts={blueAccounts}
				redTeam={redTeam}
				redAccounts={redAccounts}
				style={{ maxWidth: 512 }} // TODO: Temporary until the page gets an actual format.
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
 * @return The metadata.
 * @public
 */
export const generateMetadata = async (
	props: PageProps<GamesPageParams>
): Promise<Metadata> => {
	const { slug } = await props.params;
	return {
		description: `Gauntlet Championship Series game #${slug}`,
		openGraph: { url: getGameUrl({ id: parseInt(slug, 10) }) },
		title: `Game #${slug}`
	};
};
