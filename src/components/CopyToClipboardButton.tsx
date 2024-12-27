"use client";

import type { JSX } from "react";

export interface CopyToClipboardButtonProps
	extends Omit<JSX.IntrinsicElements["button"], "onClick"> {
	text: string;
}

export default function CopyToClipboardButton({
	text,
	...props
}: CopyToClipboardButtonProps) {
	return (
		<button
			onClick={() => {
				void navigator.clipboard.writeText(text);
			}}
			{...props}
		/>
	);
}
