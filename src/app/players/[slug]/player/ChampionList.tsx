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
 * @return The list.
 * @public
 */
export default async function ChampionList({
	required,
	...props
}: ChampionListProps): Promise<JSX.Element> {
	return (
		<select required={required} {...props}>
			{!required && <option />}
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
