import Form, { type FormProps } from "components/Form";
import type { Player } from "types/db/Player";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import updatePlayers from "db/updatePlayers";

/**
 * Properties that can be passed to a ban player form.
 * @public
 */
export interface BanPlayerFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The player to ban. */
	player: Player;
}

/**
 * A form for banning a player.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function BanPlayerForm({
	player,
	...props
}: BanPlayerFormProps) {
	return (
		<Form
			action={async (form) => {
				"use server";
				await updatePlayers(
					{
						bannedUntilDate: getFormField(
							form,
							"bannedUntilDate",
							true
						).substring(0, 10)
					},
					player.id
				);
			}}
			{...props}
		>
			<header>
				<h3>{"Ban Player"}</h3>
				<p>{"Set this to a date in the past to unban this player."}</p>
			</header>
			<p>
				<label>
					{"Banned until"}
					<input type="date" name="bannedUntilDate" required />
				</label>
			</p>
			<p>
				<Submit value="Ban" />
			</p>
		</Form>
	);
}
