import { auth, signIn, signOut } from "db/auth";
import Form from "./Form";
import type { JSX } from "react";
import Link from "./Link";
import Logo from "./assets/logo.svg";
import Submit from "./Submit";
import getPlayerUrl from "util/getPlayerUrl";
import multiclass from "util/multiclass";
import style from "./styles/topnav.module.scss";

/**
 * Properties that can be passed to the top navigation bar.
 * @public
 */
export type TopnavProps = Omit<JSX.IntrinsicElements["nav"], "children">;

/**
 * The site-wide top navigation bar.
 * @param props - The properties to pass to the navigation bar.
 * @returns The navigation bar.
 * @public
 */
export default async function Topnav({ className, ...props }: TopnavProps) {
	const session = await auth();
	return (
		<nav className={multiclass(className, style["topnav"])} {...props}>
			<ul>
				<li>
					<Link href="/">
						<Logo />
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
				{session?.user ? (
					<>
						<li className={style["right"]}>
							<Link href={getPlayerUrl(session.user)}>
								<span>{session.user.displayName ?? session.user.name}</span>
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
	);
}
