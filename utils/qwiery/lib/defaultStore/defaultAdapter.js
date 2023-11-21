import JsonGraph from "./jsonGraphStore.js";
import process from "process";

export default async function DefaultAdapter(options = {}, done) {
	const api = {
		//region Nodes
		getNeighborhood(done) {
			return async ([id, amount]) => {
				const g = await mem.getNeighborhood(id, amount);
				done(null, [id], g);
			};
		},

		getNodeLabelProperties(done) {
			return async ([labelName]) => {
				const g = await mem.getNodeLabelProperties(labelName);
				done(null, [labelName], g);
			};
		},

		getNodeLabels(done) {
			return async () => {
				const labels = await mem.getNodeLabels();
				done(null, [], labels);
			};
		},

		searchNodes(done) {
			return async ([term, fields, amount]) => {
				const nodes = await mem.searchNodes(term, fields, amount);
				done(null, [term, fields, amount], nodes);
			};
		},

		searchNodesWithLabel(done) {
			return async ([term, fields, label, amount]) => {
				const nodes = await mem.searchNodesWithLabel(term, fields, label, amount);
				done(null, [term, fields, label, amount], nodes);
			};
		},

		deleteNode(done) {
			return async ([id]) => {
				const got = await mem.deleteNode(id);
				done(null, [id], got);
			};
		},

		nodeCount(done) {
			return async ([predicate]) => {
				const got = await mem.nodeCount(predicate);
				done(null, [predicate], got);
			};
		},

		getNodesWithLabel(done) {
			return async ([label]) => {
				const found = await mem.getNodesWithLabel(label);
				done(null, [label], found);
			};
		},

		deleteNodes(done) {
			return async ([predicate]) => {
				const got = await mem.deleteNodes(predicate);
				done(null, [predicate], got);
			};
		},

		nodeExists(done) {
			return async ([id]) => {
				const got = await mem.nodeExists(id);
				done(null, [id], got);
			};
		},

		/**
		 * Not necessary for Qwiery functioning but used in testing.
		 * @returns {JsonGraphStore}
		 */
		get store() {
			return mem;
		},

		createNode(done) {
			return async ([data, id, labels]) => {
				const created = await mem.createNode(data, id, labels);
				done(null, [data, id, labels], created);
			};
		},

		createNodes(done) {
			return ([seq]) => {
				const created = mem.createNodes(seq);
				done(null, [seq], created);
			};
		},

		updateNode(done) {
			return ([data, id, labels]) => {
				const created = mem.updateNode(data, id, labels);
				done(null, [data, id, labels], created);
			};
		},

		upsertNode(done) {
			return ([data, id, labels]) => {
				const created = mem.upsertNode(data, id, labels);
				done(null, [data, id, labels], created);
			};
		},

		getNode(done) {
			return async ([id]) => {
				const found = await mem.getNode(id);
				done(null, [id], found);
			};
		},

		getNodes(done) {
			return async ([predicate, amount]) => {
				const found = await mem.getNodes(predicate, amount);
				done(null, [predicate, amount], found);
			};
		},
		//endregion

		//region Edges
		edgeCount(done) {
			return async ([predicate]) => {
				const got = await mem.edgeCount(predicate);
				done(null, [predicate], got);
			};
		},

		edgeExists(done) {
			return async ([id]) => {
				const got = await mem.edgeExists(id);
				done(null, [id], got);
			};
		},

		deleteEdge(done) {
			return async ([id]) => {
				const found = await mem.deleteEdge(id);
				done(null, [id], found);
			};
		},

		getEdgeBetween(done) {
			return async ([sourceId, targetId]) => {
				const found = await mem.getEdgeBetween(sourceId, targetId);
				done(null, [sourceId, targetId], found);
			};
		},

		getEdgesBetween(done) {
			return async ([sourceId, targetId, amount]) => {
				const found = await mem.getEdgesBetween(sourceId, targetId, amount);
				done(null, [sourceId, targetId], found);
			};
		},

		getEdge(done) {
			return async ([id]) => {
				const found = await mem.getEdge(id);
				done(null, [id], found);
			};
		},

		createEdge(done) {
			return async ([sourceId, targetId, data = null, id = null, labels = null]) => {
				const got = await mem.createEdge(sourceId, targetId, data, id, labels);
				done(null, [sourceId, targetId, data, id, labels], got);
			};
		},

		upsertEdge(done) {
			return async ([data = null, id = null, labels = null]) => {
				const got = await mem.upsertEdge(data, id, labels);
				done(null, [data, id, labels], got);
			};
		},

		updateEdge(done) {
			return async ([data = null, id = null, labels = null]) => {
				const got = await mem.updateEdge(data, id, labels);
				done(null, [data, id, labels], got);
			};
		},

		getEdgeWithLabel(done) {
			return async ([sourceId, targetId, label]) => {
				const got = await mem.getEdgeWithLabel(sourceId, targetId, label);
				done(null, [sourceId, targetId, label], got);
			};
		},

		getEdgesWithLabel(done) {
			return async ([label, amount]) => {
				const got = await mem.getEdgesWithLabel(label, amount);
				done(null, [label, amount], got);
			};
		},

		getEdges(done) {
			return async ([predicate, amount]) => {
				const got = await mem.getEdges(predicate, amount);
				done(null, [predicate, amount], got);
			};
		},
		//endregion

		//region Graph

		inferSchemaGraph(done) {
			return async ([cached]) => {
				const g = await mem.inferSchemaGraph(cached);
				done(null, [], g);
			};
		},

		clear(done) {
			return async () => {
				await mem.clear();
				done(null, [], null);
			};
		},

		pathQuery(done) {
			return async ([path, amount]) => {
				try {
					const found = await mem.pathQuery(path, amount);
					done(null, [path], found);
				} catch (e) {
					done(e.message, [], null);
				}
			};
		},

		loadGraph(done) {
			return async ([name]) => {
				await mem.loadGraph(name);
				done(null, [name], null);
			};
		},
		//endregion
	};
	// pass on the options specific to the memory adapter, if any
	const mem = new JsonGraph(options["memory"] || {});

	async function setup() {
		// fake latency to connect
		// await new Promise((r) => setTimeout(r, 100));
	}

	process.nextTick(() => {
		done(null, api);
	});
	await setup();
}

export const Memory = function (Q) {
	Q.adapter("memory", DefaultAdapter);
};
