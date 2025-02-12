"use client";

import { ArrowBigRightDash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { Input } from "./ui/input";
import { Hint } from "@/App";

import { type Grid as GridType } from "@/lib/gridHash";
import Grid from "./grid";

interface DecodeProps {
	grid: GridType;
	onWordChange: (word: string) => void;
	onHintChange: (hint: Hint) => void;
	word: string;
	hint: Hint;
	correctAmountOfSelectedSquares: boolean;
}

const Decode = ({ grid, word, onWordChange, hint, onHintChange, correctAmountOfSelectedSquares }: DecodeProps) => {
	return (
		<>
			<div className="flex items-center gap-2">
				<Input
					value={word}
					onChange={(e) => onWordChange(e.target.value.toLowerCase())}
					className="w-72"
				/>
				<Select
					defaultValue={hint}
					onValueChange={(v: typeof hint) => onHintChange(v)}>
					<SelectTrigger className="w-20">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">0</SelectItem>
						<SelectItem value="1">1</SelectItem>
						<SelectItem value="2">2</SelectItem>
						<SelectItem value="3">3</SelectItem>
						<SelectItem value="4">4</SelectItem>
						<SelectItem value="5">5</SelectItem>
						<SelectItem value="6">6</SelectItem>
						<SelectItem value="7">7</SelectItem>
						<SelectItem value="8">8</SelectItem>
						<SelectItem value="9">9</SelectItem>
						<SelectItem value="∞">∞</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<ArrowBigRightDash size={48} />
			{correctAmountOfSelectedSquares ? <Grid grid={grid} /> : <div className="flex items-center gap-2">Nastala chyba při dekódování</div>}
		</>
	);
};

export default Decode;
