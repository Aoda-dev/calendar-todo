import React, { memo, useEffect } from "react";
import dayjs from "dayjs";
import { CaretLeft, CaretRight, List } from "phosphor-react";

import { getMonthDays } from "../../helper/getMonthDays";
import AllTodos from "../../interfaces/AllTodos";

type Props = {
	year: number;
	month: number;
	monthsNames: Array<string>;
	daysNames: Array<string>;
	setOpenLeftSide: (state: boolean) => void;
	nextMonth: () => void;
	prevMonth: () => void;
	pickDate: (date: string) => void;
	setCurrentDate: (state: string) => void;
	allTodos: Array<AllTodos>;
};

const RightSide: React.FC<Props> = (props: Props) => {
	const {
		setOpenLeftSide,
		monthsNames,
		month,
		year,
		daysNames,
		nextMonth,
		prevMonth,
		pickDate,
		setCurrentDate,
		allTodos,
	} = props;

	const result = getMonthDays({ year, month, allTodos });
	const todayDate = dayjs().format("YYYY-M-D");

	return (
		<div className="relative h-screen w-screen bg-white px-10 md:static md:w-1/2">
			<div
				onClick={() => {
					setOpenLeftSide(true);
				}}
				className="absolute left-5 top-5 cursor-pointer text-3xl md:hidden"
			>
				<List />
			</div>

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
				<div className="container mt-2 grid h-max max-w-md grid-flow-row grid-cols-7 md:gap-2">
					{daysNames.map((dayName) => (
						<div key={dayName} className="text-center font-hero font-bold uppercase text-slate-600">
							{dayName.slice(0, 3)}
						</div>
					))}
				</div>

				<div className="text-md container grid h-full max-w-md grid-flow-row grid-cols-7 pb-8 md:h-max md:gap-2 md:pb-0">
					{result.map((day) => (
						<div
							key={day.status + day.day}
							onClick={() => {
								pickDate(day.date);
								setCurrentDate(day.date);
							}}
							className={`flex cursor-pointer items-center justify-center font-hero font-medium ${
								day.status === "current" ? "text-zinc-600" : "text-zinc-300"
							} hover:text-pink-500`}
						>
							{day.date === todayDate ? (
								<div
									className={`flex h-7 w-7 items-center justify-center rounded-full ${
										day.status === "current" ? "bg-pink-500" : "bg-pink-300"
									} ${day.todo ? "text-white" : "text-zinc-50"}`}
								>
									{day.day}
								</div>
							) : (
								<span
									className={`${
										day.todo &&
										`font-bold ${day.status === "current" ? "text-pink-500" : "text-pink-300"}`
									}`}
								>
									{day.day}
								</span>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RightSide;
