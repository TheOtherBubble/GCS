import type { JSX } from "react";
import getChampionsList from "riot/getChampionsList";

/**
 * Properties that can be passed to a list of champions.
 * @public
 */
export type ChampionListProps = Omit<
	JSX.IntrinsicElements["select"],
	"children"
>;

/**
 * A list of champion names mapped to their IDs.
 * @returns The list.
 * @public
 */
export default async function ChampionList(props: ChampionListProps) {
	return (
		<select {...props}>
			{Object.entries((await getChampionsList()) ?? {}).map(
				([id, champion]) => (
					<option value={id} key={id}>
						{champion.name}
					</option>
				)
			)}
		</select>
	);
}
