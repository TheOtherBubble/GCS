import Form, { type FormProps } from "components/Form";
import type { JSX } from "react";
import Submit from "components/Submit";
import { accountTable } from "db/schema";
import db from "db/db";
import hasRiotApiKey from "util/hasRiotApiKey";
import updateAccount from "util/updateAccount";

/**
 * Properties that can be passed to an update accounts form.
 * @public
 */
export type UpdateAccountsFormProps = Omit<FormProps, "action" | "children">;

/**
 * A form for updating a player's accounts.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function UpdateAccountsForm(
	props: UpdateAccountsFormProps
): JSX.Element {
	return (
		<Form
			action={async () => {
				"use server";
				if (!hasRiotApiKey()) {
					return "Missing Riot API key.";
				}

				// Track rate limits.
				let reqsThisSec = 0; // Requests this one second.
				let reqsThisTwoMins = 0; // Requests these two minutes.
				const requestsPerLoop = 3; // One to get summoner, one to get league entries, one to get account.
				const limitPerSecond = 20; // Development key rate limit.
				const limitPerTwoMinutes = 100; // Development key rate limit.

				// Get all accounts.
				const accounts = await db.select().from(accountTable);

				// Update all accounts.
				for (const account of accounts) {
					// Increment request counters.
					reqsThisSec += requestsPerLoop;
					reqsThisTwoMins += requestsPerLoop;

					// Wait two minutes when necessary.
					if (reqsThisTwoMins > limitPerTwoMinutes) {
						// eslint-disable-next-line no-await-in-loop
						await new Promise<void>((resolve) => {
							setTimeout(
								() => {
									resolve();
								},
								1000 * 60 * 2
							);
						});

						reqsThisSec = requestsPerLoop;
						reqsThisTwoMins = requestsPerLoop;
					}

					// Wait one second when necessary.
					if (reqsThisSec > limitPerSecond) {
						// eslint-disable-next-line no-await-in-loop
						await new Promise<void>((resolve) => {
							setTimeout(() => {
								resolve();
							}, 1000);
						});

						reqsThisSec = requestsPerLoop;
					}

					// eslint-disable-next-line no-await-in-loop
					await updateAccount(account);
				}

				return void 0;
			}}
			{...props}
		>
			<header>
				<h3>{"Update All Accounts"}</h3>
				<p>{"Will take several minutes."}</p>
			</header>
			<p>
				<Submit value="Update" />
			</p>
		</Form>
	);
}
