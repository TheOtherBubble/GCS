import type { Account } from "types/db/Account";
import AddAccountForm from "./player/AddAccountForm";
import { type JSX } from "react";
import type { Player } from "types/db/Player";
import type { Season } from "types/db/Season";
import SignUpForm from "./player/SignUpForm";
import UpdatePlayerForm from "./player/UpdatePlayerForm";
import UpdateSkinForm from "./player/UpdateSkinForm";
import isDraftPlayerForSeason from "db/isDraftPlayerForSeason";

/**
 * Properties that can be passed to a player panel.
 * @public
 */
export type PlayerPanelProps = Omit<
	JSX.IntrinsicElements["div"],
	"children"
> & {
	/** The player to modify. */
	player: Player;

	/** The player's accounts. */
	accounts: Account[];

	/** The latest season. */
	latestSeason?: Season | undefined;
};

/**
 * A player page player panel.
 * @param props - Properties to pass to the panel.
 * @returns The panel.
 * @public
 */
export default async function PlayerPanel({
	player,
	accounts,
	latestSeason,
	...props
}: PlayerPanelProps) {
	const isDraftPlayerForLatestSeason = latestSeason
		? await isDraftPlayerForSeason(player, latestSeason)
		: false;

	return (
		<div {...props}>
			<header>
				<h2>{"Player Panel"}</h2>
			</header>
			<AddAccountForm
				player={player}
				accounts={accounts}
				className="hide-on-mobile"
			/>
			<UpdatePlayerForm player={player} className="hide-on-mobile" />
			{player.backgroundChampionId && (
				<UpdateSkinForm
					player={player}
					backgroundChampionId={player.backgroundChampionId}
					className="hide-on-mobile"
				/>
			)}
			{!isDraftPlayerForLatestSeason && latestSeason && (
				<SignUpForm
					player={player}
					season={latestSeason}
					accounts={accounts}
					className="hide-on-mobile"
				/>
			)}
		</div>
	);
}
