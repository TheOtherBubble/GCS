import type { JSX } from "react";
import Link from "components/Link";
import type { Metadata } from "next";
import domain from "util/domain";
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
				{"Endpoints are given relative to "}
				<Link href={new URL("/api", domain).href}>
					<code>{new URL("/api", domain).href}</code>
				</Link>
				{". Each endpoint has a "}
				<Link href="https://json-schema.org/">{"JSON Schema"}</Link>
				{
					" to describe its return value. All endpoints accept only HTTP GET requests."
				}
			</p>
			<h2>
				<Link href={new URL("/api/players", domain).href}>
					<code>{"/players"}</code>
				</Link>
			</h2>
			<p>
				{
					"This endpoint returns a list of all GCS players. Each player has one Discord account and a non-negative number of Riot accounts. Each player may play in any non-negative number of seasons. Each player will be a member of exactly one team per season in which they participate. The schema for this endpoint can be found "
				}
				<Link href={new URL("/api/players/schema", domain).href}>{"here"}</Link>
				{"."}
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
