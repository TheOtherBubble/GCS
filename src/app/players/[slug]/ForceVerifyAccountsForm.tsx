import Form from "components/Form";
import type { FormProps } from "next/form";
import type { Player } from "types/db/Player";
import Submit from "components/Submit";
import getPlayerUrl from "util/getPlayerUrl";
import { revalidatePath } from "next/cache";
import updateAccountsByPlayer from "db/updateAccountsByPlayer";

/**
 * Properties that can be passed to a force verify accounts form.
 * @public
 */
export interface ForceVerifyAccountsFormProps
	extends Omit<FormProps, "action"> {
	/** The player to verify the accounts of. */
	player: Player;
}

/**
 * A form for forcibly verifying a player's accounts.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function ForceVerifyAccountsForm({
	player,
	...props
}: ForceVerifyAccountsFormProps) {
	return (
		<Form
			action={async () => {
				"use server";

				await updateAccountsByPlayer(player, { isVerified: true });
				revalidatePath(getPlayerUrl(player));
			}}
			{...props}
		>
			<header>
				<h2>{"Force Verify Accounts"}</h2>
			</header>
			<Submit value="Verify" />
		</Form>
	);
}
