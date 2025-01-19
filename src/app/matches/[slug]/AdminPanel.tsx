import CreateGameForm from "./admin/CreateGameForm";
import { type JSX } from "react";
import type { Match } from "types/db/Match";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export interface AdminPanelProps
	extends Omit<JSX.IntrinsicElements["div"], "children"> {
	/** The current match. */
	match: Match;
}

/**
 * A match page admin panel.
 * @param props - Properties to pass to the panel.
 * @returns The panel.
 * @public
 */
export default function AdminPanel({ match, ...props }: AdminPanelProps) {
	return (
		<div {...props}>
			<header>
				<h2>{"Admin Panel"}</h2>
			</header>
			<CreateGameForm match={match} />
		</div>
	);
}
