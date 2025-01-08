import getPlayerUrl, { getPlayerUrlBySlug } from "util/getPlayerUrl";
import AccountCard from "components/AccountCard";
import AdminPanel from "./AdminPanel";
import GameCard from "components/GameCard";
import Image from "components/Image";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import PlayerPanel from "./PlayerPanel";
import UpdateAccountsForm from "./UpdateAccountsForm";
import { auth } from "db/auth";
import getAccountsByPlayer from "db/getAccountsByPlayer";
import getBackgroundImageUrl from "util/getBackgroundImageUrl";
import getLatestSeason from "db/getLatestSeason";
import getPlayerBySlug from "db/getPlayerBySlug";
import getPlayerGameResultsByPlayer from "db/getPlayerGameResultsByPlayer";
import multiclass from "util/multiclass";
import style from "./page.module.scss";

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

	const session = await auth();
	const accounts = await getAccountsByPlayer(player);
	const games = await getPlayerGameResultsByPlayer(player);
	const backgroundImageUrl = getBackgroundImageUrl(player);
	const latestSeason = await getLatestSeason();

	return (
		<div className={style["content"]}>
			{backgroundImageUrl && (
				<Image alt="" src={backgroundImageUrl} width={1215} height={717} />
			)}
			<header>
				<h1>{player.displayName ?? player.name}</h1>
				{player.biography && <p>{player.biography}</p>}
			</header>
			<div>
				<div>
					<header>
						<h2>{"Accounts"}</h2>
					</header>
					{accounts.map((account) => (
						<AccountCard key={account.accountId} account={account} />
					))}
					<UpdateAccountsForm player={player} accounts={accounts} />
				</div>
				<div>
					<header>
						<h2>{"Match History"}</h2>
					</header>
					{games.map(
						({ game, gameResult, teamGameResult, playerGameResult }) => (
							<GameCard
								key={game.id}
								game={game}
								gameResult={gameResult}
								teamGameResults={[teamGameResult]}
								playerGameResults={[playerGameResult]}
							/>
						)
					)}
				</div>
				{/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
				{(session?.user?.isAdministator || session?.user?.id === player.id) && (
					<PlayerPanel
						player={player}
						accounts={accounts}
						latestSeason={latestSeason}
						className={multiclass("hide-on-mobile", style["panel"])}
					/>
				)}
				{session?.user?.isAdministator && (
					<AdminPanel
						player={player}
						latestSeason={latestSeason}
						className={multiclass("hide-on-mobile", style["panel"])}
					/>
				)}
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
