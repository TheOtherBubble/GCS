import type { matchTeamEnum } from "db/schema";

/**
 * A match team, as retrieved from the database.
 * @public
 */
export type MatchTeam = (typeof matchTeamEnum.enumValues)[number];
