import { NumberOfSquares } from "@/App";
import { useState } from "react";

export type Lookup = {
	eight: string[];
	nine: string[];
};

export const useLookup = () => {
	const [lookup, setLookup] = useState<Lookup>({ eight: [], nine: [] });

	return {
		lookup,
		loaded: lookup.eight.length > 0 && lookup.nine.length > 0,
		load: () => {
			fetch("/lookup-8.json")
				.then((res) => res.json())
				.then((data) => setLookup((prev) => ({ ...prev, eight: data })));
			fetch("/lookup-9.json")
				.then((res) => res.json())
				.then((data) => setLookup((prev) => ({ ...prev, nine: data })));
		},
	};
};

export const binaryToOrdinal = (binary: string, mode: NumberOfSquares, lookup: Lookup): number | null => {
	switch (mode) {
		case 8:
			return lookup.eight.indexOf(binary) ?? null;
		case 9:
			return lookup.nine.indexOf(binary) ?? null;
	}
};

export const ordinalToBinary = (ordinal: number, mode: NumberOfSquares, lookup: Lookup): string | null => {
	switch (mode) {
		case 8:
			return lookup.eight[ordinal] ?? null;
		case 9:
			return lookup.nine[ordinal] ?? null;
	}
};
