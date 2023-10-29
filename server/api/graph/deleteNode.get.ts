import { GraphDB } from "./graphDB";
export default defineEventHandler(async (event) => {
	const { id } = getQuery(event);
	return await GraphDB.deleteNode((<any>id).toString());
});
