import Form, { type FormProps } from "components/Form";
import type { JSX } from "react";
import Submit from "components/Submit";
import db from "db/db";
import { eq } from "drizzle-orm";
import getFormField from "util/getFormField";
import getSeasonUrl from "util/getSeasonUrl";
import { revalidatePath } from "next/cache";
import { seasonTable } from "db/schema";

/**
 * Properties that can be passed to a delete season form.
 * @public
 */
export interface DeleteSeasonFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The current season. */
	season: typeof seasonTable.$inferSelect;
}

/**
 * A form for deleting a season.
 * @param props - Properties to pass to the form.
 * @return The form.
 * @public
 */
export default function DeleteSeasonForm({
	season,
	...props
}: DeleteSeasonFormProps): JSX.Element {
	return (
		<Form
			action={async (form) => {
				"use server";
				if (getFormField(form, "safeguard") !== "CONFIRM") {
					return "Invalid safeguard.";
				}

				await db.delete(seasonTable).where(eq(seasonTable.id, season.id));
				revalidatePath(getSeasonUrl(season));
				return void 0;
			}}
			{...props}
		>
			<header>
				<h3>{"Delete Season"}</h3>
			</header>
			<p>
				<label>
					{"Safeguard"}
					<input type="text" name="safeguard" placeholder="CONFIRM" required />
				</label>
			</p>
			<p>
				<Submit value="Delete" />
			</p>
		</Form>
	);
}
