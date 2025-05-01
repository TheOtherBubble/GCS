import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse
} from "next";
import NextAuth, { type NextAuthResult, type Session } from "next-auth";
import { oauthTable, playerTable, sessionTable } from "./schema";
import type { AppRouteHandlerFn } from "next/dist/server/route-modules/app-route/module";
import Discord from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextRequest } from "next/server";
import type { ProviderId } from "next-auth/providers";
import db from "./db";

// Can't import `env.ts` here because `process.cwd` is not a function, but environment variables are available anyway. Note that these environment variables must be available during the build process.
const clientId = process.env["DISCORD_CLIENT_ID"];
const clientSecret = process.env["DISCORD_CLIENT_SECRET"];
if (!clientId || !clientSecret) {
	throw new Error("Missing Discord client ID or secret.");
}

// The provider, which allows users to log in via OAuth with a Discord account.
// eslint-disable-next-line new-cap
const provider = Discord({ clientId, clientSecret });
provider.profile = (profile) => ({
	discordId: profile.id, // This one is the actual Discord snowflake.
	email: profile.email, // Used by Auth.js to connect OAuth accounts to users.
	id: profile.id, // This one just makes a UUID for some reason.
	name: profile.username // Default the player's name to their Discord username.
});

// Auth.js doesn't export the types of `NextAuthResult["auth"]` correctly, so we need to manually type the exports.

/**
 * Equivalent to `Session` from Auth.js, but specifies that the session user matches the type in the database.
 * @public
 */
export interface PlayerSession extends Session {
	/** The logged-in user. */
	user?: typeof playerTable.$inferSelect;
}

/**
 * Equivalent to `NextAuthRequest` from Auth.js, but specifies that the session user matches the type in the database.
 * @public
 */
export interface NextAuthRequest extends NextRequest {
	/** The current session. */
	auth: PlayerSession | null;
}

/**
 * Equivalent to `AppRouteHandlerFnContext` from Auth.js.
 * @public
 */
export interface AppRouteHandlerFnContext {
	/** The parameters that are passed to the app route handler. */
	params?: Record<string, string | string[]>;
}

/**
 * Equivalent to `NextAuthResult["auth"]` from Auth.js, but specifies that the session user matches the type in the database.
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
 * Equivalent to `NextAuthResult["signIn"]` from Auth.js. Necessary because Auth.js does not correctly export its typings.
 * @public
 */
export type NextAuthResultSignIn = <
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
	P extends ProviderId,
	R extends boolean = true
>(
	/** Provider to sign in to */
	provider?: P, // See: https://github.com/microsoft/TypeScript/issues/29729
	options?:
		| FormData
		| ({
				/** The relative path to redirect to after signing in. By default, the user is redirected to the current page. */
				redirectTo?: string;
				/** If set to `false`, the `signIn` method will return the URL to redirect to instead of redirecting automatically. */
				redirect?: R;
		  } & Record<string, unknown>),
	authorizationParams?:
		| string[][]
		| Record<string, string>
		| string
		| URLSearchParams
) => Promise<R extends false ? unknown : never>;

/**
 * Equivalent to `NextAuthResult` from Auth.js, but specifies that the session user matches the type in the database.
 * @public
 */
export interface NextAuthResultFixed {
	/**
	 * A universal method for interacting with Auth.js. Can be used as middleware or to get the current session.
	 * @param args - The authentication context.
	 * @returns The current session, or a route handler function if used as middleware.
	 */
	auth: NextAuthResultAuth;

	/** The Auth.js route handler methods. */
	handlers: NextAuthResult["handlers"];

	/**
	 * Sign in with a provider.
	 * @param provider - The provider to sign in with, or `undefined` to redirect the user to the sign-in page.
	 * @param options - The sign in options.
	 */
	signIn: NextAuthResultSignIn;

	/**
	 * Sign out the current user.
	 * @param options - The sign out options.
	 */
	signOut: NextAuthResult["signOut"];
}

// eslint-disable-next-line new-cap
export const { auth, handlers, signIn, signOut } = NextAuth({
	// The adapter that is used to connect the provider (Discord) to the database (PostgreSQL via the Drizzle ORM).
	// eslint-disable-next-line new-cap
	adapter: DrizzleAdapter(db, {
		accountsTable: oauthTable,
		sessionsTable: sessionTable,
		usersTable: playerTable
	}),
	providers: [provider]
}) as unknown as NextAuthResultFixed;
