import { describe, test, it, expect } from "vitest";
import CytoUtils from "../utils/cytoUtils";

describe("CyUtils", () => {
	it("should convert nodes", () => {
		let item = {
			id: 1,
			x: 4,
			name: "a",
		};
		expect(CytoUtils.toCyNode(item)).toEqual({
			data: {
				id: 1,
				name: "a",
			},
			position: {
				x: 4,
				y: 0,
			},
			group: "nodes",
		});
	});
});
