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
import getTeamsBySeason from "db/getTeamsBySeason";
import { redirect } from "next/navigation";
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
		redirect("/players");
	}

	const session = await auth();
	const isAdmin = session?.user?.isAdministator ?? false;
	const isPlayer = isAdmin || session?.user?.id === player.id;

	const accounts = await getAccountsByPlayer(player);
	const games = await getPlayerGameResultsByPlayer(player);
	const backgroundImageUrl = getBackgroundImageUrl(player);
	const latestSeason = isPlayer ? await getLatestSeason() : void 0;
	const teams = latestSeason ? await getTeamsBySeason(latestSeason) : [];

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
					<div>
						<header>
							<h2>{"Accounts"}</h2>
						</header>
						{accounts.map((account) => (
							<AccountCard key={account.accountId} account={account} />
						))}
						<UpdateAccountsForm player={player} accounts={accounts} />
					</div>
					{isPlayer && (
						<PlayerPanel
							player={player}
							accounts={accounts}
							latestSeason={latestSeason}
							className="hide-on-mobile"
						/>
					)}
					{isAdmin && (
						<AdminPanel
							player={player}
							teams={teams}
							className="hide-on-mobile"
						/>
					)}
				</div>
				<div>
					<div>
						<header>
							<h2>{"Game History"}</h2>
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
