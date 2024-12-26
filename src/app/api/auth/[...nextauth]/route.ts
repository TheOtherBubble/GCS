import { handlers } from "db/auth";

/**
 * The HTTP request handlers. Necessary for NextAuth.js to work.
 * @public
 */
export const { GET, POST } = handlers;
