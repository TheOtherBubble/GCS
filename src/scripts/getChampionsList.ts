import type ChampionData from "types/riot/ChampionData";
import type DataDragonResponse from "types/riot/DataDragonResponse";
import getDataDragonVersion from "./getDataDragonVersion";

/**
 * Get a list of champion data from Data Dragon.
 * @returns A map of champion IDs to champion data.
 * @see {@link https://developer.riotgames.com/docs/lol#data-dragon_champions | Champions}
 * @public
 */
export default async function getChampionsList() {
	const version = await getDataDragonVersion();
	if (!version) {
		return void 0;
	}

	const request = await fetch(
		`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
	);
	if (!request.ok) {
		return void 0;
	}

	return (
		(await request.json()) as DataDragonResponse<Record<string, ChampionData>>
	).data;
}
