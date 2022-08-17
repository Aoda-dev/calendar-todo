import { useState } from "react";
import * as dayjs from "dayjs";

import LeftSide from "./components/LeftSide/LeftSide";
import RightSide from "./components/RightSide/RightSide";

const App: React.FC = () => {
	const [year, setYear] = useState<number>(dayjs().year());
	const [month, setMonth] = useState<number>(dayjs().month());
	const [today, setToday] = useState<number>(dayjs().day());

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

	//nned to change year
	const nextMonth = () => {
		console.log("nextMonth");
		setMonth((prev) => prev + 1);
	};
	const prevMonth = () => {
		console.log("prevMonth");
		setMonth((prev) => prev - 1);
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<LeftSide />
			<RightSide
				year={year}
				month={month}
				monthsNames={monthsNames}
				daysNames={daysNames}
				today={today}
				nextMonth={nextMonth}
				prevMonth={prevMonth}
			/>
		</div>
	);
};

export default App;
