import type { platformEnum } from "db/schema";

/**
 * A League of Legends platform.
 * @public
 */
export type Platform = (typeof platformEnum.enumValues)[number];
