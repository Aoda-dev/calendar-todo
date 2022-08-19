import { useEffect, useState } from "react";
import * as dayjs from "dayjs";

import LeftSide from "./components/LeftSide/LeftSide";
import RightSide from "./components/RightSide/RightSide";
import Pick from "./interfaces/Pick";

const App: React.FC = () => {
	const [year, setYear] = useState<number>(dayjs().year());
	const [month, setMonth] = useState<number>(dayjs().month());
	const [pick, setPick] = useState<Pick>();

	const daysNames: Array<string> = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const monthsNames: Array<string> = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	useEffect(() => {
		setPick({
			dayName: daysNames[dayjs().day()],
			dayNumber: dayjs().date(),
			monthName: monthsNames[dayjs().month()],
			todos: null,
		});

		// todo todos from localstorgae
	}, []);

	const pickDate = (date: string): void => {
		const $dayjs = dayjs(date, "YYYY-MM-DD");

		setPick({
			dayName: daysNames[$dayjs.day()],
			dayNumber: $dayjs.date(),
			monthName: monthsNames[$dayjs.month()],
			todos: null,
		});

		// todo todos from localstorgae
	};

	const addTodo = (date: string): void => {
		console.log("add todo");
	};

	const nextMonth = (): void => {
		if (month >= 11) {
			return (() => {
				setYear((prev) => prev + 1);
				setMonth(0);
			})();
		}

		setMonth((prev) => prev + 1);
	};

	const prevMonth = (): void => {
		if (month <= 0) {
			return (() => {
				setYear((prev) => prev - 1);
				setMonth(11);
			})();
		}

		setMonth((prev) => prev - 1);
	};

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<LeftSide pick={pick} addTodo={addTodo} />
			<RightSide
				year={year}
				month={month}
				monthsNames={monthsNames}
				daysNames={daysNames}
				nextMonth={nextMonth}
				prevMonth={prevMonth}
				pickDate={pickDate}
			/>
		</div>
	);
};

export default App;
