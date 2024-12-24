"use client";

import type { JSX } from "react";
import { useFormStatus } from "react-dom";

/**
 * Properties that can be passed to a submit button.
 * @public
 * @public
 */
export type SubmitProps = Omit<
	JSX.IntrinsicElements["input"],
	"type" | "disabled"
>;

/**
 * A button for submitting a form. Automatically disables while the form is pending.
 * @param props - The properties to pass to the button.
 * @returns The button.
 * @public
 */
export default function Submit(props: SubmitProps) {
	const status = useFormStatus();
	return <input type="submit" disabled={status.pending} {...props} />;
}
