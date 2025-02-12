import { Fragment } from "react/jsx-runtime";
import { type Grid } from "../lib/gridHash";
import { cn } from "@/lib/utils";

interface GridProps {
	grid: Grid;
	onGridChange?: (grid: Grid) => void;
}

const Grid = ({ grid, onGridChange }: GridProps) => {
	return (
		<div className="inline-grid grid-rows-5 grid-cols-5 bg-secondary gap-2 p-4 rounded-2xl">
			{grid.map((row, i) => (
				<Fragment key={i}>
					{row.map((cell, j) => {
						return (
							<div
								key={j}
								className={cn("size-10 rounded-sm", {
									"bg-orange-400": cell,
									"bg-gray-300": !cell,
									"cursor-pointer": !!onGridChange,
								})}
								onClick={() => {
									if (!onGridChange) return;

									grid[i][j] = !grid[i][j];

									onGridChange([...grid]);
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
