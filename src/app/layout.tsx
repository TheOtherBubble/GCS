import "styles/global.scss";
import type { Metadata, Viewport } from "next";
import type LayoutProps from "types/LayoutProps";
import Topnav from "components/Topnav";
import domain from "utility/domain";
import style from "./layout.module.scss";

/**
 * The root layout.
 * @param params - The parameters passed to the layout.
 * @returns The root layout.
 * @public
 */
export default function Layout({ children }: LayoutProps) {
	return (
		<html lang="en-US">
			<body className={style["spacer"]}>
				<header>
					<Topnav />
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
export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#140031"
};

/**
 * The base metadata of the website.
 * @public
 */
export const metadata: Metadata = {
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
};
