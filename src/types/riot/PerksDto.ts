import type PerkStatsDto from "./PerkStatsDto";
import type PerkStyleDto from "./PerkStyleDto";

/**
 * Information about a full rune page in a match.
 * @public
 */
export default interface PerksDto {
	/** The stats section. */
	statPerks: PerkStatsDto;

	/** The runes section. */
	styles: PerkStyleDto[];
}
