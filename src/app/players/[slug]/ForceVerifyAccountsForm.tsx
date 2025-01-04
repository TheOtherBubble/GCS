import Form from "components/Form";
import { type JSX } from "react";
import type { Player } from "types/db/Player";
import Submit from "components/Submit";
import getAccountsByPlayer from "db/getAccountsByPlayer";
import getPlayerUrl from "util/getPlayerUrl";
import { revalidatePath } from "next/cache";
import updateAccount from "db/updateAccount";

/**
 * Properties that can be passed to a force verify accounts form.
 * @public
 */
export interface ForceVerifyAccountsFormProps
	extends Omit<JSX.IntrinsicElements["form"], "action"> {
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

				const accounts = await getAccountsByPlayer(player);
				for (const account of accounts) {
					// eslint-disable-next-line no-await-in-loop
					await updateAccount(account.puuid, { isVerified: true });
				}
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
