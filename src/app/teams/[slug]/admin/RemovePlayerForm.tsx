import Form, { type FormProps } from "components/Form";
import type { Player } from "types/db/Player";
import Submit from "components/Submit";
import type { Team } from "types/db/Team";
import type { TeamPlayer } from "types/db/TeamPlayer";
import deleteTeamPlayers from "db/deleteTeamPlayers";
import getFormField from "util/getFormField";
import getTeamUrl from "util/getTeamUrl";
import { revalidatePath } from "next/cache";
import updateTeamPlayers from "db/updateTeamPlayers";

/**
 * Properties that can be passed to a remove player form.
 * @public
 */
export interface RemovePlayerFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The team to add the player to. */
	team: Team;

	/** The players already on the team. */
	teamPlayers: TeamPlayer[];

	/** The players already on the team. */
	players: Player[];
}

/**
 * A form for removing a player from a team.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function RemovePlayerForm({
	team,
	teamPlayers,
	players,
	...props
}: RemovePlayerFormProps) {
	const captainId = teamPlayers.find(({ isCaptain }) => isCaptain)?.playerId;
	const [newCaptain] = teamPlayers.filter(
		({ playerId: id }) => id !== captainId
	);

	return (
		<Form
			action={async (form) => {
				"use server";

				// Remove the player from the team.
				const playerId = getFormField(form, "playerId", true);
				await deleteTeamPlayers(playerId, team.id);

				// If the player was the captain and there are any other players on the team, make one of them the captain.
				if (playerId === captainId && newCaptain) {
					await updateTeamPlayers(
						{ isCaptain: true },
						team.id,
						newCaptain.playerId
					);
				}

				revalidatePath(getTeamUrl(encodeURIComponent(team.vanityUrlSlug)));
			}}
			{...props}
		>
			<header>
				<h3>{"Remove Player"}</h3>
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
				<Submit value="Remove" />
			</p>
		</Form>
	);
}
