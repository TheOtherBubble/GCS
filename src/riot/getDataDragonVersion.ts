/**
 * Get the most recent version of Data Dragon.
 * @return The version.
 * @see {@link https://developer.riotgames.com/docs/lol#data-dragon_versions | Versions}
 * @public
 */
export default async function getDataDragonVersion(): Promise<
	string | undefined
> {
	const request = await fetch(
		"https://ddragon.leagueoflegends.com/api/versions.json"
	);
	if (!request.ok) {
		return void 0;
	}

	return ((await request.json()) as string[])[0];
}
