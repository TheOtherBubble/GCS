import getPlayerUrl, { getPlayerUrlBySlug } from "util/getPlayerUrl";
import AccountCard from "components/AccountCard";
import AddAccountForm from "./AddAccountForm";
import ForceVerifyAccountsForm from "./ForceVerifyAccountsForm";
import GameCard from "components/GameCard";
import Image from "components/Image";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import UpdateAccountsForm from "./UpdateAccountsForm";
import UpdatePlayerForm from "./UpdatePlayerForm";
import UpdateSkinForm from "./UpdateSkinForm";
import { auth } from "db/auth";
import getAccountsByPlayer from "db/getAccountsByPlayer";
import getBackgroundImageUrl from "util/getBackgroundImageUrl";
import getPlayerBySlug from "db/getPlayerBySlug";
import getPlayerGameResultsByPlayer from "db/getPlayerGameResultsByPlayer";
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

	// Some elements only show to the player who owns the page or to administrators.
	const session = await auth();
	const isOwner =
		session?.user &&
		(session.user.isAdministator || session.user.id === player.id);

	const accounts = await getAccountsByPlayer(player);
	const games = await getPlayerGameResultsByPlayer(player);
	const backgroundImageUrl = getBackgroundImageUrl(player);

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
					<UpdateAccountsForm player={player} />
					{isOwner && (
						<>
							<AddAccountForm player={player} />
							<UpdatePlayerForm player={player} />
							{player.backgroundChampionId && (
								<UpdateSkinForm
									player={player}
									backgroundChampionId={player.backgroundChampionId}
								/>
							)}
						</>
					)}
					{session?.user?.isAdministator && (
						<ForceVerifyAccountsForm player={player} />
					)}
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
