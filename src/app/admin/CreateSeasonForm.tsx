import { type JSX, useId } from "react";
import Submit from "components/Submit";
import createSeason from "db/createSeason";
import getFormField from "utility/getFormField";

/**
 * Properties that can be passed to a create season form.
 * @public
 */
export type CreateSeasonFormProps = Omit<
	JSX.IntrinsicElements["form"],
	"action"
>;

/**
 * A form for creating a season.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function CreateSeasonForm(props: CreateSeasonFormProps) {
	const startDateId = useId();
	const nameId = useId();
	const vanityUrlSlugId = useId();

	return (
		<form
			action={async (form) => {
				"use server";
				await createSeason({
					name: getFormField(form, "name", true),
					startDate: getFormField(form, "startDate"),
					vanityUrlSlug: getFormField(form, "vanityUrlSlug", true)
				});
			}}
			{...props}
		>
			<header>
				<h2>{"Create Season"}</h2>
			</header>
			<label htmlFor={startDateId}>{"Start date"}</label>
			<input type="date" id={startDateId} name="startDate" />
			<label htmlFor={nameId}>{"Name"}</label>
			<input type="text" id={nameId} name="name" maxLength={0x40} required />
			<label htmlFor={vanityUrlSlugId}>{"Vanity URL slug"}</label>
			<input
				type="text"
				id={vanityUrlSlugId}
				name="vanityUrlSlug"
				maxLength={0x20}
				required
			/>
			<Submit value="Create" />
		</form>
	);
}
