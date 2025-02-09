"use client";

import type { JSX } from "react";
import { useFormStatus } from "react-dom";

/**
 * Properties that can be passed to a submit button.
 * @public
 */
export type SubmitProps = Omit<JSX.IntrinsicElements["input"], "type">;

/**
 * A button for submitting a form. Automatically disables while the form is pending.
 * @param props - The properties to pass to the button.
 * @returns The button.
 * @public
 */
export default function Submit({
	disabled,
	...props
}: SubmitProps): JSX.Element {
	const status = useFormStatus();
	return (
		<input type="submit" disabled={disabled ?? status.pending} {...props} />
	);
}
