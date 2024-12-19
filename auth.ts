import { oauthAccounts, players, sessions } from "./src/db/schema";
import Discord from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import db from "./src/db/db";

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
	email: profile.email,
	id: profile.id, // This one just makes a UUID for some reason.
	name: profile.display_name
});

/**
 * The Auth.js configuration.
 * @see {@link https://authjs.dev/getting-started/installation?framework=Next.js | Installation}
 * @see {@link https://authjs.dev/getting-started/authentication/oauth | OAuth}
 * @see {@link https://authjs.dev/getting-started/database | Database Adapters}
 * @public
 */
// eslint-disable-next-line new-cap
export default NextAuth({ adapter, providers: [provider] });

// TODO: It'd be nice to split up the default export into `{ auth, handlers, signIn, signOut }`, but Auth.js doesn't export the types of `auth` correctly.
