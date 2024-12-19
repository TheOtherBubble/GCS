import auth from "../auth";

/**
 * Middleware to keep the Auth.js (NextAuth.js) session alive.
 * @see {@link https://authjs.dev/getting-started/installation?framework=Next.js | Installation}
 * @public
 */
export const middleware: (typeof auth)["auth"] = auth.auth;
