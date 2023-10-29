import { Graph } from "~/utils";
import { GraphDB } from "./graphDB";

export default defineEventHandler(async (event) => {
	const { id } = getQuery(event);
	return await GraphDB.edgeExists((<any>id).toString());
});
