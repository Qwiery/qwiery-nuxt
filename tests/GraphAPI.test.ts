import { describe, test, it, expect } from "vitest";
import GraphAPI from "../utils/GraphAPI";
// import { setup, $fetch, isDev } from "@nuxt/test-utils";
/*
 * This tests the proxy to the REST API.
 * You can switch between various backends via `server/api/graphDB.ts`.
 * Qwiery makes it easy to plugins diverse storage adapters.
 * */
describe("Graph API", () => {
	it("should crud nodes", async () => {
		let n = await GraphAPI.createNode({ name: "Swa" });
		expect(n?.name).toEqual("Swa");
	});
});
