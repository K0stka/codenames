import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";

import { DictionaryAlgorithm } from "./lib/algorithms/dictionary";
import { CombinatorialAlgorithm } from "./lib/algorithms/combinatoric";
import Grid from "./components/grid";
import { Algorithm, type Hint } from "./lib/algorithms/algorithm";
import { Input } from "./components/ui/input";
import { cn } from "./lib/utils";
import { getState } from "./lib/stateManager";
import Explanation from "./components/explanation";
import AlgorithmPicker from "./components/algorithmPicker";

const algorithms = new Map<string, Algorithm>();

const dictionaryAlgorithm = new DictionaryAlgorithm();
const combinatorialAlgorithm = new CombinatorialAlgorithm();

algorithms.set(dictionaryAlgorithm.name, dictionaryAlgorithm);
algorithms.set(combinatorialAlgorithm.name, combinatorialAlgorithm);

function App() {
	const { algorithm, setAlgorithm, algorithmDatasetState, grid, setGrid, word, setWord, hint, setHint, explanation } = getState();

	return (
		<div className={cn("w-dvw h-dvh items-center justify-center grid grid-rows-[1fr,auto] gap-4 p-10")}>
			<div className="flex flex-col items-center justify-center gap-4">
				<Grid
					grid={grid}
					onGridChange={setGrid}
				/>
				<div className="flex items-center gap-2">
					<Input
						value={word}
						onChange={({ target }) => setWord(target.value)}
					/>
					<Select
						value={hint}
						onValueChange={(v: Hint) => setHint(v)}>
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
				{explanation.length > 0 && <Explanation explanation={explanation} />}
			</div>
			<AlgorithmPicker
				algorithm={algorithm}
				algorithms={algorithms}
				setAlgorithm={setAlgorithm}
				algorithmDatasetState={algorithmDatasetState}
			/>
		</div>
	);
}

export default App;
