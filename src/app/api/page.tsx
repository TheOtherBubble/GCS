import type { JSX } from "react";
import Link from "components/Link";
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
			<p>
				{
					"The GCS REST API conforms to the OpenAPI Specification v3.1.1. The entry document is located "
				}
				<Link href="/api/openapi.json">{"here"}</Link>
				{". You can generate up-to-date documentation for the API with "}
				<Link href="https://editor-next.swagger.io/">{"SwaggerEditor"}</Link>
				{
					" or any other documentation generation tool that conforms to the OpenAPI Specification v3.1.1."
				}
			</p>
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
