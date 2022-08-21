import React, { useState } from "react";
import { X } from "phosphor-react";

import Pick from "../../interfaces/Pick";
import ListTodos from "./ListTodos";

type Props = {
	pick: Pick | undefined;
	year: number;
	openLeftSide: boolean;
	setOpenLeftSide: (state: boolean) => void;
	setOpenCreateTodo: (state: boolean) => void;
	setOpenEditTodo: (state: boolean) => void;
	setCurrentTodoId: (state: number) => void;
	markAsDone: (id: number) => void;
	deleteTodo: (id: number) => void;
	selectAllHandler: (date: string) => void;
	deleteAllHandler: (date: string) => void;
	markAsDoneAllHandler: (date: string) => void;
};

const LeftSide: React.FC<Props> = (props: Props) => {
	const {
		pick,
		year,
		setOpenCreateTodo,
		markAsDone,
		deleteTodo,
		setOpenEditTodo,
		setCurrentTodoId,
		selectAllHandler,
		deleteAllHandler,
		markAsDoneAllHandler,
		openLeftSide,
		setOpenLeftSide,
	} = props;

	return (
		<div
			className={`${
				!openLeftSide && "-translate-x-full"
			} fixed left-0 top-0 z-20 h-screen w-full bg-zinc-900 px-10 transition-all md:static md:w-1/2`}
		>
			<div
				onClick={() => setOpenLeftSide(false)}
				className="absolute top-5 right-5 cursor-pointer text-3xl text-white md:hidden"
			>
				<X />
			</div>

			<div className="flex h-1/2 items-center">
				<div className="space-y-3">
					<h1 className="font-hero text-7xl font-thin lowercase tracking-wider text-white md:text-8xl">
						{pick?.dayName}
					</h1>
					<h2 className="font-hero text-3xl font-thin tracking-widest text-pink-500">
						{pick?.dayNumber}
						<sup>th</sup>&nbsp;{pick?.monthName}
					</h2>
				</div>
			</div>

			<div className="h-1/2 overflow-hidden">
				<div className="space-x-8 border-b border-b-slate-500 py-3 font-hero font-medium text-white/30">
					<button onClick={() => setOpenCreateTodo(true)} className="hover:text-white">
						Add
					</button>
					<button
						onClick={() => selectAllHandler(`${year}-${pick?.monthNumber}-${pick?.dayNumber}`)}
						className="hover:text-white"
					>
						{pick?.todos && pick?.todos[0]?.selectAll ? (
							<span className="text-pink-500">Selected</span>
						) : (
							"Select all"
						)}
					</button>
					<button
						onClick={() => deleteAllHandler(`${year}-${pick?.monthNumber}-${pick?.dayNumber}`)}
						className="hover:text-white"
					>
						Delete
					</button>
					<button
						onClick={() => markAsDoneAllHandler(`${year}-${pick?.monthNumber}-${pick?.dayNumber}`)}
						className="hover:text-white"
					>
						Mark as done
					</button>
				</div>

				{pick?.todos && pick?.todos.length > 0 ? (
					<div className="h-[40vh] space-y-2 overflow-y-scroll py-8 scrollbar-hide">
						{pick.todos.map((todo, index) => (
							<ListTodos
								deleteTodo={deleteTodo}
								setOpenEditTodo={setOpenEditTodo}
								setCurrentTodoId={setCurrentTodoId}
								markAsDone={markAsDone}
								key={todo.id}
								todo={todo}
							/>
						))}
					</div>
				) : (
					<div className="mt-16 text-center text-zinc-600">No todos</div>
				)}
			</div>
		</div>
	);
};

export default LeftSide;
