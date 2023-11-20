import CytoUtils from "../utils/cytoUtils.ts";
import { describe, test, it, expect } from "vitest";

describe("CytoUtils", () => {
	it("should convert to/from Qwiery nodes", () => {
		/**
		 *
		 * @type {IQwieryNode}
		 */
		let n = { id: "a" };
		let cyNode = CytoUtils.toCyNode(n);
		expect(cyNode).toEqual({
			data: { id: "a" },
			group: "nodes",
			position: {
				x: 0,
				y: 0,
			},
		});

		// if coordinate is given it moves to the position
		n = { id: "a", x: 5 };
		cyNode = CytoUtils.toCyNode(n);
		expect(cyNode).toEqual({
			data: { id: "a" },
			group: "nodes",
			position: {
				x: 5,
				y: 0,
			},
		});

		n = { id: "a", x: 5, y: -1 };
		cyNode = CytoUtils.toCyNode(n);
		expect(cyNode).toEqual({
			data: { id: "a" },
			group: "nodes",
			position: {
				x: 5,
				y: -1,
			},
		});

		// all other props go into the data
		n = { id: "a", z: "J" };
		cyNode = CytoUtils.toCyNode(n);
		expect(cyNode).toEqual({
			data: { id: "a", z: "J" },
			group: "nodes",
			position: {
				x: 0,
				y: 0,
			},
		});

		let pn = { id: "a" };
		cyNode = CytoUtils.toCyNode(pn);
		expect(cyNode).toEqual({
			data: { id: "a" },
			group: "nodes",
			position: {
				x: 0,
				y: 0,
			},
		});

		pn = [{ id: "a" }];
		cyNode = CytoUtils.toCyNode(pn);
		expect(cyNode).toEqual([
			{
				data: { id: "a" },
				group: "nodes",
				position: {
					x: 0,
					y: 0,
				},
			},
		]);
	});
});
