// eslint-disable-next-line camelcase
import { Exo_2, Funnel_Display } from "next/font/google";

/**
 * The font used for titles.
 * @public
 */
// eslint-disable-next-line new-cap
export const title = Exo_2({ subsets: ["latin"], variable: "--font-title" });

/**
 * The font used for everything other than titles.
 * @public
 */
// eslint-disable-next-line new-cap
export const body = Funnel_Display({
	subsets: ["latin"],
	variable: "--font-body"
});
