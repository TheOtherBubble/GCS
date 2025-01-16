import AddPlayerForm from "./admin/AddPlayerForm";
import { type JSX } from "react";
import type { Player } from "types/db/Player";
import type { Team } from "types/db/Team";
import type { TeamPlayer } from "types/db/TeamPlayer";
import UpdateTeamForm from "./admin/UpdateTeamForm";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export interface AdminPanelProps
	extends Omit<JSX.IntrinsicElements["div"], "children"> {
	/** The team to modify. */
	team: Team;

	/** The players on the team. */
	teamPlayers: TeamPlayer[];

	/** The players that may be added to the team. */
	players: Player[];
}

/**
 * A team page admin panel.
 * @param props - Properties to pass to the panel.
 * @returns The panel.
 * @public
 */
export default function AdminPanel({
	team,
	teamPlayers,
	players,
	...props
}: AdminPanelProps) {
	return (
		<div {...props}>
			<header>
				<h2>{"Admin Panel"}</h2>
			</header>
			<UpdateTeamForm team={team} />
			<AddPlayerForm team={team} teamPlayers={teamPlayers} players={players} />
		</div>
	);
}
