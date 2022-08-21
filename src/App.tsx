import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LeftSide from "./components/LeftSide/LeftSide";
import RightSide from "./components/RightSide/RightSide";
import Pick from "./interfaces/Pick";
import CreateTodoTitle from "./components/CreateTodoTitle/CreateTodoTitle";
import AllTodos from "./interfaces/AllTodos";
import EditTodoTitle from "./components/EditTodoTitle/EditTodoTitle";

const App: React.FC = () => {
	const [year, setYear] = useState<number>(dayjs().year());
	const [month, setMonth] = useState<number>(dayjs().month());
	const [pick, setPick] = useState<Pick>();
	const [currentDate, setCurrentDate] = useState<string>("");
	const [openCreateTodo, setOpenCreateTodo] = useState<boolean>(false);
	const [openEditTodo, setOpenEditTodo] = useState<boolean>(false);
	const [currentTodoId, setCurrentTodoId] = useState<number | null>();
	const [allTodos, setAllTodos] = useState<Array<AllTodos>>([]);
	const [openLeftSide, setOpenLeftSide] = useState<boolean>(false);

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

		const uniqueId = Math.floor(Date.now() + Math.random());

		if (index > -1) {
			const newTodos = allTodos.map((d) => {
				if (d.date === date) {
					d.todos.push({ id: uniqueId, time: time, todo: todo, done: false });
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
				{ date: date, todos: [{ id: uniqueId, time: time, todo: todo, done: false }] },
			]);

			setPick({
				dayName: daysNames[$dayjs.day()],
				dayNumber: $dayjs.date(),
				monthName: monthsNames[$dayjs.month()],
				monthNumber: $dayjs.month() + 1,
				todos: [{ id: uniqueId, time: time, todo: todo, done: false }],
			});
		}

		setOpenCreateTodo(false);
	};

	const selectAllHandler = (date: string): void => {
		const index = allTodos.findIndex((d) => d.date === date);

		if (index === -1) {
			toast("🦄 No todos!", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			return;
		}

		const $dayjs = dayjs(currentDate, "YYYY-MM-DD");

		const newTodos = allTodos.map((d) => {
			if (d.date === date) {
				d.todos.forEach((todo) => (todo.selectAll = !todo.selectAll));
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
	};

	const deleteAllHandler = (date: string): void => {
		const isSelected = allTodos.find((d) => d.date === date)?.todos[0].selectAll;

		if (!isSelected) {
			toast("🎀 Please selectall before delete!", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			return;
		}

		const $dayjs = dayjs(currentDate, "YYYY-MM-DD");
		const newTodos = allTodos.filter((d) => d.date !== date);

		setAllTodos(newTodos);
		setPick({
			dayName: daysNames[$dayjs.day()],
			dayNumber: $dayjs.date(),
			monthName: monthsNames[$dayjs.month()],
			monthNumber: $dayjs.month() + 1,
			todos: [],
		});
	};

	const markAsDoneAllHandler = (date: string): void => {
		const isSelected = allTodos.find((d) => d.date === date)?.todos[0].selectAll;

		if (!isSelected) {
			toast("🎁 Please selectall before mark as done!", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			return;
		}

		const $dayjs = dayjs(currentDate, "YYYY-MM-DD");

		const newTodos = allTodos.map((d) => {
			if (d.date === date) {
				d.todos.forEach((todo) => {
					todo.done = !todo.done;
					todo.selectAll = false;
				});
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
	};

	const markAsDone = (id: number): void => {
		const $dayjs = dayjs(currentDate, "YYYY-MM-DD");
		const date = `${year}-${pick?.monthNumber}-${pick?.dayNumber}`;

		const newTodos = allTodos.map((d) => {
			if (d.date === currentDate) {
				d.todos = d.todos.map((todo) => {
					if (todo.id === id) {
						todo.done = !todo.done;
					}
					return todo;
				});
			}
			return d;
		});

		setPick({
			dayName: daysNames[$dayjs.day()],
			dayNumber: $dayjs.date(),
			monthName: monthsNames[$dayjs.month()],
			monthNumber: $dayjs.month() + 1,
			todos: allTodos?.filter((d) => d.date === date)[0].todos,
		});

		setAllTodos(newTodos);
	};

	const deleteTodo = (id: number): void => {
		const $dayjs = dayjs(currentDate, "YYYY-MM-DD");
		const date = `${year}-${pick?.monthNumber}-${pick?.dayNumber}`;

		let isEmpty: boolean = false;

		let newTodos = allTodos.map((d) => {
			if (d.date === currentDate) {
				d.todos = d.todos.filter((todo) => todo.id !== id);

				if (d.todos.length === 0) {
					isEmpty = true;
				}
			}
			return d;
		});

		if (isEmpty) {
			newTodos = newTodos.filter((d) => d.date !== date);
		}

		setPick({
			dayName: daysNames[$dayjs.day()],
			dayNumber: $dayjs.date(),
			monthName: monthsNames[$dayjs.month()],
			monthNumber: $dayjs.month() + 1,
			todos: allTodos?.filter((d) => d.date === date)[0].todos,
		});

		setAllTodos(newTodos);
	};

	const editTodo = (todoText: string): void => {
		const $dayjs = dayjs(currentDate, "YYYY-MM-DD");
		const date = `${year}-${pick?.monthNumber}-${pick?.dayNumber}`;

		const newTodos = allTodos.map((d) => {
			if (d.date === currentDate) {
				d.todos = d.todos.map((todo) => {
					if (todo.id === currentTodoId) {
						todo.todo = todoText;
					}
					return todo;
				});
			}
			return d;
		});

		setPick({
			dayName: daysNames[$dayjs.day()],
			dayNumber: $dayjs.date(),
			monthName: monthsNames[$dayjs.month()],
			monthNumber: $dayjs.month() + 1,
			todos: allTodos?.filter((d) => d.date === date)[0].todos,
		});

		setAllTodos(newTodos);
		setOpenEditTodo(false);
		setCurrentTodoId(null);
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
			<LeftSide
				openLeftSide={openLeftSide}
				setOpenLeftSide={setOpenLeftSide}
				year={year}
				deleteTodo={deleteTodo}
				markAsDone={markAsDone}
				pick={pick}
				setCurrentTodoId={setCurrentTodoId}
				setOpenCreateTodo={setOpenCreateTodo}
				setOpenEditTodo={setOpenEditTodo}
				selectAllHandler={selectAllHandler}
				deleteAllHandler={deleteAllHandler}
				markAsDoneAllHandler={markAsDoneAllHandler}
			/>
			<RightSide
				setOpenLeftSide={setOpenLeftSide}
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

			{openEditTodo && (
				<EditTodoTitle
					setCurrentTodoId={setCurrentTodoId}
					setOpenEditTodo={setOpenEditTodo}
					editTodo={editTodo}
				/>
			)}

			<ToastContainer />
		</div>
	);
};

export default App;
