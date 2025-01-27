import type DataDragonResponse from "types/riot/DataDragonResponse";
import type FullChampionData from "types/riot/FullChampionData";
import getDataDragonVersion from "./getDataDragonVersion";

/**
 * Get the given champion.
 * @param id - The champion's ID.
 * @return The champion.
 * @see {@link https://developer.riotgames.com/docs/lol#data-dragon_champions | Champions}
 * @public
 */
export default async function getChampion(
	id: string
): Promise<FullChampionData | undefined> {
	const version = await getDataDragonVersion();
	if (!version) {
		return void 0;
	}

	const request = await fetch(
		`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${id}.json`
	);
	if (!request.ok) {
		return void 0;
	}

	return (
		(await request.json()) as DataDragonResponse<
			Record<string, FullChampionData>
		>
	).data[id];
}
