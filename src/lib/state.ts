import { Hint, NumberOfSquares } from "@/App";
import { emptyGrid, gridToNumber, numberToGrid } from "./gridHash";
import { numberToWordAndHint, useDictionary, wordAndHintToNumber } from "./dictionary";
import { useEffect, useState } from "react";

import { useLookup } from "./lookup";

export const getState = () => {
	const [mode, setMode] = useState<"encode" | "decode">("encode");
	const [numberOfSquares, setNumberOfSquares] = useState<NumberOfSquares>(9);

	const [grid, setGrid] = useState(emptyGrid);

	const correctAmountOfSelectedSquares = grid.flat().reduce((acc, v) => acc + (v ? 1 : 0), 0) === numberOfSquares;

	const [word, setWord] = useState("");
	const [hint, setHint] = useState<Hint>("0");

	const { dictionary, loaded: dictionaryLoaded, load: loadDictionary } = useDictionary();
	const { lookup, loaded: lookupLoaded, load: loadLookup } = useLookup();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (mode !== "encode") return;

		if (!correctAmountOfSelectedSquares) {
			setWord("");
			setHint("0");
			return;
		}

		const { word: newWord, hint: newHint } = numberToWordAndHint(gridToNumber(grid, numberOfSquares, lookup), dictionary);

		setWord(newWord);
		setHint(newHint);
	}, [mode, grid]);

	useEffect(() => {
		if (mode !== "decode") return;

		const number = wordAndHintToNumber(word, hint, dictionary);

		if (number === null) {
			setGrid(emptyGrid);
			return;
		}

		setGrid(numberToGrid(number, numberOfSquares, lookup));
	}, [mode, word, hint]);

	return {
		mode,
		setMode,
		numberOfSquares,
		setNumberOfSquares,
		grid,
		setGrid,
		correctAmountOfSelectedSquares,
		word,
		setWord,
		hint,
		setHint,
		dictionaryLoaded,
		lookupLoaded,
		load: () => {
			setLoading(true);
			loadDictionary();
			loadLookup();
		},
		loading,
	};
};
