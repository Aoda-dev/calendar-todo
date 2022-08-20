import React, { useState } from "react";
import { CaretRight, CaretDown } from "phosphor-react";

import Todos from "../../interfaces/Todos";

type Props = {
	todo: Todos;
	markAsDone: (id: number) => void;
};

const ListTodos: React.FC<Props> = (props: Props) => {
	const { todo, markAsDone } = props;

	const [details, setDetails] = useState<boolean>(false);

	const showDetails = (e: any): void => {
		setDetails((prev) => !prev);
	};

	return (
		<div
			onClick={showDetails}
			className="group flex cursor-pointer select-none items-center font-hero font-semibold text-white/90"
		>
			{details ? (
				<CaretDown className="mt-1 self-start group-hover:text-zinc-400" />
			) : (
				<CaretRight className="mt-1 self-start group-hover:text-zinc-400" />
			)}

			<div className="ml-2 w-[80%] space-y-1 overflow-hidden overflow-ellipsis">
				<div
					className={`${
						todo.done && "text-zinc-400 line-through"
					} w-full overflow-hidden overflow-ellipsis group-hover:text-pink-500`}
				>
					{todo.todo}
				</div>

				<div className={`${details ? "h-min" : "h-0"} space-x-6 font-hero font-semibold`}>
					<button className="text-zinc-600 hover:text-zinc-400">Edit</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							markAsDone(todo.id);
						}}
						className="text-zinc-600 hover:text-zinc-400"
					>
						Mark as done
					</button>
					<button className="text-zinc-600 hover:text-zinc-400">Delete</button>
				</div>
			</div>

			<div className="ml-auto space-x-2 self-start group-hover:text-pink-500">
				<span>{todo.time}</span>
				<span>PM</span>
			</div>
		</div>
	);
};

export default ListTodos;
