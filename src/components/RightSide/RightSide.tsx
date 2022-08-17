import React from "react";
import { CaretLeft, CaretRight } from "phosphor-react";

import { getMonthDays } from "../../helper/getMonthDays";

type Props = {
	year: number;
	month: number;
	today: number;
	monthsNames: Array<string>;
	daysNames: Array<string>;
	nextMonth: () => void;
	prevMonth: () => void;
};

const RightSide: React.FC<Props> = (props: Props) => {
	const { monthsNames, month, year, today, daysNames, nextMonth, prevMonth } = props;

	const result = getMonthDays({ year, month });

	return (
		<div className="w-1/2 h-screen bg-white px-10">
			<div className="h-1/2 flex justify-center items-center">
				<div className="space-y-3">
					<div className="flex items-center space-x-3 justify-center">
						<button onClick={() => prevMonth()} className="hover:text-pink-500">
							<CaretLeft weight="bold" size={"1.2rem"} />
						</button>
						<span className="font-hero text-2xl font-bold -mt-0.5">{monthsNames[month]}</span>
						<button onClick={() => nextMonth()} className="hover:text-pink-500">
							<CaretRight weight="bold" size={"1.2rem"} />
						</button>
					</div>

					<div>
						<span className="font-hero font-thin text-slate-300 text-8xl tracking-wider">
							2K{year.toString().slice(-2)}
						</span>
					</div>
				</div>
			</div>

			<div className="h-1/2 flex justify-center ">
				<div className="container max-w-md h-max grid grid-cols-7 grid-flow-row gap-2">
					{daysNames.map((dayName) => (
						<div
							key={dayName}
							className="font-hero font-bold uppercase text-center mb-5 text-slate-600"
						>
							{dayName.slice(0, 3)}
						</div>
					))}

					{result.map((day) => (
						<div
							key={day.status + day.day}
							className={`text-center font-hero font-medium cursor-pointer ${
								day.status === "current" ? "text-slate-600" : "text-slate-300"
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
