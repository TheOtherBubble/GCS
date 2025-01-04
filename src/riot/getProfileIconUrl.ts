import getDataDragonVersion from "./getDataDragonVersion";

/**
 * Get the given profile icon's URL.
 * @param id - The profile icon's ID.
 * @returns The URL.
 * @see {@link https://developer.riotgames.com/docs/lol#data-dragon_other | Other}
 * @public
 */
export default async function getProfileIconUrl(id: number | `${number}`) {
	const version = await getDataDragonVersion();
	if (!version) {
		return void 0;
	}

	return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${typeof id === "number" ? id.toString() : id}.png`;
}
