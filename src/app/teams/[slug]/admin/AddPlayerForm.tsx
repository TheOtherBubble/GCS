import Form, { type FormProps } from "components/Form";
import type { Player } from "types/db/Player";
import Submit from "components/Submit";
import type { Team } from "types/db/Team";
import type { TeamPlayer } from "types/db/TeamPlayer";
import createTeamPlayers from "db/createTeamPlayers";
import getFormField from "util/getFormField";
import getTeamUrl from "util/getTeamUrl";
import { revalidatePath } from "next/cache";

/**
 * Properties that can be passed to an add player form.
 * @public
 */
export interface AddPlayerFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The team to add the player to. */
	team: Team;

	/** The players already on the team. */
	teamPlayers: TeamPlayer[];

	/** The players that may be added to the team. */
	players: Player[];
}

/**
 * A form for adding a player to a team.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function AddPlayerForm({
	team,
	teamPlayers,
	players,
	...props
}: AddPlayerFormProps) {
	return (
		<Form
			action={async (form) => {
				"use server";
				for (const teamPlayer of teamPlayers) {
					// If the player is already part of the selected team, do nothing.
					if (teamPlayer.teamId === team.id) {
						return;
					}
				}

				// If the player is the first on the team, make them the captain. Must be `null` rather than `false` for non-captains in order to meet a database constraint.
				const isCaptain = teamPlayers.length === 0 || null;

				// Add the player to the team.
				await createTeamPlayers({
					isCaptain,
					playerId: getFormField(form, "playerId", true),
					teamId: team.id
				});
				revalidatePath(getTeamUrl(encodeURIComponent(team.vanityUrlSlug)));
			}}
			{...props}
		>
			<header>
				<h3>{"Add Player"}</h3>
			</header>
			<p>
				<label>
					{"Player"}
					<select name="playerId" required>
						{players.map((player) => (
							<option value={player.id} key={player.id}>
								{player.displayName ?? player.name}
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
