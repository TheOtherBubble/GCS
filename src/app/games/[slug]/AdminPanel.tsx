import type { Account } from "types/db/Account";
import type { Game } from "types/db/Game";
import ImportResultsForm from "./admin/ImportResultsForm";
import { type JSX } from "react";
import type { Team } from "types/db/Team";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export interface AdminPanelProps
	extends Omit<JSX.IntrinsicElements["div"], "children"> {
	/** The game to import results for. */
	game: Game;

	/** The blue team in the game's match. */
	blueTeam?: Team | undefined;

	/** The accounts of the players on the blue team in the game's match. */
	blueAccounts?: Account[] | undefined;

	/** The red team in the game's match. */
	redTeam?: Team | undefined;

	/** The accounts of the players on the red team in the game's match. */
	redAccounts?: Account[] | undefined;
}

/**
 * A game page admin panel.
 * @param props - Properties to pass to the panel.
 * @returns The panel.
 * @public
 */
export default function AdminPanel({
	game,
	blueTeam,
	blueAccounts,
	redTeam,
	redAccounts,
	...props
}: AdminPanelProps) {
	return (
		<div {...props}>
			<header>
				<h2>{"Admin Panel"}</h2>
			</header>
			{blueTeam && blueAccounts && redTeam && redAccounts && (
				<ImportResultsForm
					game={game}
					blueTeam={blueTeam}
					blueAccounts={blueAccounts}
					redTeam={redTeam}
					redAccounts={redAccounts}
				/>
			)}
		</div>
	);
}
