import { Qwiery } from "@orbifold/dal";

/**
 * Gets a node.
 */
export default defineEventHandler(async (event) => {
	return Qwiery.info;
});
