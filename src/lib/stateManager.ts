import { Algorithm, Empty, Explanation, Grid, Hint, Word } from "./algorithms/algorithm";

import { useState } from "react";

export const getState = () => {
	let debounce: NodeJS.Timeout | null = null;

	const [algorithm, setAlgorithmState] = useState<Algorithm | null>(null);

	const [algorithmDatasetState, setAlgorithmDatasetState] = useState<Algorithm["datasetState"]>(Empty.datasetState);

	const [grid, setGridState] = useState<Grid>(Empty.grid);
	const [word, setWordState] = useState<Word>(Empty.word);
	const [hint, setHintState] = useState<Hint>(Empty.hint);

	const [explanation, setExplanation] = useState<Explanation>([]);

	const setAlgorithm = (algorithm: Algorithm | null) => {
		setAlgorithmState(algorithm);
		setAlgorithmDatasetState(algorithm?.dataset ?? Empty.datasetState);

		if (!algorithm) return;

		algorithm.mount(setAlgorithmDatasetState);
	};

	const setGrid = async (grid: Grid) => {
		if (!algorithm || !algorithmDatasetState.loaded) return;

		setGridState(grid);

		const [word, hint, explanation] = await algorithm.encode(grid);

		setWordState(word);
		setHintState(hint);
		setExplanation(explanation);
	};

	const setWord = async (word: Word) => {
		if (!algorithm || !algorithmDatasetState.loaded) return;

		const parsed = word.toLowerCase();

		setWordState(parsed);

		if (debounce) clearTimeout(debounce);

		debounce = setTimeout(async () => {
			const [grid, explanation] = await algorithm.decode(parsed, hint);

			setGridState(grid);
			setExplanation(explanation);
		}, 100);
	};

	const setHint = async (hint: Hint) => {
		if (!algorithm || !algorithmDatasetState.loaded) return;

		setHintState(hint);

		const [grid, explanation] = await algorithm.decode(word, hint);

		setGridState(grid);
		setExplanation(explanation);
	};

	return {
		algorithm,
		setAlgorithm,
		algorithmDatasetState,
		grid,
		setGrid,
		word,
		setWord,
		hint,
		setHint,
		explanation,
	};
};
