import { type Explanation as ExplanationType } from "@/lib/algorithms/algorithm";
import Grid from "./grid";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Info } from "lucide-react";
import { Fragment } from "react";

interface ExplanationProps {
	explanation: ExplanationType;
}

const Explanation = ({ explanation }: ExplanationProps) => {
	return (
		<Drawer direction="right">
			<DrawerTrigger>
				<Info />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Vysvětlení postupu</DrawerTitle>
					<DrawerDescription />
				</DrawerHeader>
				<div className="flex flex-col gap-4 p-4 overflow-auto">
					{explanation.map((step, i) => (
						<Card
							key={i}
							className="rounded-md min-w-96">
							<CardTitle>
								<CardHeader className="p-3">
									{i + 1}. {step.name}
								</CardHeader>
							</CardTitle>
							<CardContent className="text-center p-3 pt-0">
								{step.details && (
									<div className="grid grid-cols-[auto,1fr] gap-2 justify-items-center">
										{Object.entries(step.details).map(([key, value]) => (
											<Fragment key={key}>
												<div className="capitalize text-left w-full font-bold">{key}:</div>
												<div className="w-full text-left opacity-70">
													{value === "" && "(Empty string)"}
													{value === 0 && "0"}
													{value === null && "(null)"}
													{value === undefined && "(undefined)"}
													{value}
												</div>
											</Fragment>
										))}
									</div>
								)}
								{step.grid && (
									<Grid
										small
										grid={step.grid}
									/>
								)}
							</CardContent>
						</Card>
					))}
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default Explanation;
