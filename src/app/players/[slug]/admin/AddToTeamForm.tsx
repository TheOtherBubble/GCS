import Form, { type FormProps } from "components/Form";
import { and, eq, or } from "drizzle-orm";
import { type playerTable, teamPlayerTable, type teamTable } from "db/schema";
import type { JSX } from "react";
import Submit from "components/Submit";
import db from "db/db";
import getFormField from "util/getFormField";
import getPlayerUrl from "util/getPlayerUrl";
import { revalidatePath } from "next/cache";

/**
 * Properties that can be passed to an add player to team form.
 * @public
 */
export interface AddToTeamFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The player to add to the team. */
	player: typeof playerTable.$inferSelect;

	/** The player's existing memberships on teams. */
	teamPlayers: (typeof teamPlayerTable.$inferSelect)[];

	/** The teams that the player may be added to. */
	teams: (typeof teamTable.$inferSelect)[];
}

/**
 * A form for adding a player to a team.
 * @param props - Properties to pass to the form.
 * @return The form.
 * @public
 */
export default function AddToTeamForm({
	player,
	teamPlayers,
	teams,
	...props
}: AddToTeamFormProps): JSX.Element {
	// Can't call methods on properties passed from the client to the server, so do it here instead.
	const teamPlayerTeamIds = teamPlayers.map((teamPlayer) => teamPlayer.teamId);
	const teamIds = teams.map((team) => team.id);

	return (
		<Form
			action={async (form) => {
				"use server";
				const teamId = parseInt(getFormField(form, "teamId", true), 10);

				// If the player is already part of the selected team, do nothing.
				if (teamPlayerTeamIds.some((id) => id === teamId)) {
					return;
				}

				// Remove the player from all teams in the list.
				await db
					.delete(teamPlayerTable)
					.where(
						and(
							eq(teamPlayerTable.playerId, player.id),
							or(...teamIds.map((id) => eq(teamPlayerTable.teamId, id)))
						)
					);

				// If the team doesn't have a captain, make this player the captain. Must be `null` rather than `false` for non-captains in order to meet a database constraint.
				const isCaptain =
					(
						await db
							.select()
							.from(teamPlayerTable)
							.where(
								and(
									eq(teamPlayerTable.teamId, teamId),
									eq(teamPlayerTable.isCaptain, true)
								)
							)
					).length === 0 || null;

				// Add the player to the team.
				await db
					.insert(teamPlayerTable)
					.values({ isCaptain, playerId: player.id, teamId });
				revalidatePath(getPlayerUrl(player));
			}}
			{...props}
		>
			<header>
				<h3>{"Add to Team"}</h3>
				<p>
					{
						"If the team has no players, this player will be made the captain. If this player is already on a team in this season, they will be removed from that team."
					}
				</p>
			</header>
			<p>
				<label>
					{"Team"}
					<select name="teamId" required>
						{teams.map((team) => (
							<option value={team.id} key={team.id}>
								{team.name}
							</option>
						))}
					</select>
				</label>
			</p>
			<p>
				<Submit value="Add" />
			</p>
		</Form>
	);
}
