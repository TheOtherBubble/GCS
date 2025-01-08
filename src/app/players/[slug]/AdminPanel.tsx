import AddToTeamForm from "./admin/AddToTeamForm";
import BanPlayerForm from "./admin/BanPlayerForm";
import ForceVerifyAccountsForm from "./player/ForceVerifyAccountsForm";
import { type JSX } from "react";
import MakeAdminForm from "./admin/MakeAdminForm";
import type { Player } from "types/db/Player";
import type { Season } from "types/db/Season";
import getTeamsBySeason from "db/getTeamsBySeason";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export type AdminPanelProps = Omit<JSX.IntrinsicElements["div"], "children"> & {
	/** The player to modify. */
	player: Player;

	/** The latest season. */
	latestSeason?: Season | undefined;
};

/**
 * A player page admin panel.
 * @param props - Properties to pass to the panel.
 * @returns The panel.
 * @public
 */
export default async function AdminPanel({
	player,
	latestSeason,
	...props
}: AdminPanelProps) {
	return (
		<div {...props}>
			<header>
				<h2>{"Admin Panel"}</h2>
			</header>
			<ForceVerifyAccountsForm player={player} className="hide-on-mobile" />
			{latestSeason && (
				<AddToTeamForm
					player={player}
					teams={await getTeamsBySeason(latestSeason.id)}
				/>
			)}
			<BanPlayerForm player={player} className="hide-on-mobile" />
			{!player.isAdministator && (
				<MakeAdminForm player={player} className="hide-on-mobile" />
			)}
		</div>
	);
}
