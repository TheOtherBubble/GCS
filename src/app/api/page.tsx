import type { JSX } from "react";
import type { Metadata } from "next";
import style from "./page.module.scss";

/**
 * The API documentation page.
 * @public
 */
export default function Page(): JSX.Element {
	return (
		<article className={style["content"]}>
			<h1>{"API Documentation"}</h1>
			<p>{"OpenAPI coming soon!"}</p>
		</article>
	);
}

/**
 * The metadata of the landing page.
 * @public
 */
export const metadata = {
	description: "The Gauntlet Championship Series API documentation.",
	openGraph: { url: "/api" },
	title: "API Documentation"
} satisfies Metadata;
