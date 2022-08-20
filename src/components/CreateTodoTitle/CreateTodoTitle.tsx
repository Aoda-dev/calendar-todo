import React, { useEffect, useRef, useState } from "react";
import { X } from "phosphor-react";

type Props = {
	setOpenCreateTodo: (state: boolean) => void;
	addTodo: (todo: string) => void;
};

const CreateTodoTitle: React.FC<Props> = (props: Props) => {
	const { setOpenCreateTodo, addTodo } = props;
	const [inputValue, setInputValue] = useState<string>("");
	const focusRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setTimeout(() => {
			focusRef.current?.focus();
		}, 100);
	}, []);

	return (
		<div className="absolute top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black/80 text-white">
			<div className="flex w-1/2 items-center justify-end">
				<X
					onClick={() => setOpenCreateTodo(false)}
					className="cursor-pointer text-3xl hover:text-white/50"
				/>
			</div>

			<input
				ref={focusRef}
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						addTodo(inputValue);
					}
				}}
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Please enter todo name"
				className="w-1/2 border-b bg-transparent py-3 font-hero text-lg outline-none"
			/>
		</div>
	);
};

export default CreateTodoTitle;
