import Discord from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import db from "./src/db/db";

// TODO: Need to load environment variables?

/**
 * The NextAuth.js configuration.
 * @see {@link https://authjs.dev/getting-started/installation?framework=Next.js | Installation}
 * @see {@link https://authjs.dev/getting-started/authentication/oauth | OAuth}
 * @public
 */
// eslint-disable-next-line new-cap
export default NextAuth({ adapter: DrizzleAdapter(db), providers: [Discord] }); // TODO: Schema? See https://authjs.dev/getting-started/adapters/drizzle.
