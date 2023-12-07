import { describe, test, it, expect } from "vitest";
import Qwiery from "../lib/qwiery.js";
import _ from "lodash";

describe("Qwiery", function () {
	it("should have by default the memory adapter", async function () {
		const q = new Qwiery();
		expect(Qwiery.info).toContain("Qwiery v");
		expect(Qwiery.version).not.toBeUndefined();
		expect(Qwiery.version).not.toBeNull();
		expect(Qwiery.version).toContain(".");
		await q.createNode("a");
		expect(await q.getNode("a")).toEqual({ id: "a" });
		expect(q.adapterIds).toEqual(["memory"]);
	});

	it("should generate random graphs", async function () {
		const q = new Qwiery();
		// by default this generates a Erdos-Renyi graph with 30 nodes and 30 edges
		let g = await q.randomGraph();
		expect(await q.nodeCount()).toEqual(30);
		expect(await q.edgeCount()).toEqual(30);
		expect(await q.getNode(g.nodes[12].id)).toEqual({ id: g.nodes[12].id });
		await q.clear();
		expect(await q.nodeCount()).toEqual(0);
		expect(await q.edgeCount()).toEqual(0);

		// this test has become difficult because the generated tree node id's have uuid's and it's not simple to pass
		// the id of the root here
		// g = await q.randomGraph("tree");
		// expect(await q.getDownstreamEdges("0")).toHaveLength(2);
		// expect(await q.getDownstreamEdges("2")).toHaveLength(2);
		// expect(await q.getUpstreamEdges("0")).toHaveLength(0);
	});

	it("should warn about no adapter support", async function () {
		const q = new Qwiery({ adapters: [] });
		await expect(q.createNode("a")).rejects.toThrow(Error);
	});

	it("should create nodes, duh", async function () {
		let q = new Qwiery();
		let nodes = await q.createNodes(_.range(13));
		expect(await q.nodeCount()).toEqual(13);
		await q.deleteNode("3");
		expect(await q.nodeExists("3")).toBeFalsy();
		expect(await q.nodeCount()).toEqual(12);
		expect(await q.getNodes((n) => n.id === "3")).toEqual([]);

		let n = await q.createNode({ labels: "W" });
		expect(await q.getNodesWithLabel("W")).toHaveLength(1);

		const m = {
			id: n.id,
			x: 45,
			labels: ["W"],
		};
		await q.updateNode({
			id: n.id,
			x: 45,
			labels: ["W"],
		});
		const nn = await q.getNodesWithLabel("W");

		expect(nn).toEqual([m]);
		await q.upsertNode({
			id: n.id,
			x: 46,
			labels: ["W"],
		});
		const u = await q.getNode(n.id);
		expect(u.x).toEqual(46);

		await q.clear();
		expect(await q.nodeCount()).toEqual(0);
		expect(await q.edgeCount()).toEqual(0);
		nodes = await q.createNodes(_.range(20));
		expect(await q.nodeCount()).toEqual(20);
		// delete a bunch using a projection
		await q.deleteNodes({ id: { $lt: 10 } });
		expect(await q.nodeCount()).toEqual(10);
	});

	it("should create edges", async function () {
		const q = new Qwiery();
		let a = await q.createNode("a");
		let b = await q.createNode("b");
		let e = await q.createEdge("a", "b", null, "edge");
		expect(await q.edgeExists("edge")).toBeTruthy();
		const e2 = await q.getEdge("edge");
		expect(e2.sourceId).toEqual("a");
		expect(e2.targetId).toEqual("b");
		expect(e2.labels).toBeUndefined();

		// missing endpoints
		await expect(q.createEdge("a", "k")).rejects.toThrow(Error);
		await q.deleteEdge("edge");
		expect(await q.edgeExists("edge")).toBeFalsy();
		e = await q.upsertEdge({
			sourceId: "a",
			targetId: "b",
			id: "edge",
			labels: ["x", "y"],
		});
		expect(await q.edgeExists("edge")).toBeTruthy();
		e = await q.getEdgeBetween("a", "b");
		expect(e.id).toEqual("edge");
		expect(await q.getEdgesWithLabel("x")).toHaveLength(1);
		expect(await q.getEdgesWithLabel("z")).toHaveLength(0);

		await q.createEdge("a", "b", null, "edge2", ["x"]);
		let found = await q.getEdges((e) => e.targetId === "b");
		expect(found).toHaveLength(2);
		expect(await q.getEdgesWithLabel("x")).toHaveLength(2);
		expect(await q.getEdgesWithLabel("y")).toHaveLength(1);
		found = await q.getEdgeWithLabel("a", "b", "y");
		expect(found.id).toEqual("edge");

		await q.updateEdge({
			sourceId: "a",
			targetId: "b",
			id: "edge",
			labels: ["x", "y", "z"],
		});
		found = await q.getEdgeWithLabel("a", "b", "y");
		expect(found.labels).toEqual(["x", "y", "z"]);

		await q.clear();
		expect(await q.nodeCount()).toEqual(0);
		expect(await q.edgeCount()).toEqual(0);
		a = await q.createNode("a");
		b = await q.createNode("b");
		for (let i = 0; i < 100; i++) {
			await q.createEdge("a", "b", null, i);
		}
		expect(await q.edgeCount()).toEqual(100);
		found = await q.getEdgesBetween("a", "b", 4);
		expect(found).toHaveLength(4);
		found = await q.getEdgesBetween("a", "b", 44);
		expect(found).toHaveLength(44);
		found = await q.getEdgesBetween("a", "b", 1000);
		expect(found).toHaveLength(100);
	});
	it("should ", async () => {
		const q = new Qwiery();
		let n = await q.createNode({});
		console.log(JSON.stringify(n));
	});
});
