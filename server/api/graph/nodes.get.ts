import { Graph } from "~/utils";
import { GraphDB } from "./graphDB";

export default defineEventHandler(async (event) => {
	const { amount } = getQuery(event);
	let n = await GraphDB.getNodes({}, <number>amount);
	return n;
});
