import {
	accountTable,
	gameResultTable,
	gameTable,
	matchTable,
	playerGameResultTable,
	playerTable,
	seasonTable,
	teamGameResultTable,
	teamPlayerTable,
	teamTable
} from "db/schema";
import { and, eq, or } from "drizzle-orm";
import AdminPanel from "./AdminPanel";
import CaptainPanel from "./CaptainPanel";
import type { JSX } from "react";
import Link from "components/Link";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import TournamentCode from "components/TournamentCode";
import { auth } from "db/auth";
import db from "db/db";
import getGameUrl from "util/getGameUrl";
import getMatchUrl from "util/getMatchUrl";
import leftHierarchy from "util/leftHierarchy";
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

	const teams = match
		? await db
				.select()
				.from(teamTable)
				.where(
					or(
						eq(teamTable.id, match.blueTeamId),
						or(eq(teamTable.id, match.redTeamId))
					)
				)
		: [];
	const blueTeam = teams.find(({ id }) => id === match?.blueTeamId);
	const redTeam = teams.find(({ id }) => id === match?.redTeamId);

	// The tournament code is visible if the viewer is logged in and either the user is an administrator, the game isn't associated with a match, or the viewer is on a team in the associated match.
	const session = await auth();
	const canViewTournamentCode =
		session?.user &&
		(session.user.isAdmin ||
			!match ||
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

	let captainPanel: JSX.Element | undefined = void 0;
	if (session?.user) {
		const accounts =
			blueTeam && redTeam
				? await db
						.select()
						.from(teamTable)
						.innerJoin(
							teamPlayerTable,
							eq(teamTable.id, teamPlayerTable.teamId)
						)
						.innerJoin(
							playerTable,
							eq(teamPlayerTable.playerId, playerTable.id)
						)
						.innerJoin(accountTable, eq(playerTable.id, accountTable.playerId))
						.where(
							or(eq(teamTable.id, blueTeam.id), eq(teamTable.id, redTeam.id))
						)
				: [];
		const isBlueCaptain = accounts.some(
			({ teamPlayer: { playerId, isCaptain, teamId } }) =>
				isCaptain &&
				teamId === match?.blueTeamId &&
				playerId === session.user?.id
		);
		const isRedCaptain = accounts.some(
			({ teamPlayer: { playerId, isCaptain, teamId } }) =>
				isCaptain &&
				teamId === match?.redTeamId &&
				playerId === session.user?.id
		);
		const blueAccounts = accounts
			.filter(({ teamPlayer: { teamId } }) => teamId === match?.blueTeamId)
			.map(({ account }) => account);
		const redAccounts = accounts
			.filter(({ teamPlayer: { teamId } }) => teamId === match?.redTeamId)
			.map(({ account }) => account);

		captainPanel =
			session.user.isAdmin || isBlueCaptain || isRedCaptain ? (
				<CaptainPanel
					className={style["panel"]}
					game={game}
					match={match ?? void 0}
					season={season ?? void 0}
					isBlueCaptain={session.user.isAdmin || isBlueCaptain}
					blueTeam={blueTeam}
					blueAccounts={blueAccounts}
					isRedCaptain={session.user.isAdmin || isRedCaptain}
					redTeam={redTeam}
					redAccounts={redAccounts}
				/>
			) : (
				void 0
			);
	}

	const [results] = leftHierarchy(
		await db
			.select()
			.from(gameResultTable)
			.leftJoin(
				teamGameResultTable,
				eq(gameResultTable.id, teamGameResultTable.gameResultId)
			)
			.leftJoin(
				playerGameResultTable,
				and(
					eq(
						teamGameResultTable.gameResultId,
						playerGameResultTable.gameResultId
					),
					eq(teamGameResultTable.team, playerGameResultTable.team)
				)
			)
			.where(eq(gameResultTable.tournamentCode, game.tournamentCode)),
		"gameResult",
		"teamGameResult",
		"playerGameResult"
	);

	if (!results) {
		return (
			<div className={style["content"]}>
				<div />
				<div className={style["main"]}>
					<h1>{`Game #${game.id.toString()}${blueTeam && redTeam ? ` - ${blueTeam.name} vs ${redTeam.name}` : ""}`}</h1>
					{canViewTournamentCode && (
						<TournamentCode tournamentCode={game.tournamentCode} />
					)}
					{match && (
						<p>
							{"Part of "}
							<Link
								href={getMatchUrl(match)}
							>{`match #${match.id.toString()}`}</Link>
							{". This game has not yet concluded."}
						</p>
					)}
					{captainPanel}
					{session?.user?.isAdmin && (
						<AdminPanel className={style["panel"]} game={game} />
					)}
				</div>
				<div />
			</div>
		);
	}

	return (
		<div className={style["content"]}>
			<div />
			<div className={style["main"]}>
				<h1>{`Game #${game.id.toString()}${blueTeam && redTeam ? ` - ${blueTeam.name} vs ${redTeam.name}` : ""}`}</h1>
				{match && (
					<p>
						{"Part of "}
						<Link
							href={getMatchUrl(match)}
						>{`match #${match.id.toString()}`}</Link>
						{". Game result data coming soon..."}
					</p>
				)}
				{session?.user?.isAdmin && captainPanel}
				{session?.user?.isAdmin && (
					<AdminPanel className={style["panel"]} game={game} />
				)}
			</div>
			<div />
		</div>
	);
}

/**
 * The game page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
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
