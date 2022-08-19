import Todos from "./Todos";

interface Pick {
	dayName: string;
	dayNumber: number;
	monthName: string;
	todos: Array<Todos> | null;
}

export default Pick;
