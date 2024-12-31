"use client";

import NextForm, { type FormProps } from "next/form";
import multiclass from "util/multiclass";
import style from "./styles/form.module.scss";
import { useActionState } from "react";

/**
 * Create a form. Automatically displays the message of any error that is thrown during the form action.
 * @param props - The properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function Form({
	action,
	children,
	className,
	...props
}: FormProps) {
	// If the action is a server function, wrap it to catch and display error messages.
	const [state, dispatch] = useActionState(
		async (_: string | undefined, payload: FormData) => {
			if (typeof action !== "function") {
				return void 0;
			}

			try {
				await action(payload);
			} catch (error) {
				return error instanceof Error ? error.message : "Error.";
			}

			return void 0;
		},
		void 0
	);

	return (
		<NextForm
			action={typeof action === "function" ? dispatch : action}
			className={multiclass(className, style["form"])}
			{...props}
		>
			{children}
			{state && (
				<footer>
					<p className={style["state"]}>{state}</p>
				</footer>
			)}
		</NextForm>
	);
}
