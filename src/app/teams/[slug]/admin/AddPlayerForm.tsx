import Form, { type FormProps } from "components/Form";
import type { Player } from "types/db/Player";
import Submit from "components/Submit";
import type { Team } from "types/db/Team";
import type { TeamPlayer } from "types/db/TeamPlayer";
import createTeamPlayers from "db/createTeamPlayers";
import deleteTeamPlayers from "db/deleteTeamPlayers";
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

	/** The other teams in the team's season. */
	otherTeams: Team[];
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
	otherTeams,
	...props
}: AddPlayerFormProps) {
	const collator = new Intl.Collator();
	const otherTeamIds = otherTeams.map(({ id }) => id);

	return (
		<Form
			action={async (form) => {
				"use server";
				const playerId = getFormField(form, "playerId", true);
				for (const teamPlayer of teamPlayers) {
					// If the player is already part of the selected team, do nothing.
					if (teamPlayer.playerId === playerId) {
						return;
					}
				}

				// Remove the player from all other teams in the team's season.
				await deleteTeamPlayers(playerId, ...otherTeamIds);

				// If the player is the first on the team, make them the captain. Must be `null` rather than `false` for non-captains in order to meet a database constraint.
				const isCaptain = teamPlayers.length === 0 || null;

				// Add the player to the team.
				await createTeamPlayers({
					isCaptain,
					playerId,
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
						{players
							.sort((a, b) =>
								collator.compare(
									a.displayName ?? a.name,
									b.displayName ?? b.name
								)
							)
							.map((player) => (
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
