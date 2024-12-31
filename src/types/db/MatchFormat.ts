import type { matchFormatEnum } from "db/schema";

/**
 * A match format, as retrieved from the database.
 * @public
 */
export type MatchFormat = (typeof matchFormatEnum.enumValues)[number];
