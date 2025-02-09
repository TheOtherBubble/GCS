import Form, { type FormProps } from "components/Form";
import type { JSX } from "react";
import Submit from "components/Submit";
import db from "db/db";
import { eq } from "drizzle-orm";
import getFormField from "util/getFormField";
import getTeamUrl from "util/getTeamUrl";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { teamTable } from "db/schema";

/**
 * Properties that can be passed to a create team form.
 * @public
 */
export interface UpdateTeamFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The team to modify. */
	team: typeof teamTable.$inferSelect;
}

/**
 * A form for updating a team.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function UpdateTeamForm({
	team,
	...props
}: UpdateTeamFormProps): JSX.Element {
	return (
		<Form
			action={async (form) => {
				"use server";
				const vanityUrlSlug = getFormField(form, "vanityUrlSlug");
				const poolString = getFormField(form, "pool");
				await db
					.update(teamTable)
					.set({
						code: getFormField(form, "code"),
						color: getFormField(form, "color")?.substring(1), // Cut off pound.
						logoUrl: getFormField(form, "logoUrl"),
						name: getFormField(form, "name"),
						pool: poolString ? parseInt(poolString, 10) : void 0,
						vanityUrlSlug
					})
					.where(eq(teamTable.id, team.id));
				if (vanityUrlSlug) {
					redirect(getTeamUrl({ vanityUrlSlug }));
				}

				// If the vanity URL didn't change, just reload the page instead.
				revalidatePath(getTeamUrl(team));
			}}
			{...props}
		>
			<header>
				<h3>{"Update Team"}</h3>
			</header>
			<p>
				<label>
					{"Code"}
					<input type="text" name="code" maxLength={4} />
				</label>
			</p>
			<p>
				<label>
					{"Color"}
					<input type="color" name="color" defaultValue={`#${team.color}`} />
				</label>
			</p>
			<p>
				<label>
					{"Logo URL"}
					<input type="url" name="logoUrl" maxLength={0x800} />
				</label>
			</p>
			<p>
				<label>
					{"Name"}
					<input type="text" name="name" maxLength={0x40} />
				</label>
			</p>
			<p>
				<label>
					{"Pool"}
					<input type="number" name="pool" min={1} />
				</label>
			</p>
			<p>
				<label>
					{"Vanity URL slug"}
					<input type="text" name="vanityUrlSlug" maxLength={0x20} />
				</label>
			</p>
			<p>
				<Submit value="Update" />
			</p>
		</Form>
	);
}
