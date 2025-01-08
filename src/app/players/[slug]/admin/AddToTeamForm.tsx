import Form, { type FormProps } from "components/Form";
import type { Player } from "types/db/Player";
import Submit from "components/Submit";
import type { Team } from "types/db/Team";
import createTeamPlayer from "db/createTeamPlayer";
import getFormField from "util/getFormField";
import getPlayerUrl from "util/getPlayerUrl";
import { getPlayersByTeamId } from "db/getPlayersByTeam";
import getTeamsByPlayer from "db/getTeamsByPlayer";
import removePlayerFromTeam from "db/removePlayerFromTeam";
import { revalidatePath } from "next/cache";
import { useId } from "react";

/**
 * Properties that can be passed to an add player to team form.
 * @public
 */
export interface AddToTeamFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The player to add to the team. */
	player: Player;

	/** The teams that the player may be added to. */
	teams: Team[];
}

/**
 * A form for adding a player to a team.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function AddToTeamForm({
	player,
	teams,
	...props
}: AddToTeamFormProps) {
	const teamIdId = useId();

	// Can't call methods on properties passed from the client to the server, so do it here instead.
	const teamIds = teams.map((team) => team.id);

	return (
		<Form
			action={async (form) => {
				"use server";
				const teamId = parseInt(getFormField(form, "teamId", true), 10);
				for (const teamPlayer of await getTeamsByPlayer(player)) {
					// If the player is already part of the selected team, do nothing.
					if (teamPlayer.teamId === teamId) {
						return;
					}

					if (!(teamPlayer.teamId in teamIds)) {
						continue;
					}

					// If the player is already part of another team in the list, remove them from that team.
					// eslint-disable-next-line no-await-in-loop
					await removePlayerFromTeam(player.id, teamPlayer.teamId);
				}

				// If the player is the first on the team, make them the captain. Must be `null` rather than `false` for non-captains in order to meet a database constraint.
				const isCaptain =
					(await getPlayersByTeamId(teamId)).length === 0 || null;

				// Add the player to the team.
				await createTeamPlayer({ isCaptain, playerId: player.id, teamId });
				revalidatePath(getPlayerUrl(player));
			}}
			{...props}
		>
			<header>
				<h2>{"Add to Team"}</h2>
				<p>
					{
						"If the team has no players, this player will be made the captain. If this player is already on a team in this season, they will be removed from that team."
					}
				</p>
			</header>
			<label htmlFor={teamIdId}>{"Team"}</label>
			<select id={teamIdId} name="teamId" required>
				{teams.map((team) => (
					<option value={team.id} key={team.id}>
						{team.name}
					</option>
				))}
			</select>
			<Submit value="Add" />
		</Form>
	);
}
