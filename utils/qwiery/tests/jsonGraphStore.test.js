import { describe, test, it, expect } from "vitest";
import JsonGraphStore from "../lib/defaultStore/jsonGraphStore.js";
import RandomGraph from "../../graphs/lib/graphData/randomGraph.js";
import { toPredicate } from "../lib/defaultStore/projections.js";
import { Utils } from "../../utils/lib/utils.js";

import _ from "lodash";
import JsonGraph from "../../graphs/lib/formats/jsonGraph.js";
import Graph from "../../graphs/lib/graph.js";
import { Datasets } from "../../utils/lib/datasets.js";
import fs from "fs";

describe("JsonGraphStore", function () {
	it("should crud nodes", async function () {
		const jg = new JsonGraphStore();

		// you can create an empty node, the id will be generated
		let n = await jg.createNode();
		expect(n.id || null).not.toBeNull();
		n = await jg.createNode({});
		expect(n.id || null).not.toBeNull();
		expect(await jg.createNode({ id: "a" })).toEqual({ id: "a" });
		// node is already present
		await expect(jg.createNode({ id: "a" })).rejects.toThrow(Error);
		expect(await jg.createNode({ id: "b" }, null, "s")).toEqual({ id: "b", labels: ["s"] });
		expect(await jg.nodeCount()).toEqual(4);
		await jg.deleteNode("b");
		expect(await jg.nodeCount()).toEqual(3);
		await jg.deleteNode("5");
		expect(await jg.nodeCount()).toEqual(3);
		let found = (await jg.getNode("a")) || null;
		expect(found).not.toBeNull();
		await jg.updateNode({ id: "a", x: 22 });
		found = await jg.getNode("a");
		expect(found.x).toEqual(22);
		found = await jg.getNode((n) => n.id === "a");
		expect(found.x).toEqual(22);
		// update if not exist
		await expect(jg.updateNode({ id: "z", e: 662 })).rejects.toThrow(Error);
		await expect(jg.getNodesWithLabel(undefined)).rejects.toThrow("Received empty string");
		await expect(jg.getNodesWithLabel("A", -1)).rejects.toThrow("positive integer");
		await expect(jg.getNode({})).rejects.toThrow("is nil");
		await expect(jg.deleteNode(null)).rejects.toThrow("is nil");
		await expect(jg.updateNode(null)).rejects.toThrow("Insufficient");
	});

	it("should crud edges", async function () {
		const jg = new JsonGraphStore();
		const nodes = await jg.createNodes(_.range(10));
		expect(nodes.length).toEqual(10);
		let edge = await jg.createEdge("0", "1");
		expect(edge).not.toBeNull();
		expect(edge.sourceId).toEqual("0");
		expect(edge.targetId).toEqual("1");
		let found = await jg.getEdge((e) => e.id === edge.id);
		expect(found.id).toEqual(edge.id);
		// nodes ain't there
		await expect(jg.createEdge({ sourceId: "a", targetId: "b" })).rejects.toThrow(Error);
		await expect(jg.deleteNode(null)).rejects.toThrow("is nil");
		await expect(jg.getEdgeBetween(null, "a")).rejects.toThrow("is nil");
		await expect(jg.getEdgeBetween("c", undefined)).rejects.toThrow("is nil");
		await expect(jg.getEdgesBetween("c", "d", "a")).rejects.toThrow("positive integer");
	});

	it("should clear the graph", async function () {
		const g = RandomGraph.ErdosRenyi();
		const s = new JsonGraphStore();
		for (const n of g.nodes) {
			await s.createNode({ id: n.id });
		}
		for (const e of g.edges) {
			await s.createEdge(e.sourceId, e.targetId);
		}
		expect(await s.nodeCount()).toEqual(30);
		expect(await s.edgeCount()).toEqual(30);
		await s.clear();
		expect(await s.nodeCount()).toEqual(0);
		expect(await s.edgeCount()).toEqual(0);
	});

	it("should retain integrity", async function () {
		const s = new JsonGraphStore();
		// a triangle graph
		const a = await s.createNode("a");
		await s.createNode("b");
		await s.createNode("c");
		await s.createEdge("a", "b");
		await s.createEdge("b", "c");
		await s.createEdge("c", "a");
		await s.deleteNode("a");
		// two edges should have been deleted
		expect(await s.edgeCount()).toEqual(1);
	});

	it("should turn projection into predicates", function () {
		const ar = [{ x: 1 }, { x: 3 }, { x: 5 }, { x: -5 }];
		let pred = toPredicate({
			x: { $lte: 0 },
		});
		expect(_.find(ar, pred)).toEqual({ x: -5 });

		pred = toPredicate({
			$and: [{ x: { $lt: 5 } }, { x: { $gt: 1 } }],
		});
		expect(_.find(ar, pred)).toEqual({ x: 3 });

		pred = toPredicate({
			x: { $in: [3, 5] },
		});
		expect(_.find(ar, pred)).toEqual({ x: 3 });
		expect(_.filter(ar, pred)).toEqual([{ x: 3 }, { x: 5 }]);
	});

	it("should use projections", async function () {
		const s = new JsonGraphStore();
		await s.createNodes([
			{ id: 1, x: -1 },
			{ id: 3, x: 3 },
			{ id: 5, x: 5 },
		]);
		await s.createEdge({
			sourceId: "1",
			targetId: "3",
			labels: ["A", "B"],
		});
		await s.createEdge({
			sourceId: "1",
			targetId: "5",
			labels: ["A"],
		});
		let found = await s.getNode({
			$and: [{ x: { $lt: 5 } }, { x: { $gt: 1 } }],
		});
		expect(found).toEqual({ id: "3", x: 3 });

		found = await s.getNodes({
			x: { $lte: 3 },
		});

		expect(found).toHaveLength(2);

		found = await s.getEdges({
			sourceId: { $in: ["1"] },
		});
		expect(found).toHaveLength(2);
		found = await s.getEdges({
			labels: {
				$contains: "A",
			},
		});
		expect(found).toHaveLength(2);

		found = await s.getEdges({
			labels: {
				$contains: "B",
			},
		});
		expect(found).toHaveLength(1);

		found = await s.getEdges({
			labels: {
				$contains: "X",
			},
		});
		expect(found).toHaveLength(0);
	});

	it("should (de)serialize", async function () {
		const g = new JsonGraphStore({ id: "g1", name: "G", description: "d" });
		await g.createNode({ x: 5 }, "a", "A");
		await g.createNode({ x: 7 }, "b", "B,C");
		await g.createEdge("a", "b", { y: 3 }, "e", ["K", "M"]);
		let json = g.toJSON();
		expect(json.id).toEqual("g1");
		expect(json.name).toEqual("G");
		expect(json.description).toEqual("d");
		expect(json.nodes).toHaveLength(2);
		expect(json.edges).toHaveLength(1);
		expect(JsonGraph.isJsonGraph(json)).toBeTruthy();
		const gr = JsonGraphStore.fromJSON(json);
		expect(gr.id).toEqual("g1");
		expect(gr.name).toEqual("G");
		expect(gr.description).toEqual("d");
		const edges = await gr.getEdges();
		expect(JsonGraph.isEdge(edges[0])).toBeTruthy();
		expect(edges[0].y).toEqual(3);
		expect(edges[0].labels).toEqual(["K", "M"]);
	});

	it("should fetch all node labels", async () => {
		const g = new JsonGraphStore();
		await g.createNode({ x: 5 }, "a", "A");
		await g.createNode({ x: 5 }, "e", "A, B");
		await g.createNode({ x: 7 }, "b", "B,C");
		let labels = await g.getNodeLabels();
		expect(labels).toEqual(["A", "B", "C"]);
	});

	it("should fetch all edge labels", async () => {
		const g = new JsonGraphStore();
		const a = await g.createNode("a");
		const b = await g.createNode("b");
		const c = await g.createNode("c");
		await g.createEdge("a", "b", null, null, "A");
		await g.createEdge("b", "c", null, null, "A,B");
		await g.createEdge("c", "a", null, null, "C");
		let labels = await g.getEdgeLabels();
		expect(labels).toEqual(["A", "B", "C"]);
	});

	it("should infer schema", async () => {
		const g = new JsonGraphStore();
		let a = await g.createNode("a");
		let b = await g.createNode("b");
		let c = await g.createNode("c");
		let schema = await g.inferSchemaGraph();
		expect(schema.isEmpty).toBeTruthy();

		await g.clear();
		a = await g.createNode(null, "a", "A");
		expect(a.labels).toEqual(["A"]);
		schema = await g.inferSchemaGraph();
		expect(schema.nodes).toHaveLength(1);
		expect(schema.nodes[0].name).toEqual("A");

		await g.clear();
		a = await g.createNode(null, "a", "A");
		b = await g.createNode(null, "b", "B");
		let e = await g.createEdge("a", "b", null, "e", "E");
		schema = await g.inferSchemaGraph();
		expect(schema.nodes.length).eq(2);
		expect(schema.edges.length).eq(1);

		await g.clear();
		a = await g.createNode(null, "a", ["A", "B", "C"]);
		b = await g.createNode(null, "b", "B");
		e = await g.createEdge("a", "b", null, "e", ["E", "F"]);
		schema = await g.inferSchemaGraph();
		expect(schema.nodes.length).eq(3);
		expect(schema.edges.length).eq(6);
	});

	it("should path-query", async () => {
		let g = Graph.fromPseudoCypher(`
		(n1)-[:A]->(n2)
		(n1)-[:C]->(n4)
		(n1)-[:A]->(n5)
		(n2)-[:B]->(n3)
		(n5)-[:B]->(n6)
		(n5)-[:C]->(n6)
		(n7)-[:A]->(n8)
		(n9)-[:C]->(n10)
		`);

		let store = await JsonGraphStore.fromGraph(g);
		let found = await store.pathQuery(["*", "A", "*", "B", "*"]);
		expect(found.nodeCount).toEqual(5);
		expect(found.edgeCount).toEqual(4);

		g = new JsonGraphStore();
		let a = await g.createNode({ id: "a", labels: ["A"] });
		let b = await g.createNode({ id: "b", labels: ["B"] });
		let c = await g.createNode({ id: "c", labels: ["C"] });

		let e1 = await g.createEdge("a", "b", null, "e1", "E1");
		let e2 = await g.createEdge("b", "c", null, "e2", "E2");

		found = await g.pathQuery(["A", "*", "B"]);
		expect(found.nodeCount).toEqual(2);
		expect(found.edgeCount).toEqual(1);
		expect(found.edges[0].labels).toEqual(["E1"]);

		found = await g.pathQuery(["A", "*", "B", "*", "C"]);
		// console.log(JSON.stringify(found.toJSON(), null, 2));
		expect(found.nodeCount).toEqual(3);
		expect(found.edgeCount).toEqual(2);
		expect(found.edges[0].labels).toEqual(["E1"]);
		expect(found.edges[1].labels).toEqual(["E2"]);

		await expect(g.pathQuery([""])).rejects.toThrow(Error);
		await expect(g.pathQuery(["A", ""])).rejects.toThrow(Error);

		found = await g.pathQuery(["C"]);
		expect(found.nodeCount).toEqual(1);
		expect(found.edgeCount).toEqual(0);

		found = await g.pathQuery(["*", "E1", "*"]);
		expect(found.nodeCount).toEqual(2);
		expect(found.edgeCount).toEqual(1);

		found = await g.pathQuery(["*", "E1", "*", "E2", "*"]);
		expect(found.nodeCount).toEqual(3);
		expect(found.edgeCount).toEqual(2);

		g = Graph.fromPseudoCypher(`
		(n1:M)-[:A]->(n2:V)
		(n1)-[:B]->(n3:V)
		(n1)-[:A]->(n4)
		`);
		store = await JsonGraphStore.fromGraph(g);
		found = await store.pathQuery(["M", "A", "*"]);
		expect(found.nodeCount).toEqual(3);
	});

	it("should path query and respect amount", async () => {
		const g = new JsonGraphStore();
		//simple a0->b0, a1->b1...
		for (const i in _.range(100)) {
			await g.createNode({ id: "a" + i, labels: ["a"] });
		}
		for (const i in _.range(100)) {
			await g.createNode({ id: "b" + i, labels: ["b"] });
			await g.createEdge("a" + i, "b" + i);
		}
		let amount = Utils.randomInteger(5, 100);
		let found = await g.pathQuery(["a"], amount);
		expect(found.nodes.length).toEqual(amount);
		found = await g.pathQuery(["a", "*", "b"], amount);
		expect(found.nodes.length).toEqual(2 * amount);
		expect(found.edges.length).toEqual(amount);
	});

	it("should get nodes and respect the amount", async () => {
		const g = new JsonGraphStore();
		const N = Utils.randomInteger(100, 1000);
		for (const i of _.range(N)) {
			await g.createNode(i);
		}
		expect(await g.nodeCount()).toEqual(N);
		let ns = await g.getNodes();
		expect(ns.length).toEqual(N);
		const count = Utils.randomInteger(3, 100);
		ns = await g.getNodes({}, count);
		expect(ns.length).toEqual(count);
	});

	it("should import a graph", async () => {
		let g = Graph.fromPseudoCypher(`
		(n1)-[:A]->(n2)
		(n1)-[:C]->(n4)
		(n1)-[:A]->(n5)
		(n2)-[:B]->(n3)
		(n5)-[:B]->(n6)
		(n5)-[:C]->(n6)
		(n7)-[:A]->(n8)
		(n9)-[:C]->(n10)
		`);

		let store = await JsonGraphStore.fromGraph(g);
		expect(await store.nodeCount()).toEqual(10);
		expect(await store.edgeCount()).toEqual(8);
	});

	it("should search for nodes", async () => {
		const g = new JsonGraphStore();
		for (let i = 0; i < 300; i++) {
			await g.createNode({
				id: "A" + i,
				labels: ["A"],
				name: "A " + i,
			});
		}
		for (let i = 0; i < 150; i++) {
			await g.createNode({
				id: "B" + i,
				labels: ["B"],
				name: "B " + i,
			});
		}
		await g.createNode({
			id: "C1",
			labels: ["Cell"],
			name: "a",
		});
		await g.createNode({
			id: "C2",
			labels: ["Cell"],
			name: "b",
		});
		let found = await g.searchNodes("A");
		// default amount is 100
		expect(found).toHaveLength(100);

		found = await g.searchNodes("c", ["labels"]);
		expect(found).toHaveLength(2);

		found = await g.searchNodesWithLabel("b", ["name"], "Cell");
		expect(found).toHaveLength(1);
		expect(found[0].id).toEqual("C2");
	});

	it("should get the neighborhood graph", async () => {
		const g = new JsonGraphStore();
		const root = await g.createNode("root");
		for (let i = 0; i < 30; i++) {
			const n = await g.createNode({
				id: "A" + i,
				labels: ["A"],
				name: "A " + i,
			});
			await g.createEdge(root.id, n.id);
		}
		const ng = await g.getNeighborhood(root.id, 1000);
		expect(ng.nodeCount).toEqual(31);
		expect(ng.edgeCount).toEqual(30);
	});

	it("should get node label properties", async () => {
		const g = new JsonGraphStore();
		await g.createNode({
			labels: ["A"],
			x: 2,
		});
		await g.createNode({
			labels: ["A"],
			y: 2,
		});
		await g.createNode({
			labels: ["A"],
			y: 2,
			z: 5,
		});
		let found = await g.getNodeLabelProperties("A");
		found.sort();
		// the id is always added even if not given
		expect(found).toEqual(["id", "x", "y", "z"]);
	});

	it(
		"should load a JSON file",
		async () => {
			// will go only the first time to Google Drive, thereafter sits in the /datasets directory in the solution
			const json = await Datasets.getDataset("food");
			expect(json.nodes.length).toEqual(33411);
			expect(json.edges.length).toEqual(287056);
			const g = JsonGraphStore.fromJSON(json);
			expect(await g.nodeCount()).toEqual(33411);
			expect(await g.edgeCount()).toEqual(287056);

			const found = await g.searchNodes("apple", ["name"], 2);
			expect(found).toHaveLength(2);
			console.log(JSON.stringify(found, null, 3));
		},
		{
			timeout: 30000,
		},
	);
});
