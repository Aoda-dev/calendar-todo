import React from "react";
import { CaretLeft, CaretRight } from "phosphor-react";

import { getMonthDays } from "../../helper/getMonthDays";

type Props = {
	year: number;
	month: number;
	monthsNames: Array<string>;
	daysNames: Array<string>;
	nextMonth: () => void;
	prevMonth: () => void;
	pickDate: (date: string) => void;

	setCurrentDate: (state: string) => void;
};

const RightSide: React.FC<Props> = (props: Props) => {
	const { monthsNames, month, year, daysNames, nextMonth, prevMonth, pickDate, setCurrentDate } =
		props;

	const result = getMonthDays({ year, month });

	return (
		<div className="h-screen w-1/2 bg-white px-10">
			<div className="flex h-1/2 items-center justify-center">
				<div className="space-y-3">
					<div className="flex items-center justify-center space-x-3">
						<button onClick={() => prevMonth()} className="hover:text-pink-500">
							<CaretLeft weight="bold" size={"1.2rem"} />
						</button>
						<span className="-mt-0.5 font-hero text-2xl font-bold">{monthsNames[month]}</span>
						<button onClick={() => nextMonth()} className="hover:text-pink-500">
							<CaretRight weight="bold" size={"1.2rem"} />
						</button>
					</div>

					<div>
						<span className="font-hero text-8xl font-thin tracking-wider text-slate-300">
							2K{year.toString().slice(-2)}
						</span>
					</div>
				</div>
			</div>

			<div className="flex h-1/2 flex-col items-center space-y-6">
				<div className="container mt-2 grid h-max max-w-md grid-flow-row grid-cols-7 gap-2">
					{daysNames.map((dayName) => (
						<div key={dayName} className="text-center font-hero font-bold uppercase text-slate-600">
							{dayName.slice(0, 3)}
						</div>
					))}
				</div>

				<div className="container grid h-max max-w-md grid-flow-row grid-cols-7 gap-2">
					{result.map((day) => (
						<div
							key={day.status + day.day}
							onClick={() => {
								pickDate(day.date);
								setCurrentDate(day.date);
							}}
							className={`cursor-pointer text-center font-hero font-medium ${
								day.status === "current" ? "text-zinc-600" : "text-zinc-300"
							} hover:text-pink-500`}
						>
							{day.day}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RightSide;
