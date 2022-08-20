import Todos from "./Todos";

interface Pick {
	dayName: string;
	dayNumber: number;
	monthName: string;
	monthNumber: number;
	todos: Array<Todos>;
}

export default Pick;
