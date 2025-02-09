import Document from "types/Document";
import type { JSX } from "react";
import Markdown from "react-markdown";
import type { Metadata } from "next";
import UpdateRulebookForm from "./UpdateRulebookForm";
import { auth } from "db/auth";
import db from "db/db";
import { documentTable } from "db/schema";
import { eq } from "drizzle-orm";
import style from "./page.module.scss";

/**
 * A page that displays the rulebook.
 * @returns The rulebook page.
 * @public
 */
export default async function Page(): Promise<JSX.Element> {
	const [rulebook] = await db
		.select()
		.from(documentTable)
		.where(eq(documentTable.id, Document.RULEBOOK));

	return (
		<article className={style["content"]}>
			{rulebook?.text && <Markdown>{rulebook.text}</Markdown>}
			{(await auth())?.user?.isAdministator && (
				<UpdateRulebookForm text={rulebook?.text ?? void 0} />
			)}
		</article>
	);
}

/**
 * The metadata of the rulebook page.
 * @public
 */
export const metadata = {
	description: "The current rulebook of the Gauntlet Championship Series.",
	openGraph: { url: "/rulebook" },
	title: "Rulebook"
} satisfies Metadata;
