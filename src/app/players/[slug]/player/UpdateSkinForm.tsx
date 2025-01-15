import Form, { type FormProps } from "components/Form";
import type { Player } from "types/db/Player";
import SkinList from "./SkinList";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import getPlayerUrl from "util/getPlayerUrl";
import { revalidatePath } from "next/cache";
import updatePlayers from "db/updatePlayers";

/**
 * Properties that can be passed to an update skin form.
 * @public
 */
export interface UpdateSkinFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The current player. */
	player: Player;

	/** The current player's current background champion ID. */
	backgroundChampionId: string;
}

/**
 * A form for updating a skin.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function UpdateSkinForm({
	player,
	backgroundChampionId,
	...props
}: UpdateSkinFormProps) {
	return (
		<Form
			action={async (form) => {
				"use server";
				const backgroundSkinNumber = parseInt(
					getFormField(form, "backgroundSkinNumber", true),
					10
				);
				if (backgroundSkinNumber === player.backgroundSkinNumber) {
					return;
				}

				await updatePlayers({ backgroundSkinNumber }, player.id);
				revalidatePath(getPlayerUrl(player));
			}}
			{...props}
		>
			<header>
				<h3>{"Update Background Skin"}</h3>
			</header>
			<p>
				<label>
					{"Background skin"}
					<SkinList
						championId={backgroundChampionId}
						name="backgroundSkinNumber"
						defaultValue={player.backgroundSkinNumber ?? 0}
						required
					/>
				</label>
			</p>
			<p>
				<Submit value="Update" />
			</p>
		</Form>
	);
}
