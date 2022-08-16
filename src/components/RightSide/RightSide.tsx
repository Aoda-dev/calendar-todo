import React from "react";
import { CaretLeft, CaretRight } from "phosphor-react";

const RightSide = () => {
	return (
		<div className="w-1/2 h-screen bg-white px-10">
			<div className="h-1/2 flex justify-center items-center">
				<div className="space-y-3">
					<div className="flex items-center space-x-3 justify-center">
						<button>
							<CaretLeft weight="bold" size={"1.2rem"} />
						</button>
						<span className="font-hero text-2xl font-bold -mt-0.5">March</span>
						<button>
							<CaretRight weight="bold" size={"1.2rem"} />
						</button>
					</div>

					<div>
						<span className="font-hero font-thin text-slate-300 text-8xl tracking-wider">2K22</span>
					</div>
				</div>
			</div>

			<div className="h-1/2">
				<h1>Calendar will be here</h1>
			</div>
		</div>
	);
};

export default RightSide;
