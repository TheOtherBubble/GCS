import Form, { type FormProps } from "components/Form";
import type { Account } from "types/db/Account";
import type { Player } from "types/db/Player";
import type { Season } from "types/db/Season";
import Submit from "components/Submit";
import createDraftPlayer from "db/createDraftPlayer";
import getPlayerUrl from "util/getPlayerUrl";
import { revalidatePath } from "next/cache";

/**
 * Properties that can be passed to a sign-up form.
 * @public
 */
export interface SignUpFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The player to sign up for the next season. */
	player: Player;

	/** The season to sign up for. */
	season: Season;

	/** The player's accounts. */
	accounts: Account[];
}

/**
 * A form for signing a player up for the next season.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function SignUpForm({
	player,
	season,
	// `accounts,`
	...props
}: SignUpFormProps) {
	// Can't call methods on properties passed from the client to the server, so do it here instead.
	// `const anyAccountIsVerified = accounts.some((account) => account.isVerified);`

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

				/*
				// TODO: Uncomment once Riot gives us an API key.
				if (!anyAccountIsVerified) {
					return "You must have at least one verified account to sign up.";
				}
				*/

				await createDraftPlayer({ playerId: player.id, seasonId: season.id });
				revalidatePath(getPlayerUrl(player));
				return void 0;
			}}
			{...props}
		>
			<header>
				<h2>{`Register for ${season.name}`}</h2>
			</header>
			<Submit value="Register" />
		</Form>
	);
}
