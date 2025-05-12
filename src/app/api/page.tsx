import type { JSX } from "react";
import type { Metadata } from "next";
import Swagger from "components/Swagger";
import { entryDocument } from "./openapi.json/route";
import style from "./page.module.scss";

/**
 * The API documentation page.
 * @public
 */
export default function Page(): JSX.Element {
	return (
		<article className={style["content"]}>
			<Swagger spec={entryDocument} />
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
