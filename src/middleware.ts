import { auth as middleware } from "scripts/auth";

// Import is renamed so that IDEs auto-import `auth` from `auth.ts` rather than here.

/**
 * Middleware to keep the Auth.js (NextAuth.js) session alive.
 * @see {@link https://authjs.dev/getting-started/installation?framework=Next.js | Installation}
 * @public
 */
export default middleware;
