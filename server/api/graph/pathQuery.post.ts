import { Graph } from "~/utils";
import { GraphDB } from "./graphDB";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	let n = await GraphDB.pathQuery(body.pathQuery, body.amount || 100);
	return n;
});
