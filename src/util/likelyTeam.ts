/**
 * Given the PUUIDs of the accounts on two teams, determine which of the teams the given list of PUUIDs most likely represents.
 * @param unknown - The list of PUUIDs to match to a team.
 * @param teams - A map of the IDs of the teams in the match to the lists of the PUUIDS of the accounts of the players on those teams.
 * @returns The ID of the team that most closely matches `unknown` within `puuids`, or `undefined` if no team matches at all.
 * @public
 */
export default function likelyTeam(
	unknown: string[],
	teams: Map<number, string[]>
) {
	let out: number | undefined = void 0;
	let outScore = 0;
	for (const [teamId, puuids] of teams.entries()) {
		const score = unknown.filter((a) => puuids.some((b) => a === b)).length;
		if (score <= outScore) {
			continue;
		}

		out = teamId;
		outScore = score;
	}

	return out;
}
