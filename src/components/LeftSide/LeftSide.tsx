import React from "react";

const LeftSide = () => {
	return (
		<div className="w-1/2 h-screen bg-zinc-900 px-10">
			<div className="h-1/2 flex items-center">
				<div className="space-y-3">
					<h1 className="text-white text-8xl font-hero font-thin tracking-wider lowercase">
						saturday
					</h1>
					<h2 className="text-pink-500 text-3xl font-hero font-thin tracking-widest">
						26<sup>th</sup>&nbsp;March
					</h2>
				</div>
			</div>

			<div className="h-1/2">
				<div className="text-white/30 space-x-8 font-hero font-medium py-3 border-b border-b-slate-500">
					<button className="hover:text-white">Add</button>
					<button className="hover:text-white">Select all</button>
					<button className="hover:text-white">Delete</button>
					<button className="hover:text-white">Mark as done</button>
				</div>
			</div>
		</div>
	);
};

export default LeftSide;
