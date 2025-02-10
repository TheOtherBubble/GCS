import {
	accountTable,
	gameResultTable,
	gameTable,
	playerGameResultTable,
	playerTable
} from "db/schema";
import type { JSX } from "react";
import Link from "components/Link";
import type { Metadata } from "next";
import db from "db/db";
import { eq } from "drizzle-orm";
import getGameUrl from "util/getGameUrl";
import getPlayerUrl from "util/getPlayerUrl";
import leftHierarchy from "util/leftHierarchy";
import style from "./page.module.scss";

/**
 * The leaderboards page.
 * @returns The leaderboards page.
 * @public
 */
export default async function Page(): Promise<JSX.Element> {
	const rows = await db
		.select()
		.from(gameTable)
		.innerJoin(
			gameResultTable,
			eq(gameTable.tournamentCode, gameResultTable.tournamentCode)
		)
		.innerJoin(
			playerGameResultTable,
			eq(gameResultTable.id, playerGameResultTable.gameResultId)
		)
		.innerJoin(
			accountTable,
			eq(playerGameResultTable.puuid, accountTable.puuid)
		)
		.innerJoin(playerTable, eq(accountTable.playerId, playerTable.id));
	const resultsByPlayer = leftHierarchy(rows, "player", "playerGameResult");

	return (
		<>
			<header>
				<h1>{"Leaderboards"}</h1>
				<hr />
			</header>
			<div className={style["leaderboards"]}>
				<div>
					<header>
						<h2>{"KDA Ratio"}</h2>
					</header>
					<ol>
						{resultsByPlayer
							.map(({ value: player, children: results }) => ({
								assists: results.reduce(
									(total, { assists }) => total + assists,
									0
								),
								deaths: results.reduce(
									(total, { deaths }) => total + deaths,
									0
								),
								kills: results.reduce((total, { kills }) => total + kills, 0),
								player
							}))
							.sort(
								(a, b) =>
									(b.kills + b.assists) / b.deaths -
									(a.kills + a.assists) / a.deaths
							)
							.slice(0, 10)
							.map(({ assists, deaths, kills, player }) => (
								<li key={player.id}>
									<Link href={getPlayerUrl(player)}>
										{player.displayName ?? player.name}
									</Link>
									{` - ${((kills + assists) / deaths).toFixed(2)}`}
								</li>
							))}
					</ol>
				</div>
				<div>
					<header>
						<h2>{"Average Champion Damage"}</h2>
					</header>
					<ol>
						{resultsByPlayer
							.map(({ value: player, children: results }) => ({
								damage: results.reduce(
									(total, { championDamage }) => total + championDamage,
									0
								),
								games: results.length,
								player
							}))
							.sort(({ damage: a }, { damage: b }) => b - a)
							.slice(0, 10)
							.map(({ damage, games, player }) => (
								<li key={player.id}>
									<Link href={getPlayerUrl(player)}>
										{player.displayName ?? player.name}
									</Link>
									{` - ${Math.floor(damage / games).toLocaleString()}`}
								</li>
							))}
					</ol>
				</div>
				<div>
					<header>
						<h2>{"Champion Damage (Single Game)"}</h2>
					</header>
					<ol>
						{rows
							.sort(
								(
									{ playerGameResult: { championDamage: a } },
									{ playerGameResult: { championDamage: b } }
								) => b - a
							)
							.slice(0, 10)
							.map(({ game, player, playerGameResult }) => (
								<li key={playerGameResult.id}>
									<Link href={getPlayerUrl(player)}>
										{player.displayName ?? player.name}
									</Link>
									{` - ${playerGameResult.championDamage.toLocaleString()} - `}
									<Link
										href={getGameUrl(game)}
									>{`Game #${game.id.toString()}`}</Link>
								</li>
							))}
					</ol>
				</div>
			</div>
		</>
	);
}

/**
 * The metadata of the leaderboards page.
 * @public
 */
export const metadata = {
	description:
		"All-time statistic leaderboards for the Gauntlet Championship Series.",
	openGraph: { url: "/leaderboards" },
	title: "Leaderboards"
} satisfies Metadata;
