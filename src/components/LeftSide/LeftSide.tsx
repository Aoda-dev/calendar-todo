import React, { useState } from "react";

import Pick from "../../interfaces/Pick";
import ListTodos from "./ListTodos";

type Props = {
	pick: Pick | undefined;
	setOpenCreateTodo: (state: boolean) => void;
	markAsDone: (id: number) => void;
};

const LeftSide: React.FC<Props> = (props: Props) => {
	const { pick, setOpenCreateTodo, markAsDone } = props;

	return (
		<div className="h-screen w-1/2 bg-zinc-900 px-10">
			<div className="flex h-1/2 items-center">
				<div className="space-y-3">
					<h1 className="font-hero text-8xl font-thin lowercase tracking-wider text-white">
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
					<button onClick={() => setOpenCreateTodo(true)} className=" hover:text-white">
						Add
					</button>
					<button className="hover:text-white">Select all</button>
					<button className="hover:text-white">Delete</button>
					<button className="hover:text-white">Mark as done</button>
				</div>

				{pick?.todos ? (
					<div className="h-[40vh] space-y-2 overflow-y-scroll py-8 scrollbar-hide">
						{pick.todos.map((todo, index) => (
							<ListTodos markAsDone={markAsDone} key={todo.id} todo={todo} />
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
