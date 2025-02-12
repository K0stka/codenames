import { Hint } from "@/App";
import { useState } from "react";

export type Dictionary = {
	w: string;
	l: string[];
}[];

export const useDictionary = () => {
	const [dictionary, setDictionary] = useState<Dictionary>([]);

	return {
		dictionary,
		loaded: dictionary.length > 0,
		load: () => {
			fetch("/dictionary.json")
				.then((res) => res.json())
				.then(setDictionary);
		},
	};
};

const hintToNumber = (hint: Hint): number => {
	switch (hint) {
		case "0":
			return 0;
		case "1":
			return 1;
		case "2":
			return 2;
		case "3":
			return 3;
		case "4":
			return 4;
		case "5":
			return 5;
		case "6":
			return 6;
		case "7":
			return 7;
		case "8":
			return 8;
		case "9":
			return 9;
		case "∞":
			return 10;
	}
};

export const numberToHint = (number: number): Hint => {
	switch (number) {
		case 0:
			return "0";
		case 1:
			return "1";
		case 2:
			return "2";
		case 3:
			return "3";
		case 4:
			return "4";
		case 5:
			return "5";
		case 6:
			return "6";
		case 7:
			return "7";
		case 8:
			return "8";
		case 9:
			return "9";
		case 10:
			return "∞";
	}

	throw new Error(`Invalid hint number ${number}`);
};

export const numberToWordAndHint = (number: number, dictionary: Dictionary): { word: string; hint: Hint } => ({
	word: dictionary[number % dictionary.length].w,
	hint: numberToHint(Math.floor(number / dictionary.length)),
});

export const wordAndHintToNumber = (word: string, hint: Hint, dictionary: Dictionary): number | null => {
	const number = dictionary.findIndex((entry) => entry.w === word);

	if (number === -1) return null;

	return number + hintToNumber(hint) * dictionary.length;
};
