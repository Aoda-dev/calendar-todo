import { CaretRight } from "phosphor-react";
import React from "react";
import Pick from "../../interfaces/Pick";

type Props = {
	pick: Pick | undefined;
	setOpenCreateTodo: (state: boolean) => void;
};

const LeftSide: React.FC<Props> = (props: Props) => {
	const { pick, setOpenCreateTodo } = props;

	console.log(pick);

	const showDetails = () => {
		console.log("showing details");
	};

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

			<div className="h-1/2">
				<div className="space-x-8 border-b border-b-slate-500 py-3 font-hero font-medium text-white/30">
					<button onClick={() => setOpenCreateTodo(true)} className=" hover:text-white">
						Add
					</button>
					<button className="hover:text-white">Select all</button>
					<button className="hover:text-white">Delete</button>
					<button className="hover:text-white">Mark as done</button>
				</div>

				{pick?.todos ? (
					<div className="space-y-2 py-8">
						{pick.todos.map((todo) => (
							<div
								onClick={showDetails}
								className="group flex cursor-pointer items-center font-hero font-semibold text-white/90"
							>
								<CaretRight className="mt-1 group-hover:text-zinc-400" />
								<span className="ml-2 group-hover:text-pink-500">{todo.todo}</span>
								<span className="ml-auto group-hover:text-pink-500">{todo.time}</span>
							</div>
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
