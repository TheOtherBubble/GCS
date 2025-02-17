import "styles/global.scss";
import type { Metadata, Viewport } from "next";
import { auth, signIn, signOut } from "db/auth";
import { body, title } from "util/font";
import Form from "components/Form";
import Icon from "./icon.svg";
import type { JSX } from "react";
import type LayoutProps from "types/LayoutProps";
import Link from "components/Link";
import Submit from "components/Submit";
import domain from "util/domain";
import getPlayerUrl from "util/getPlayerUrl";
import multiclass from "util/multiclass";
import style from "./layout.module.scss";

/**
 * The root layout.
 * @param params - The parameters passed to the layout.
 * @returns The root layout.
 * @public
 */
export default async function Layout({
	children
}: LayoutProps): Promise<JSX.Element> {
	const session = await auth();

	return (
		<html lang="en-US" className={multiclass(title.variable, body.variable)}>
			<body className={style["spacer"]}>
				<header>
					<nav>
						<ul>
							<li>
								<Link href="/">
									<Icon />
								</Link>
							</li>
							<li>
								<Link href="/schedule">
									<span>{"Schedule"}</span>
								</Link>
							</li>
							<li className={style["hide-on-mobile"]}>
								<Link href="/rulebook">
									<span>{"Rulebook"}</span>
								</Link>
							</li>
							<li className={style["hide-on-medium"]}>
								<Link href="/leaderboards">
									<span>{"Leaderboards"}</span>
								</Link>
							</li>
							{session?.user ? (
								<>
									<li className={style["right"]}>
										<Link href={getPlayerUrl(session.user)}>
											<span>
												{session.user.displayName ?? session.user.name}
											</span>
										</Link>
									</li>
									{session.user.isAdministator && (
										<li className={style["hide-on-mobile"]}>
											<Link href="/admin">
												<span>{"Admin"}</span>
											</Link>
										</li>
									)}
									<li className={style["hide-on-mobile"]}>
										<Form
											action={async () => {
												"use server";
												await signOut();
											}}
										>
											<Submit value="Sign Out" />
										</Form>
									</li>
								</>
							) : (
								<li className={style["right"]}>
									<Form
										action={async () => {
											"use server";
											await signIn("discord");
										}}
									>
										<Submit value="Sign In" />
									</Form>
								</li>
							)}
						</ul>
					</nav>
				</header>
				<main>{children}</main>
				<footer></footer>
			</body>
		</html>
	);
}

/**
 * The viewport of the website.
 * @public
 */
export const viewport = {
	colorScheme: "dark",
	themeColor: "#e5b451"
} satisfies Viewport;

/**
 * The base metadata of the website.
 * @public
 */
export const metadata = {
	authors: [{ name: "Travis Martin", url: "https://www.lakuna.pw" }],
	creator: "Travis Martin",
	metadataBase: new URL(domain),
	openGraph: {
		siteName: "Gauntlet Championship Series",
		type: "website"
	},
	publisher: "Travis Martin",
	title: {
		default: "Page",
		template: "%s | GCS"
	}
} satisfies Metadata;
