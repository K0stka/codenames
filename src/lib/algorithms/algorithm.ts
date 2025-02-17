export type Grid = [
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean]
];

export type Word = string;
export type Hint = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "∞";

export type Explanation = {
	name: string;
	details?: Record<string, string | number | undefined | null>;
	grid?: Grid;
}[];

export const Empty: {
	grid: Grid;
	word: Word;
	hint: Hint;
	datasetState: Algorithm["datasetState"];
} = {
	grid: [
		[false, false, false, false, false],
		[false, false, false, false, false],
		[false, false, false, false, false],
		[false, false, false, false, false],
		[false, false, false, false, false],
	],
	word: "",
	hint: "0",
	datasetState: {
		loaded: false,
		message: "Načítání...",
	},
};

export abstract class Algorithm {
	abstract readonly name: string;

	abstract encode: (grid: Grid) => Promise<[Word, Hint, Explanation]>;
	abstract decode: (word: Word, hint: Hint) => Promise<[Grid, Explanation]>;

	mount = async (onMountCallback: (datasetInfo: Algorithm["datasetState"]) => void) => {
		if (!this.datasetState.loaded) this.datasetState = await this.loadDataset();

		onMountCallback(this.datasetState);
	};

	private datasetState: {
		loaded: boolean;
		message: string;
	} = Empty.datasetState;
	public get dataset(): Algorithm["datasetState"] {
		return this.datasetState;
	}

	protected abstract loadDataset: () => Promise<Algorithm["datasetState"]>;

	protected getInitialEncodeStep = (grid: Grid): Explanation[number] => ({
		name: "Vstupy",
		grid,
	});
	protected addFinalEncodeStep = (name: string, word: Word, hint: Hint, steps: Explanation): [Word, Hint, Explanation] => [
		word,
		hint,
		[
			...steps,
			{
				name,
				details: {
					word,
					hint,
				},
			},
		],
	];
	protected getInitialDecodeStep = (word: Word, hint: Hint): Explanation[number] => ({
		name: "Vstupy",
		details: {
			word,
			hint,
		},
	});
	protected addFinalDecodeStep = (name: string, grid: Grid, steps: Explanation): [Grid, Explanation] => [grid, [...steps, { name, grid }]];
}
