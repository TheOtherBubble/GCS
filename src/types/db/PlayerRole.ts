import type { playerRoleEnum } from "db/schema";

/**
 * A player role, as retrieved from the database.
 * @public
 */
export type PlayerRole = (typeof playerRoleEnum.enumValues)[number];
