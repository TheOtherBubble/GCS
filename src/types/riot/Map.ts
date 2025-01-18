/**
 * A map.
 * @see {@link https://developer.riotgames.com/docs/lol#working-with-lol-apis_game-constants | Game Constants}
 * @public
 */
export default interface Map {
	/** The map's ID. */
	mapId: number;

	/** The name of the map. */
	mapName: string;

	/** Notes about the map. */
	notes: string;
}
