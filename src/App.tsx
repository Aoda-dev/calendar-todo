import { useEffect, useState } from "react";
import dayjs from "dayjs";

import LeftSide from "./components/LeftSide/LeftSide";
import RightSide from "./components/RightSide/RightSide";
import Pick from "./interfaces/Pick";
import CreateTodoTitle from "./components/CreateTodoTitle/CreateTodoTitle";
import AllTodos from "./interfaces/AllTodos";

const App: React.FC = () => {
	const [year, setYear] = useState<number>(dayjs().year());
	const [month, setMonth] = useState<number>(dayjs().month());
	const [pick, setPick] = useState<Pick>();
	const [currentDate, setCurrentDate] = useState<string>("");
	const [openCreateTodo, setOpenCreateTodo] = useState<boolean>(false);
	const [allTodos, setAllTodos] = useState<Array<AllTodos>>([]);

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
		setCurrentDate(dayjs().format("YYYY-M-D"));

		setPick({
			dayName: daysNames[dayjs().day()],
			dayNumber: dayjs().date(),
			monthNumber: dayjs().month() + 1,
			monthName: monthsNames[dayjs().month()],
			todos: null,
		});

		// todo todos from localstorgae
	}, []);

	const pickDate = (date: string): void => {
		const $dayjs = dayjs(date, "YYYY-MM-DD");
		const todos = allTodos?.filter((d) => d.date === date)[0] || null;

		setPick({
			dayName: daysNames[$dayjs.day()],
			dayNumber: $dayjs.date(),
			monthName: monthsNames[$dayjs.month()],
			monthNumber: $dayjs.month() + 1,
			todos: todos?.todos,
		});

		// todo todos from localstorgae
	};

	const addTodo = (todo: string): void => {
		if (todo.trim() === "") {
			return setOpenCreateTodo(false);
		}

		const $dayjs = dayjs(currentDate, "YYYY-MM-DD");
		const time = dayjs().format("HH:mm");
		const date = `${year}-${pick?.monthNumber}-${pick?.dayNumber}`;
		const index = allTodos?.findIndex((d) => d.date === date);

		if (index > -1) {
			const newTodos = allTodos.map((d) => {
				if (d.date === date) {
					d.todos.push({ time: time, todo: todo, done: false });
				}

				return d;
			});

			setAllTodos(newTodos);

			setPick({
				dayName: daysNames[$dayjs.day()],
				dayNumber: $dayjs.date(),
				monthName: monthsNames[$dayjs.month()],
				monthNumber: $dayjs.month() + 1,
				todos: allTodos?.filter((d) => d.date === date)[0].todos,
			});
		} else {
			setAllTodos((prev) => [
				...prev,
				{ date: date, todos: [{ time: time, todo: todo, done: false }] },
			]);

			setPick({
				dayName: daysNames[$dayjs.day()],
				dayNumber: $dayjs.date(),
				monthName: monthsNames[$dayjs.month()],
				monthNumber: $dayjs.month() + 1,
				todos: [{ time: time, todo: todo, done: false }],
			});
		}

		setOpenCreateTodo(false);
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
		<div className="flex h-screen w-screen items-center justify-center overflow-hidden">
			<LeftSide pick={pick} setOpenCreateTodo={setOpenCreateTodo} />
			<RightSide
				year={year}
				month={month}
				monthsNames={monthsNames}
				daysNames={daysNames}
				nextMonth={nextMonth}
				prevMonth={prevMonth}
				pickDate={pickDate}
				setCurrentDate={setCurrentDate}
				allTodos={allTodos}
			/>

			{openCreateTodo && (
				<CreateTodoTitle setOpenCreateTodo={setOpenCreateTodo} addTodo={addTodo} />
			)}
		</div>
	);
};

export default App;
