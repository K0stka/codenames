import { Algorithm, Empty, type Explanation, type Grid, type Hint, type Word } from "./algorithm";

const numberToHint = (number: number): Hint | null =>
	((
		{
			0: Empty.hint,
			1: "1",
			2: "2",
			3: "3",
			4: "4",
			5: "5",
			6: "6",
			7: "7",
			8: "8",
			9: "9",
			10: "∞",
		} as { [key: number]: Hint }
	)[number] ?? null);

const hintToNumber = (hint: Hint): number =>
	({
		"0": 0,
		"1": 1,
		"2": 2,
		"3": 3,
		"4": 4,
		"5": 5,
		"6": 6,
		"7": 7,
		"8": 8,
		"9": 9,
		"∞": 10,
	}[hint]);

export class DictionaryAlgorithm extends Algorithm {
	name = "Dictionary";

	private wordToOrdinal: Map<string, number> = new Map();
	private ordinalToWord: Map<number, string> = new Map();
	private numberOfWords: number = 0;

	private ordinalToBinary: Map<number, string> = new Map();
	private binaryToOrdinal: Map<string, number> = new Map();

	encode = async (grid: Grid): Promise<[Word, Hint, Explanation]> => {
		const steps: Explanation = [this.getInitialEncodeStep(grid)];

		const binary = grid
			.flat()
			.map((v) => (v ? "1" : Empty.hint))
			.join(Empty.word);

		steps.push({
			name: "Převod na binární číslo",
			details: {
				binary,
			},
		});

		const ordinal = this.binaryToOrdinal.get(binary);

		if (ordinal === undefined) return this.addFinalEncodeStep("Slovo nenalezeno", Empty.word, Empty.hint, steps);

		steps.push({
			name: "Převod na pořadové číslo konfigurace",
			details: {
				ordinal,
			},
		});

		const hint = numberToHint(Math.floor(ordinal / this.numberOfWords));

		if (hint === null) return this.addFinalEncodeStep("ID slova mimo kapacitu", Empty.word, Empty.hint, steps);

		const wordOrdinal = ordinal % this.numberOfWords;

		steps.push({
			name: "Spočítání slova a nápovědy",
			details: {
				wordOrdinal,
				hint,
			},
		});

		const word = this.ordinalToWord.get(wordOrdinal);

		return this.addFinalEncodeStep("Výsledek", word ?? Empty.word, hint, steps);
	};

	decode = async (word: Word, hint: Hint): Promise<[Grid, Explanation]> => {
		const steps: Explanation = [this.getInitialDecodeStep(word, hint)];

		const wordOrdinal = this.wordToOrdinal.get(word);

		steps.push({
			name: "Převod slova na číslo",
			details: {
				wordOrdinal,
			},
		});

		if (wordOrdinal === undefined) return this.addFinalDecodeStep("Slovo nenalezeno", Empty.grid, steps);

		const hintNumber = hintToNumber(hint);

		steps.push({
			name: "Převod nápovědy na číslo",
			details: {
				hintNumber,
			},
		});

		const ordinal = wordOrdinal + hintNumber * this.numberOfWords;

		steps.push({
			name: "Spočítání pořadového čísla konfigurace",
			details: {
				ordinal,
			},
		});

		const binary = this.ordinalToBinary.get(ordinal);

		steps.push({
			name: "Převod na binární číslo",
			details: {
				binary,
			},
		});

		if (binary === undefined) return this.addFinalDecodeStep("Nenalezena konfigurace pro dané slovo a nápovědu", Empty.grid, steps);

		const grid: Grid = [
			[binary[0] === "1", binary[1] === "1", binary[2] === "1", binary[3] === "1", binary[4] === "1"],
			[binary[5] === "1", binary[6] === "1", binary[7] === "1", binary[8] === "1", binary[9] === "1"],
			[binary[10] === "1", binary[11] === "1", binary[12] === "1", binary[13] === "1", binary[14] === "1"],
			[binary[15] === "1", binary[16] === "1", binary[17] === "1", binary[18] === "1", binary[19] === "1"],
			[binary[20] === "1", binary[21] === "1", binary[22] === "1", binary[23] === "1", binary[24] === "1"],
		];

		return this.addFinalDecodeStep("Výsledek", grid, steps);
	};

	protected loadDataset = async (): Promise<Algorithm["datasetState"]> => {
		try {
			const [dictionaryResponse, lookupEightResponse, lookupNineResponse] = await Promise.all([fetch("/algorithms/dictionary/dictionary.json"), fetch("/algorithms/dictionary/lookup-8.json"), fetch("/algorithms/dictionary/lookup-9.json")]);
			const sizeMB = Math.round(((Number(dictionaryResponse.headers.get("content-length")) + Number(lookupEightResponse.headers.get("content-length")) + Number(lookupNineResponse.headers.get("content-length"))) / 1024 / 1024) * 100) / 100;

			const [dictionary, lookupEight, lookupNine] = await Promise.all([dictionaryResponse.json(), lookupEightResponse.json(), lookupNineResponse.json()]);

			dictionary.forEach((word: string, index: number) => {
				this.wordToOrdinal.set(word, index);
				this.ordinalToWord.set(index, word);
			});

			this.numberOfWords = dictionary.length;

			lookupEight.forEach((b: string, i: number) => {
				this.ordinalToBinary.set(i, b);
				this.binaryToOrdinal.set(b, i);
			});

			lookupNine.forEach((b: string, i: number) => {
				this.ordinalToBinary.set(i + lookupEight.length, b);
				this.binaryToOrdinal.set(b, i + lookupEight.length);
			});

			return { loaded: true, message: `Načteno ${sizeMB} MB dat` };
		} catch (error) {
			return { loaded: false, message: `Chyba při načítání dat: ${error}` };
		}
	};
}
