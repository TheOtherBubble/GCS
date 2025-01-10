import type { Account } from "types/db/Account";
import AddAccountForm from "./player/AddAccountForm";
import { type JSX } from "react";
import type { Player } from "types/db/Player";
import type { Season } from "types/db/Season";
import SignUpForm from "./player/SignUpForm";
import UpdatePlayerForm from "./player/UpdatePlayerForm";
import UpdateSkinForm from "./player/UpdateSkinForm";
import isDraftPlayerForSeasons from "db/isDraftPlayerForSeasons";

/**
 * Properties that can be passed to a player panel.
 * @public
 */
export interface PlayerPanelProps
	extends Omit<JSX.IntrinsicElements["div"], "children"> {
	/** The player to modify. */
	player: Player;

	/** The player's accounts. */
	accounts: Account[];

	/** The latest season. */
	latestSeason?: Season | undefined;
}

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
			{latestSeason &&
				!(await isDraftPlayerForSeasons(player.id, latestSeason.id)) && (
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
