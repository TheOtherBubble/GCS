import auth from "../../../../../auth";

/**
 * The HTTP request handlers. Necessary for NextAuth.js to work.
 * @public
 */
export const { GET, POST } = auth.handlers;
