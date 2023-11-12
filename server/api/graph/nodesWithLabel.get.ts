import { GraphDB } from "./graphDB";

export default defineEventHandler(async (event) => {
	const { labelName } = getQuery(event);
	if (labelName) {
		return await GraphDB.getNodesWithLabel(labelName.toString(), 100);
	} else {
		return [];
	}
});
