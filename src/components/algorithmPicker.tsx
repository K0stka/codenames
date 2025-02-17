import { FileCheck, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

import { Algorithm } from "../lib/algorithms/algorithm";

interface AlgorithmPickerProps {
	algorithm: Algorithm | null;
	algorithms: Map<string, Algorithm>;
	setAlgorithm: (algorithm: Algorithm | null) => void;
	algorithmDatasetState: Algorithm["datasetState"];
}

const AlgorithmPicker = ({ algorithm, algorithms, setAlgorithm, algorithmDatasetState }: AlgorithmPickerProps) => {
	return (
		<div className="inline-flex items-center gap-3 justify-center">
			{algorithm && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className="cursor-help">{algorithmDatasetState.loaded ? <FileCheck className="text-lime-600" /> : <FileDown className="text-neutral-600 animate-pulse" />}</TooltipTrigger>
						<TooltipContent>{algorithmDatasetState.message}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
			<Select
				defaultValue={algorithm?.name}
				onValueChange={(v: string) => {
					setAlgorithm(algorithms.get(v) ?? null);
				}}>
				<SelectTrigger className="w-auto gap-3 border-none focus:ring-transparent p-0">
					<SelectValue placeholder="Zvolte algoritmus" />
				</SelectTrigger>
				<SelectContent align="center">
					{Array.from(algorithms.keys()).map((name) => (
						<SelectItem
							key={name}
							value={name}>
							{name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default AlgorithmPicker;
