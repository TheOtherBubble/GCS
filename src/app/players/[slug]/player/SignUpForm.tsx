import Form, { type FormProps } from "components/Form";
import {
	type accountTable,
	draftPlayerTable,
	type playerTable,
	type seasonTable
} from "db/schema";
import type { JSX } from "react";
import Submit from "components/Submit";
import db from "db/db";
import getPlayerUrl from "util/getPlayerUrl";
import hasRiotApiKey from "util/hasRiotApiKey";
import { revalidatePath } from "next/cache";

/**
 * Properties that can be passed to a sign-up form.
 * @public
 */
export interface SignUpFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The player to sign up for the next season. */
	player: typeof playerTable.$inferSelect;

	/** The season to sign up for. */
	season: typeof seasonTable.$inferSelect;

	/** The player's accounts. */
	accounts: (typeof accountTable.$inferSelect)[];
}

/**
 * A form for signing a player up for the next season.
 * @param props - Properties to pass to the form.
 * @return The form.
 * @public
 */
export default function SignUpForm({
	player,
	season,
	accounts,
	...props
}: SignUpFormProps): JSX.Element {
	// Can't call methods on properties passed from the client to the server, so do it here instead.
	const anyAccountIsVerified = accounts.some((account) => account.isVerified);

	return (
		<Form
			action={async () => {
				"use server";
				if (
					player.bannedUntilDate &&
					new Date(player.bannedUntilDate).valueOf() - Date.now() > 0
				) {
					return "You may not sign up while you are banned.";
				}

				if (
					!player.primaryRole ||
					!player.secondaryRole ||
					player.primaryRole === player.secondaryRole
				) {
					return "You must select two distinct roles as your primary and secondary role to sign up.";
				}

				if (hasRiotApiKey() && !anyAccountIsVerified) {
					return "You must have at least one verified account to sign up.";
				}

				await db
					.insert(draftPlayerTable)
					.values({ playerId: player.id, seasonId: season.id });
				revalidatePath(getPlayerUrl(player));
				return void 0;
			}}
			{...props}
		>
			<header>
				<h3>{`Register for ${season.name}`}</h3>
			</header>
			<p>
				<Submit value="Register" />
			</p>
		</Form>
	);
}
