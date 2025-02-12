import * as fs from "fs";

import { createInterface } from "node:readline";

const computeHistogram = false;
const ignoreSameLetters = false;
const stripDiacritics = false;

const file = createInterface({
	input: fs.createReadStream("./src/assets/czech.txt"),
	crlfDelay: Infinity,
});

const parsed = [];

const existing = new Map();

const histogram = {};

for await (const line of file) {
	const word = stripDiacritics
		? line
				.split("/")[0]
				.toLowerCase()
				.normalize("NFD")
				.replace(/\p{Diacritic}/gu, "")
		: line.split("/")[0].toLowerCase();

	const letters = [];

	for (const letter of word) if (!letters.includes(letter)) letters.push(letter);

	const lettersSorted = letters.sort();
	const lettersHash = lettersSorted.join();

	if (ignoreSameLetters && existing.has(lettersHash)) continue;

	if (!ignoreSameLetters && existing.has(word)) continue;

	parsed.push({
		w: word,
		l: lettersSorted,
	});

	if (ignoreSameLetters) existing.set(lettersHash, true);
	else existing.set(word, true);

	if (computeHistogram) letters.forEach((l) => (histogram[l] = (histogram[l] ?? 0) + 1));
}

fs.writeFileSync("./public/dictionary.json", JSON.stringify(parsed));
fs.writeFileSync(
	"./public/stats.json",
	JSON.stringify(
		{
			numberOfWords: parsed.length,
			lettersFrequency: computeHistogram ? histogram : false,
		},
		null,
		2
	)
);

/**
 * Generate all binary numbers of length `length` with exactly `numberOfOnes` bits set to 1
 */
export const generateNumbers = (numberOfOnes, length) => {
	const numbers = [];

	let max = nCk(length, numberOfOnes);

	for (let i = 0b0; i < max; i++)
		if (
			i
				.toString(2)
				.split("")
				.reduce((acc, v) => acc + (v === "1" ? 1 : 0), 0) === numberOfOnes
		)
			numbers.push(i.toString(2).padStart(length, "0"));
		else max = max + 1;

	return numbers;
};

export const nCk = (n, k) => {
	let coefficient = 1;
	for (let x = n - k + 1; x <= n; x++) coefficient *= x;
	for (let x = 1; x <= k; x++) coefficient /= x;
	return coefficient;
};

fs.writeFileSync(
	"./public/lookup.json",
	JSON.stringify({
		eight: generateNumbers(8, 25),
		nine: generateNumbers(9, 25),
	})
);
