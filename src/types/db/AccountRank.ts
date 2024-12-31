import type { accountRankEnum } from "db/schema";

/**
 * An account rank, as retrieved from the database.
 * @public
 */
export type AccountRank = (typeof accountRankEnum.enumValues)[number];
