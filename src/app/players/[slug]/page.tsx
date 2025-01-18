import AccountCard from "components/AccountCard";
import AdminPanel from "./AdminPanel";
import GameCard from "components/GameCard";
import Image from "components/Image";
import Markdown from "react-markdown";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import PlayerPanel from "./PlayerPanel";
import UpdateAccountsForm from "./UpdateAccountsForm";
import { auth } from "db/auth";
import getAccountsByPlayers from "db/getAccountsByPlayers";
import getBackgroundImageUrl from "util/getBackgroundImageUrl";
import getGameResultsByPlayers from "db/getGameResultsByPlayers";
import getLatestSeason from "db/getLatestSeason";
import getPlayerBySlug from "db/getPlayerBySlug";
import getPlayerUrl from "util/getPlayerUrl";
import getPlayerUrlBySlug from "util/getPlayerUrlBySlug";
import getTeamsBySeasons from "db/getTeamsBySeasons";
import { redirect } from "next/navigation";
import style from "./page.module.scss";

/**
 * Parameters that are passed to a player page.
 * @public
 */
export interface PlayersPageParams {
	/** The player's encoded display name or Discord name. */
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
		redirect("/players");
	}

	const session = await auth();
	const isAdmin = session?.user?.isAdministator ?? false;
	const isPlayer = isAdmin || session?.user?.id === player.id;

	const accounts = await getAccountsByPlayers(player.id);
	const games = await getGameResultsByPlayers(player.id);
	const backgroundImageUrl = getBackgroundImageUrl(player);
	const latestSeason = isPlayer ? await getLatestSeason() : void 0;
	const teams = latestSeason ? await getTeamsBySeasons(latestSeason.id) : [];

	return (
		<div className={style["content"]}>
			{backgroundImageUrl && (
				<Image alt="" src={backgroundImageUrl} width={1215} height={717} />
			)}
			<header>
				<h1>{player.displayName ?? player.name}</h1>
				{player.biography && <Markdown>{player.biography}</Markdown>}
			</header>
			<div>
				<div className={style["left"]}>
					<div>
						<header>
							<h2>{"Accounts"}</h2>
						</header>
						<ul>
							{accounts.map((account) => (
								<li key={account.accountId}>
									<AccountCard account={account} />
								</li>
							))}
						</ul>
						<UpdateAccountsForm player={player} accounts={accounts} />
					</div>
					{isPlayer && (
						<PlayerPanel
							player={player}
							accounts={accounts}
							latestSeason={latestSeason}
							className={style["panel"]}
						/>
					)}
					{isAdmin && (
						<AdminPanel
							player={player}
							teams={teams}
							className={style["panel"]}
						/>
					)}
				</div>
				<div>
					<div>
						<header>
							<h2>{"Game History"}</h2>
						</header>
						<ol>
							{games
								.sort(
									(
										{ gameResult: { startTimestamp: a } },
										{ gameResult: { startTimestamp: b } }
									) => b - a // Newest first.
								)
								.map(
									({ game, gameResult, teamGameResult, playerGameResult }) => (
										<li key={game.id}>
											<GameCard
												game={game}
												gameResult={gameResult}
												teamGameResults={[teamGameResult]}
												playerGameResults={[playerGameResult]}
											/>
										</li>
									)
								)}
						</ol>
					</div>
				</div>
			</div>
		</div>
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
					openGraph: {
						images: getBackgroundImageUrl(player),
						url: getPlayerUrl(player)
					},
					title: player.displayName ?? player.name
				}
			: {
					description: "An unknown player in the Gauntlet Championship Series.",
					openGraph: { url: getPlayerUrlBySlug(slug) },
					title: "Unknown Player"
				}
	) satisfies Metadata;
};
