import type { positionEnum } from "db/schema";

/**
 * A League of Legends position.
 * @public
 */
export type Position = (typeof positionEnum.enumValues)[number];
