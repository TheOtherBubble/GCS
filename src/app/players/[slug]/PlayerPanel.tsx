import {
	type accountTable,
	draftPlayerTable,
	type playerTable,
	type seasonTable
} from "db/schema";
import { and, eq } from "drizzle-orm";
import AddAccountForm from "./player/AddAccountForm";
import { type JSX } from "react";
import SignUpForm from "./player/SignUpForm";
import UpdatePlayerForm from "./player/UpdatePlayerForm";
import UpdateSkinForm from "./player/UpdateSkinForm";
import db from "db/db";

/**
 * Properties that can be passed to a player panel.
 * @public
 */
export interface PlayerPanelProps
	extends Omit<JSX.IntrinsicElements["div"], "children"> {
	/** The player to modify. */
	player: typeof playerTable.$inferSelect;

	/** The player's accounts. */
	accounts: (typeof accountTable.$inferSelect)[];

	/** The latest season. */
	latestSeason?: typeof seasonTable.$inferSelect | undefined;
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
}: PlayerPanelProps): Promise<JSX.Element> {
	return (
		<div {...props}>
			<header>
				<h2>{"Player Panel"}</h2>
			</header>
			<AddAccountForm player={player} accounts={accounts} />
			<UpdatePlayerForm player={player} />
			{player.backgroundChampionId && (
				<UpdateSkinForm
					player={player}
					backgroundChampionId={player.backgroundChampionId}
				/>
			)}
			{latestSeason &&
				(
					await db
						.select()
						.from(draftPlayerTable)
						.where(
							and(
								eq(draftPlayerTable.playerId, player.id),
								eq(draftPlayerTable.seasonId, latestSeason.id)
							)
						)
				).length === 0 && (
					<SignUpForm
						player={player}
						season={latestSeason}
						accounts={accounts}
					/>
				)}
		</div>
	);
}
