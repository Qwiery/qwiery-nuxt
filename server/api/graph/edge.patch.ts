import { GraphDB } from "./graphDB";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	return await GraphDB.upsertEdge(body);
});
