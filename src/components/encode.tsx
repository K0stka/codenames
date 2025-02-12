"use client";

import { type Grid as GridType } from "@/lib/gridHash";
import Grid from "./grid";
import { ArrowBigRightDash } from "lucide-react";
import { Input } from "./ui/input";
import { Hint } from "@/App";

interface EncodeProps {
	grid: GridType;
	onGridChange: (grid: GridType) => void;
	correctAmountOfSelectedSquares: boolean;
	word: string;
	hint: Hint;
}

const Encode = ({ grid, onGridChange, correctAmountOfSelectedSquares, word, hint }: EncodeProps) => {
	return (
		<>
			<Grid
				grid={grid}
				onGridChange={onGridChange}
			/>
			<ArrowBigRightDash size={48} />
			{correctAmountOfSelectedSquares ? (
				<div className="flex items-center gap-2">
					<Input
						value={word}
						readOnly
						className="pointer-events-none"
					/>
					<Input
						value={hint}
						readOnly
						className="w-10 text-center pointer-events-none"
					/>
				</div>
			) : (
				<div className="flex items-center gap-2">Prosím zvolte správný počet políček.</div>
			)}
		</>
	);
};

export default Encode;
