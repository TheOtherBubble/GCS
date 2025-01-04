/**
 * A Riot account DTO.
 * @public
 */
export default interface AccountDto {
	/** The account's player universally unique ID (PUUID). */
	puuid: string;

	/** The account's game name. */
	gameName: string;

	/** The account's tag line. */
	tagLine: string;
}
