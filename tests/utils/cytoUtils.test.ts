import CytoUtils from "../../utils/cytoUtils";
import { describe, test, it, expect } from "vitest";

describe("CytoUtils", () => {
	it("should convert a graph object to an array of cytoscape elements", () => {
		expect(CytoUtils.toElements(null)).toBeNull();
		expect(CytoUtils.toElements({})).toEqual([]);
		let graph: any = {
			id: "g",
			nodes: [
				{ id: "node1", x: 10, y: 20 },
				{ id: "node2", x: 30, y: 40 },
			],
			edges: [{ id: "edge1", sourceId: "node1", targetId: "node2" }],
		};

		let result: any[] = CytoUtils.toCytoGraph(graph) || [];

		expect(result).toHaveLength(3);
		expect(result[0]).toHaveProperty("group", "nodes");
		expect(result[0]).toHaveProperty("data.id", "node1");
		expect(result[0]).toHaveProperty("position.x", 10);
		expect(result[0]).toHaveProperty("position.y", 20);
		expect(result[1]).toHaveProperty("group", "nodes");
		expect(result[1]).toHaveProperty("data.id", "node2");
		expect(result[1]).toHaveProperty("position.x", 30);
		expect(result[1]).toHaveProperty("position.y", 40);
		expect(result[2]).toHaveProperty("group", "edges");
		expect(result[2]).toHaveProperty("data.id");
		expect(result[2]).toHaveProperty("data.source", "node1");
		expect(result[2]).toHaveProperty("data.target", "node2");

		let graph2 = CytoUtils.toQwieryGraph(result);
		// the id of the graph gets lost in the Cyto array
		graph2.id = "g";

		expect(graph2).toEqual(graph);

		graph = { nodes: [{ id: "a" }] };
		result = CytoUtils.toCytoGraph(graph) || [];
		expect(result).toHaveLength(1);
		expect(result[0]).toEqual({
			data: {
				id: "a",
			},
			group: "nodes",
			position: {
				x: 0,
				y: 0,
			},
		});
		expect(CytoUtils.toPlain(result)).toEqual([
			{
				id: "a",
				x: 0,
				y: 0,
			},
		]);
	});

	it("should convert a cytoscape elements array to a plain graph object", () => {
		const elements = [
			{ group: "nodes", data: { id: "node1" }, position: { x: 10, y: 20 } },
			{ group: "nodes", data: { id: "node2" }, position: { x: 30, y: 40 } },
			{ group: "edges", data: { id: "edge1", source: "node1", target: "node2" } },
		];

		const result = CytoUtils.toPlain(elements);

		// expect(result).toHaveProperty('nodes');
		// expect(result.nodes).toHaveLength(2);
		expect(result[0]).toHaveProperty("id", "node1");
		expect(result[0]).toHaveProperty("x", 10);
		expect(result[0]).toHaveProperty("y", 20);
		expect(result[1]).toHaveProperty("id", "node2");
		expect(result[1]).toHaveProperty("x", 30);
		expect(result[1]).toHaveProperty("y", 40);

		expect(result[2]).toHaveProperty("id", "edge1");
		expect(result[2]).toHaveProperty("sourceId", "node1");
		expect(result[2]).toHaveProperty("targetId", "node2");
	});

	it("should convert to/from Qwiery edges", () => {
		let e = {
			id: "e",
			sourceId: "a",
			targetId: "b",
		};
		let cyEdge = CytoUtils.toCyEdge(e);
		expect(cyEdge).toEqual({
			group: "edges",
			data: {
				id: "e",
				source: "a",
				target: "b",
			},
		});
		let ce = CytoUtils.toPlain(cyEdge);
		expect(ce).toEqual({
			id: "e",
			sourceId: "a",
			targetId: "b",
		});
	});
	it("should convert to/from Qwiery nodes", () => {
		/**
		 * @type {IQwieryNode}
		 */
		let n: any = { id: "a" };
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

		let pn: any = { id: "a" };
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
		cyNode = {
			data: { id: "d", name: "d" },
			group: "nodes",
		};
		pn = CytoUtils.toPlain(cyNode);
		expect(pn).toEqual({
			id: "d",
			name: "d",
		});
	});

	it("should return true for valid cytoscape elements", () => {
		const validElement1 = { group: "nodes", data: { id: "node1" }, position: { x: 10, y: 20 } };
		const validElement2 = { group: "edges", data: { id: "edge1", source: "node1", target: "node2" } };

		expect(CytoUtils.isCytoElement(validElement1)).toBeTruthy();
		expect(CytoUtils.isCytoElement(validElement2)).toBeTruthy();
	});

	it("should return false for invalid cytoscape elements", () => {
		const invalidElement1 = { group: "a", data: { id: "node1" } };
		const invalidElement2 = { data: { id: "edge1" } };

		expect(CytoUtils.isCytoElement(invalidElement1)).not.toBeTruthy();
		expect(CytoUtils.isCytoElement(invalidElement2)).not.toBeTruthy();
	});
});
