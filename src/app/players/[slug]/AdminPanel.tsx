import AddToTeamForm from "./admin/AddToTeamForm";
import BanPlayerForm from "./admin/BanPlayerForm";
import ForceVerifyAccountsForm from "./player/ForceVerifyAccountsForm";
import { type JSX } from "react";
import MakeAdminForm from "./admin/MakeAdminForm";
import type { Player } from "types/db/Player";
import type { Team } from "types/db/Team";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export interface AdminPanelProps
	extends Omit<JSX.IntrinsicElements["div"], "children"> {
	/** The player to modify. */
	player: Player;

	/** The teams that the player may join. */
	teams?: Team[];
}

/**
 * A player page admin panel.
 * @param props - Properties to pass to the panel.
 * @returns The panel.
 * @public
 */
export default function AdminPanel({
	player,
	teams,
	...props
}: AdminPanelProps) {
	return (
		<div {...props}>
			<header>
				<h2>{"Admin Panel"}</h2>
			</header>
			<ForceVerifyAccountsForm player={player} />
			{teams && <AddToTeamForm player={player} teams={teams} />}
			<BanPlayerForm player={player} />
			{!player.isAdministator && <MakeAdminForm player={player} />}
		</div>
	);
}
