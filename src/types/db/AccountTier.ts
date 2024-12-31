import type { accountTierEnum } from "db/schema";

/**
 * An account tier, as retrieved from the database.
 * @public
 */
export type AccountTier = (typeof accountTierEnum.enumValues)[number];
