import { Fragment } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { type Grid } from "@/lib/algorithms/algorithm";

interface GridProps {
	grid: Grid;
	onGridChange?: (grid: Grid) => void;
	small?: true;
}

const Grid = ({ grid, onGridChange, small }: GridProps) => {
	return (
		<div
			className={cn("inline-grid grid-rows-5 grid-cols-5 bg-secondary gap-2 p-4 rounded-2xl", {
				"gap-1 p-1.5 rounded-lg": small,
			})}>
			{grid.map((row, i) => (
				<Fragment key={i}>
					{row.map((cell, j) => {
						return (
							<div
								key={j}
								className={cn(
									"size-10 rounded-sm",
									{
										"size-3": small,
									},
									{
										"bg-orange-400": cell,
										"bg-white/10": !cell,
										"cursor-pointer": !!onGridChange,
									}
								)}
								onClick={() => {
									if (!onGridChange) return;

									const newGrid = grid.map((r) => [...r]);

									newGrid[i][j] = !newGrid[i][j];

									onGridChange(newGrid as Grid);
								}}
							/>
						);
					})}
				</Fragment>
			))}
		</div>
	);
};

export default Grid;
