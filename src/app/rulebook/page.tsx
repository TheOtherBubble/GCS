import Document from "types/Document";
import Markdown from "react-markdown";
import type { Metadata } from "next";
import UpdateRulebookForm from "./UpdateRulebookForm";
import { auth } from "db/auth";
import getDocuments from "db/getDocuments";
import style from "./page.module.scss";

/**
 * A page that displays the rulebook.
 * @returns The rulebook page.
 * @public
 */
export default async function Page() {
	const [rulebook] = await getDocuments(Document.RULEBOOK);

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
