import Form, { type FormProps } from "components/Form";
import type { Player } from "types/db/Player";
import Submit from "components/Submit";
import updatePlayer from "db/updatePlayer";

/**
 * Properties that can be passed to a make administrator form.
 * @public
 */
export interface MakeAdminFormProps extends Omit<FormProps, "action"> {
	/** The player to make an administrator. */
	player: Player;
}

/**
 * A form for making a player an administrator.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function MakeAdminForm({
	player,
	...props
}: MakeAdminFormProps) {
	return (
		<Form
			action={async () => {
				"use server";
				await updatePlayer(player.id, { isAdministator: true });
			}}
			{...props}
		>
			<header>
				<h2>{"Make Player an Admin"}</h2>
			</header>
			<Submit value="Authorize" />
		</Form>
	);
}
