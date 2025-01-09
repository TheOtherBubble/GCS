import { type JSX } from "react";
import type { Team } from "types/db/Team";
import UpdateTeamForm from "./admin/UpdateTeamForm";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export interface AdminPanelProps
	extends Omit<JSX.IntrinsicElements["div"], "children"> {
	/** The team to modify. */
	team: Team;
}

/**
 * A team page admin panel.
 * @param props - Properties to pass to the panel.
 * @returns The panel.
 * @public
 */
export default function AdminPanel({ team, ...props }: AdminPanelProps) {
	return (
		<div {...props}>
			<header>
				<h2>{"Admin Panel"}</h2>
			</header>
			<UpdateTeamForm team={team} />
		</div>
	);
}
