import Form, { type FormProps } from "components/Form";
import ChampionList from "./ChampionList";
import type { Player } from "types/db/Player";
import type { PlayerRole } from "types/db/PlayerRole";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import getPlayerUrl from "util/getPlayerUrl";
import getPlayerUrlBySlug from "util/getPlayerUrlBySlug";
import { playerRoleEnum } from "db/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import updatePlayers from "db/updatePlayers";

/**
 * Properties that can be passed to an update player form.
 * @public
 */
export interface UpdatePlayerFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The current player. */
	player: Player;
}

/**
 * A form for updating a player.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function UpdatePlayerForm({
	player,
	...props
}: UpdatePlayerFormProps) {
	return (
		<Form
			action={async (form) => {
				"use server";
				const displayName = getFormField(form, "displayName");
				const backgroundChampionId = getFormField(form, "backgroundChampionId");
				await updatePlayers(
					{
						backgroundChampionId,
						backgroundSkinNumber: backgroundChampionId ? 0 : void 0,
						biography: getFormField(form, "biography"),
						displayName,
						primaryRole: getFormField(form, "primaryRole") as
							| PlayerRole
							| undefined,
						secondaryRole: getFormField(form, "secondaryRole") as
							| PlayerRole
							| undefined
					},
					player.id
				);
				if (displayName) {
					redirect(getPlayerUrlBySlug(encodeURIComponent(displayName)));
				}

				// If the vanity URL didn't change, just reload the page instead.
				revalidatePath(getPlayerUrl(player));
			}}
			{...props}
		>
			<header>
				<h3>{"Update Player"}</h3>
			</header>
			<p>
				<label>
					{"Display name"}
					<input type="text" name="displayName" maxLength={0x20} />
				</label>
			</p>
			<p>
				<label>
					{"Biography"}
					<textarea name="biography" maxLength={0x100} />
				</label>
			</p>
			<p>
				<label>
					{"Primary role"}
					<select name="primaryRole">
						<option />
						{playerRoleEnum.enumValues.map((role) => (
							<option value={role} key={role}>
								{role}
							</option>
						))}
					</select>
				</label>
			</p>
			<p>
				<label>
					{"Secondary role"}
					<select name="secondaryRole">
						<option />
						{playerRoleEnum.enumValues.map((role) => (
							<option value={role} key={role}>
								{role}
							</option>
						))}
					</select>
				</label>
			</p>
			<p>
				<label>
					{"Background champion"}
					<ChampionList name="backgroundChampionId" />
				</label>
			</p>
			<p>
				<Submit value="Update" />
			</p>
		</Form>
	);
}
