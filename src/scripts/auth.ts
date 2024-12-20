import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse
} from "next";
import NextAuth, { type NextAuthResult, type Session } from "next-auth";
import { oauthAccounts, players, sessions } from "./schema";
import type { AppRouteHandlerFn } from "next/dist/server/route-modules/app-route/module";
import Discord from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextRequest } from "next/server";
import db from "./db";

// Can't import `env.ts` here because `process.cwd` is not a function, but environment variables are available anyway. Note that these environment variables must be available during the build process.

const clientId = process.env["DISCORD_CLIENT_ID"];
if (!clientId) {
	throw new Error("Missing Discord client ID.");
}

const clientSecret = process.env["DISCORD_CLIENT_SECRET"];
if (!clientSecret) {
	throw new Error("Missing Discord client secret.");
}

// The adapter that is used to connect the provider (Discord) to the database (PostgreSQL via the Drizzle ORM).
// eslint-disable-next-line new-cap
const adapter = DrizzleAdapter(db, {
	accountsTable: oauthAccounts,
	sessionsTable: sessions,
	usersTable: players
});

// The provider, which allows users to log in via OAuth with a Discord account.
// eslint-disable-next-line new-cap
const provider = Discord({ clientId, clientSecret });
provider.profile = (profile) => ({
	discordId: profile.id, // This one is the actual Discord snowflake.
	email: profile.email, // Used by Auth.js to connect OAuth accounts to users.
	id: profile.id, // This one just makes a UUID for some reason.
	name: profile.username // Default the player's name to their Discord username.
});

// eslint-disable-next-line new-cap
const result = NextAuth({ adapter, providers: [provider] });

// Auth.js doesn't export the types of `NextAuthResult["auth"]` correctly, so we need to manually type the exports.

/**
 * Equivalent to `NextAuthRequest` from Auth.js.
 * @public
 */
export interface NextAuthRequest extends NextRequest {
	auth: Session | null;
}

/**
 * Equivalent to `AppRouteHandlerFnContext` from Auth.js.
 * @public
 */
export interface AppRouteHandlerFnContext {
	params?: Record<string, string | string[]>;
}

/**
 * Equivalent to `Session` from Auth.js, but specifies that the returned user matches the type in the database.
 * @public
 */
export interface PlayerSession extends Session {
	user?: typeof players.$inferSelect;
}

/**
 * Equivalent to `NextAuthResult["auth"]` from Auth.js, but specifies that the returned user matches the type in the database.
 * @public
 */
export type NextAuthResultAuth = ((
	...args: [NextApiRequest, NextApiResponse]
) => Promise<PlayerSession | null>) &
	((...args: []) => Promise<PlayerSession | null>) &
	((...args: [GetServerSidePropsContext]) => Promise<PlayerSession | null>) &
	((
		...args: [
			(
				req: NextAuthRequest,
				ctx: AppRouteHandlerFnContext
			) => ReturnType<AppRouteHandlerFn>
		]
	) => AppRouteHandlerFn);

/**
 * Equivalent to `NextAuthResult` from Auth.js
 * @public
 */
export interface NextAuthResultFixed {
	auth: NextAuthResultAuth;
	handlers: NextAuthResult["handlers"];
	signIn: NextAuthResult["signIn"];
	signOut: NextAuthResult["signOut"];
}

/**
 * The Auth.js configuration.
 * @see {@link https://authjs.dev/getting-started/installation?framework=Next.js | Installation}
 * @see {@link https://authjs.dev/getting-started/authentication/oauth | OAuth}
 * @see {@link https://authjs.dev/getting-started/database | Database Adapters}
 * @public
 */
export const { auth, handlers, signIn, signOut } =
	result as unknown as NextAuthResultFixed;
