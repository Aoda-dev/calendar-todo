import dayjs from "dayjs";
import AllTodos from "../interfaces/AllTodos";

export interface ArrDays {
	status: string;
	day: number;
	date: string;
	todo: boolean;
}

type Props = {
	month: Number;
	year: Number;
	allTodos: Array<AllTodos>;
};

export const getMonthDays = (options: Props): Array<ArrDays> => {
	const { year, month, allTodos } = options;

	const arrDays: Array<ArrDays> = [];

	let PAST_MONTH_DAYS = dayjs(`${year}-${+month}-1`).daysInMonth();
	let CURRENT_MONTH_DAYS = dayjs(`${year}-${+month + 1}-1`).daysInMonth();
	let FUTURE_MONTH_DAYS = dayjs(`${year}-${+month + 2}-1`).daysInMonth();

	const CURRENT_MONTH_DAYS_FIRST_DAY = dayjs(`${year}-${+month + 1}-1`).day();

	for (let i = 0; i < CURRENT_MONTH_DAYS_FIRST_DAY; i++) {
		const date = `${year}-${month}-${PAST_MONTH_DAYS}`;

		let index = allTodos.findIndex((d) => d.date === date);

		arrDays.unshift({
			status: "past",
			day: PAST_MONTH_DAYS,
			date: date,
			todo: index > -1 ? true : false,
		});
		PAST_MONTH_DAYS--;
	}

	for (let i = 1; i <= CURRENT_MONTH_DAYS; i++) {
		const date = `${year}-${+month + 1}-${i}`;

		let index = allTodos.findIndex((d) => d.date === date);

		arrDays.push({
			status: "current",
			day: i,
			date: date,
			todo: index > -1 ? true : false,
		});
	}

	for (let i = 1; i <= FUTURE_MONTH_DAYS; i++) {
		if (arrDays.length === 42) break;

		const date = `${year}-${+month + 2}-${i}`;

		let index = allTodos.findIndex((d) => d.date === date);

		arrDays.push({
			status: "future",
			day: i,
			date: date,
			todo: index > -1 ? true : false,
		});
	}

	return arrDays;
};
