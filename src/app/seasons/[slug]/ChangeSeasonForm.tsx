import { type JSX, useId } from "react";
import Submit from "components/Submit";
import getFormField from "scripts/getFormField";
import { redirect } from "next/navigation";
import type { seasonsTable } from "scripts/schema";

/**
 * Properties that can be passed to a change season form.
 * @public
 */
export interface ChangeSeasonFormProps
	extends Omit<JSX.IntrinsicElements["form"], "action"> {
	/** The current season. */
	season: typeof seasonsTable.$inferSelect | undefined;

	/** A list of all seasons. */
	seasons: (typeof seasonsTable.$inferSelect)[];
}

/**
 * A form for changing the current season.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function ChangeSeasonForm({
	season,
	seasons,
	...props
}: ChangeSeasonFormProps) {
	const vanityUrlSlugId = useId();

	return (
		<form
			// Server actions must be asynchronous.
			// eslint-disable-next-line @typescript-eslint/require-await
			action={async (form) => {
				"use server";
				redirect(
					`/seasons/${encodeURIComponent(getFormField(form, "vanityUrlSlug", true))}`
				);
			}}
			{...props}
		>
			<label htmlFor={vanityUrlSlugId}>{"Change season"}</label>
			<select
				id={vanityUrlSlugId}
				name="vanityUrlSlug"
				defaultValue={season?.vanityUrlSlug}
				required
				// TODO: Submit on change? Remove submit button if possible.
			>
				{seasons.map((value) => (
					<option value={value.vanityUrlSlug} key={value.id}>
						{value.name}
					</option>
				))}
			</select>
			<Submit value="Go" />
		</form>
	);
}
