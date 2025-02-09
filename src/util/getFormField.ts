/**
 * A convenience function for getting the data from a form field.
 * @param form - The form data.
 * @param name - The name of the field to get the data from.
 * @returns The data in the field.
 * @public
 */
export default function getFormField(
	form: FormData,
	name: string
): string | undefined;

/**
 * A convenience function for getting the data from a form field. Empty strings cause an error is thrown; this is expected to be caught in other ways.
 * @param form - The form data.
 * @param name - The name of the field to get the data from.
 * @param required - Whether or not the field is required to have content.
 * @returns The data in the field.
 * @public
 */
export default function getFormField(
	form: FormData,
	name: string,
	required: true
): string;

export default function getFormField(
	form: FormData,
	name: string,
	required = false
): string | undefined {
	const value = form.get(name);
	if (required && (!value || value === "")) {
		throw new Error(`The value of \`${name}\` was invalid.`);
	}

	return typeof value === "string" && value !== "" ? value : void 0;
}
