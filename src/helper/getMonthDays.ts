import dayjs from "dayjs";

interface ArrDays {
	status: string;
	day: number;
	date: string;
}

type Props = {
	month: Number;
	year: Number;
};

export const getMonthDays = (options: Props): Array<ArrDays> => {
	// bind todos here
	const { year, month } = options;

	const arrDays: Array<ArrDays> = [];

	let PAST_MONTH_DAYS = dayjs(`${year}-${+month}-1`).daysInMonth();
	let CURRENT_MONTH_DAYS = dayjs(`${year}-${+month + 1}-1`).daysInMonth();
	let FUTURE_MONTH_DAYS = dayjs(`${year}-${+month + 2}-1`).daysInMonth();

	const CURRENT_MONTH_DAYS_FIRST_DAY = dayjs(`${year}-${+month + 1}-1`).day();

	for (let i = 0; i < CURRENT_MONTH_DAYS_FIRST_DAY; i++) {
		arrDays.unshift({
			status: "past",
			day: PAST_MONTH_DAYS,
			date: `${year}-${month}-${PAST_MONTH_DAYS}`,
		});
		PAST_MONTH_DAYS--;
	}

	for (let i = 1; i <= CURRENT_MONTH_DAYS; i++) {
		arrDays.push({ status: "current", day: i, date: `${year}-${+month + 1}-${i}` });
	}

	for (let i = 1; i <= FUTURE_MONTH_DAYS; i++) {
		if (arrDays.length === 42) break;
		arrDays.push({ status: "future", day: i, date: `${year}-${+month + 2}-${i}` });
	}

	return arrDays;
};
