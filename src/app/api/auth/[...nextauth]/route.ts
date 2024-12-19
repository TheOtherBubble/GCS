import auth from "../../../../scripts/auth";

// TODO: Custom sign in pages? See https://authjs.dev/getting-started/session-management/custom-pages.

/**
 * The HTTP request handlers. Necessary for NextAuth.js to work.
 * @public
 */
export const { GET, POST } = auth.handlers;
