/**
 * Functions responsible for mapping 5x5 grid with exactly 9 selected fields to a single number and back
 */

import { Lookup, binaryToOrdinal, ordinalToBinary } from "./lookup";

import { NumberOfSquares } from "@/App";

export type Grid = [
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean]
];

const emptyGrid: Grid = [
	[false, false, false, false, false],
	[false, false, false, false, false],
	[false, false, false, false, false],
	[false, false, false, false, false],
	[false, false, false, false, false],
];

export const getEmptyGrid = (): Grid => emptyGrid;

/**
 * Maps 5x5 grid with exactly numberOfSquares (8 or 9) selected fields to a single number
 */
export const gridToNumber = (grid: Grid, numberOfSquares: NumberOfSquares, lookup: Lookup): number =>
	binaryToOrdinal(
		grid
			.flat()
			.map((v) => (v ? "1" : "0"))
			.join(""),
		numberOfSquares,
		lookup
	) ?? 0;

/**
 * Maps a single number to 5x5 grid with exactly numberOfSquares (8 or 9) selected fields
 */
export const numberToGrid = (number: number, numberOfSquares: NumberOfSquares, lookup: Lookup): Grid => {
	const binary = ordinalToBinary(number, numberOfSquares, lookup);

	if (binary === null) return emptyGrid;

	return [
		[binary[0] === "1", binary[1] === "1", binary[2] === "1", binary[3] === "1", binary[4] === "1"],
		[binary[5] === "1", binary[6] === "1", binary[7] === "1", binary[8] === "1", binary[9] === "1"],
		[binary[10] === "1", binary[11] === "1", binary[12] === "1", binary[13] === "1", binary[14] === "1"],
		[binary[15] === "1", binary[16] === "1", binary[17] === "1", binary[18] === "1", binary[19] === "1"],
		[binary[20] === "1", binary[21] === "1", binary[22] === "1", binary[23] === "1", binary[24] === "1"],
	];
};
