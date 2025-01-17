import type BanDto from "./BanDto";
import type ObjectivesDto from "./ObjectivesDto";

/**
 * Information about a team in a match.
 * @public
 */
export default interface TeamDto {
	/** The team's banned champions. */
	bans: BanDto[];

	/** The team's objectives. */
	objectives: ObjectivesDto;

	/** The team's ID. */
	teamId: number;

	/** Whether or not the team won the match. */
	win: boolean;
}
