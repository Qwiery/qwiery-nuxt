import { Graph } from "~/utils";
import { GraphDB } from "./graphDB";

export default defineEventHandler(async (event) => {
	let schema = await GraphDB.inferSchemaGraph();
	return schema;
});
