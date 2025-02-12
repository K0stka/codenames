import { AlertTriangle, Download, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";

import { Button } from "./components/ui/button";
import Decode from "./components/decode";
import Encode from "./components/encode";
import { Switch } from "./components/ui/switch";
import { cn } from "./lib/utils";
import { getState } from "./lib/state";

export type Hint = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "∞";

export type NumberOfSquares = 8 | 9;

function App() {
	const { mode, setMode, numberOfSquares, setNumberOfSquares, grid, setGrid, correctAmountOfSelectedSquares, word, setWord, hint, setHint, dictionaryLoaded, lookupLoaded, load, loading } = getState();

	return dictionaryLoaded && lookupLoaded ? (
		<div className={cn("w-dvw h-dvh items-center justify-center grid grid-rows-[1fr,auto] gap-4 p-10")}>
			<div className="inline-grid items-center justify-center justify-items-center gap-4 grid-cols-[1fr,auto,1fr]">
				{mode === "encode" && (
					<Encode
						grid={grid}
						onGridChange={setGrid}
						correctAmountOfSelectedSquares={correctAmountOfSelectedSquares}
						word={word}
						hint={hint}
					/>
				)}
				{mode === "decode" && (
					<Decode
						grid={grid}
						onWordChange={setWord}
						onHintChange={setHint}
						word={word}
						hint={hint}
						correctAmountOfSelectedSquares={correctAmountOfSelectedSquares}
					/>
				)}
			</div>
			<div className="flex items-center justify-center gap-2">
				Hraji jako
				<b
					className={cn({
						"text-secondary-foreground": mode === "encode",
					})}>
					hlavní špión
				</b>
				<Switch
					checked={mode !== "encode"}
					onCheckedChange={(checked) => setMode(checked ? "decode" : "encode")}
				/>
				<b
					className={cn({
						"text-secondary-foreground": mode === "decode",
					})}>
					hráč
				</b>
				s
				<Select
					defaultValue={numberOfSquares.toString()}
					onValueChange={(v) => setNumberOfSquares(parseInt(v) as NumberOfSquares)}>
					<SelectTrigger className="w-16">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="8">8</SelectItem>
						<SelectItem value="9">9</SelectItem>
					</SelectContent>
				</Select>
				agenty
			</div>
		</div>
	) : (
		<div className="w-dvw h-dvh flex items-center justify-center flex-col gap-4">
			{loading ? (
				<div className="flex items-center justify-center gap-2">
					<Loader2 className="animate-spin" />
					Načítám data...
				</div>
			) : (
				<>
					<h1 className="text-2xl font-bold flex items-center gap-2">
						<AlertTriangle />
						Upozornění
					</h1>
					<div className="text-center">
						Ke urychlení výpočtů je potřeba stáhnout ~12MB dat
						<br />
						(případně ~130MB, pokud Váš prohlížeč nepodporuje gzip).
						<br />
						Chcete pokračovat?
					</div>
					<Button onClick={load}>
						<Download />
						Stáhnout data
					</Button>
				</>
			)}
		</div>
	);
}

export default App;
