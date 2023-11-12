/*
 * Default in-memory store.
 * */

/*
 * Straightforward JSON Graph implementation which can be used out of the box.
 * Use one of the storage plugins for something more solid and scalable.
 * */
import Store from "../store.js";
import _ from "lodash";
import { Utils } from "../../../utils/lib/utils.js";
import { toPredicate } from "./projections.js";
import Graph from "../../../graphs/lib/graph.js";
// import { Error } from "sequelize";
import fs from "fs";
import Errors from "../../../utils/lib/errors.js";

/**
 * Standard JSON graph structure.
 * See e.g. https://github.com/jsongraph/json-graph-specification
 */
export default class JsonGraphStore extends Store {
	#nodes;
	#edges;
	options = {};
	autoSaveHandle = null;

	constructor(options = {}) {
		super();
		this.options = options;
		// console.log(JSON.stringify(options, null, 3));
		this.#nodes = options.nodes || [];
		this.#edges = options.edges || [];
		this.id = options.id || Utils.id();
		this.name = options.name || "JSON Graph";
		this.description = options.description || "";
		this.autoSave(options.autoSave, options.interval);
	}

	autoSave(onOff = false, interval = 2000) {
		if (onOff === true) {
			if (!this.autoSaveHandle) {
				console.log(`JsonGraphStore auto-save enabled (interval: ${interval}).`);
				this.autoSaveHandle = setInterval(() => {
					fs.writeFile("/users/Swa/temp/data.json", JSON.stringify(this.toJSON()), "utf-8", () => {});
				}, interval);
			}
		} else {
			console.log("JsonGraphStore auto-save disabled.");
			if (this.autoSaveHandle) {
				clearInterval(this.autoSaveHandle);
			}
		}
	}

	//region Graph

	/**
	 * Returns the neighborhood of the specified node as a graph.
	 * @param id {string} A node id.
	 * @returns {Promise<Graph>}
	 */
	async getNeighborhood(id) {
		const g = new Graph();

		const addNode = async (id) => {
			if (!g.nodeIdExists(id)) {
				const node = await this.getNode(id);
				g.addNode(node);
			}
		};
		const downEdges = await this.getDownstreamEdges(id);
		for (const e of downEdges) {
			await addNode(e.sourceId);
			await addNode(e.targetId);
			g.addEdge(e);
		}
		const upEdges = await this.getUpstreamEdges(id);
		for (const e of upEdges) {
			await addNode(e.sourceId);
			await addNode(e.targetId);
			g.addEdge(e);
		}
		return g;
	}

	async clear() {
		this.#nodes = [];
		this.#edges = [];
	}

	get isEmpty() {
		return this.#nodes.length === 0 && this.#edges.length() === 0;
	}

	/** @inheritdoc */
	async getDownstreamEdges(sourceId, amount = 1000) {
		return await this.getEdges({ sourceId }, amount);
	}

	/** @inheritdoc */
	async getUpstreamEdges(targetId, amount = 1000) {
		return await this.getEdges({ targetId }, amount);
	}

	/**
	 * Serializes this graph to a JSON graph structure.
	 */
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			nodes: _.clone(this.#nodes),
			edges: _.clone(this.#edges),
		};
	}

	/**
	 * Deserializes the given JSON graph.
	 * @param json
	 * @returns {JsonGraphStore}
	 */
	static fromJSON(json) {
		return new JsonGraphStore(json);
	}

	/**
	 * Imports the given graph.
	 * @param g {Graph}
	 */
	static async fromGraph(g) {
		const store = new JsonGraphStore();
		for (const n of g.nodes) {
			if (Utils.isEmpty(n.labels)) {
				if (!Utils.isEmpty(n.typeName)) {
					n.labels = [n.typeName];
				}
			}
			delete n.typeName;
			await store.createNode(n);
		}
		for (const e of g.edges) {
			if (Utils.isEmpty(e.labels)) {
				if (!Utils.isEmpty(e.typeName)) {
					e.labels = [e.typeName];
				}
			}
			delete e.typeName;
			await store.createEdge(e);
		}
		return store;
	}

	/** @inheritdoc */
	async inferSchemaGraph() {
		// incidence
		const dic = {};
		const g = new Graph();
		const labelMap = {};
		// label-to-node map
		for (const n of this.#nodes) {
			for (const label of n.labels || []) {
				if (!labelMap[label]) {
					const node = g.addNode(label);
					labelMap[label] = node;
				}
			}
		}
		// endpoint labels map
		for (const e of this.#edges) {
			const s = await this.getNode(e.sourceId);
			const t = await this.getNode(e.targetId);
			// label combinations
			for (const sl of s.labels || []) {
				for (const tl of t.labels || []) {
					// JavaScript quirk: using an array as a key automatically converts it to a string
					const key = `${sl},${tl}`;
					if (!dic[key]) {
						dic[key] = _.clone(e.labels);
					}
				}
			}
		}
		for (const key of Object.keys(dic)) {
			const [u, v] = key.split(",");
			for (const edgeLabel of dic[key]) {
				const source = labelMap[u];
				const target = labelMap[v];
				g.addEdge({ sourceId: source.id, targetId: target.id, name: edgeLabel });
			}
		}

		return g;
	}

	/** @inheritdoc */
	async pathQueryV1(path, amount = 1000) {
		/*
        Truncating the result to the specified amount is special here because you want
        to have full paths returned and not just a sample of the nodes.
        So, the full result has to be truncated in a such a way that the amount of nodes contained in the paths respects the amount.
        * */

		const g = new Graph();
		if (Utils.isEmpty(path)) {
			return g;
		}
		if (path.length % 2 === 0) {
			throw new Error("A path query should have odd length.");
		}
		let previousAdditions = [];
		let newAdditions = [];
		let previousItem = null;
		for (let i = 0; i < path.length; i++) {
			const pathItem = path[i];
			if (Utils.isEmpty(pathItem)) {
				throw new Error("Inconsistent path query.");
			}
			if (i === 0) {
				if (pathItem !== "*") {
					const found = this.#nodes.filter((n) => n.labels?.indexOf(pathItem) > -1);
					if (found.length > 0) {
						const items = _.clone(found);
						g.addNodes(items);
						items.forEach((item) => newAdditions.push(item));
					}
				} else {
					if (path.length === 1) {
						throw new Error("Inconsistent path query.");
					}
				}
			} else {
				if (i % 2 === 0) {
					if (pathItem === "*") {
						// any node with the previous edge label

						if (Utils.isEmpty(previousItem) || previousItem === "*") {
							throw new Error("Inconsistent path query.");
						}
						if (i === 2) {
							if (previousItem === "*" && pathItem !== "*") {
								const found = this.#edges.filter((e) => (e.labels || []).indexOf(pathItem) > -1);
								for (const e of found) {
									const source = await this.getNode(e.sourceId);
									const target = await this.getNode(e.targetId);
									const s = g.addNode(_.clone(source));
									const t = g.addNode(_.clone(target));
									newAdditions.push(s);
									newAdditions.push(t);
									g.addEdge({ sourceId: e.sourceId, targetId: e.targetId, labels: e.labels });
								}
							}
						}
						// the previous edge label is used
						if (i === 2) {
							const outflow = await this.#edges.filter((e) => (e.labels || []).indexOf(previousItem) > -1);
							for (const outEdge of outflow) {
								const inNode = await this.getNode(outEdge.sourceId);
								const outNode = await this.getNode(outEdge.targetId);
								g.addNode(inNode);
								g.addNode(outNode);
								g.addEdge({ sourceId: inNode.id, targetId: outNode.id, labels: outEdge.labels });
								newAdditions.push(inNode);
								newAdditions.push(outNode);
							}
						} else {
							for (const addition of previousAdditions) {
								const outflow = await this.#edges.filter((e) => e.sourceId === addition.id && (e.labels || []).indexOf(previousItem) > -1);
								for (const outEdge of outflow) {
									const outNode = await this.getNode(outEdge.targetId);
									g.addNode(outNode);
									g.addEdge({ sourceId: addition.id, targetId: outNode.id, labels: outEdge.labels });
									newAdditions.push(outNode);
								}
							}
						}
					} else {
						// all nodes with the specific label
						if (previousItem !== "*") {
							throw new Error("Inconsistent path query.");
						}
						for (const addition of previousAdditions) {
							const outflow = await this.#edges.filter((e) => e.sourceId === addition.id);
							for (const outEdge of outflow) {
								const outNode = await this.getNode(outEdge.targetId);
								if ((outNode.labels || []).indexOf(pathItem) > -1) {
									g.addNode(outNode);
									g.addEdge({ sourceId: addition.id, targetId: outNode.id, labels: outEdge.labels });
									newAdditions.push(outNode);
								}
							}
						}
					}
				}
			}
			previousItem = pathItem;
			previousAdditions = _.clone(newAdditions);
			// if the path start with * nothing is added yet and the check will return the empty graph
			if ((i === 0 && path[0] === "*") || (i === 1 && path[0] === "*")) {
				continue;
			}
			// if nothing new and there are more constraints
			if (i !== path.length - 1 && newAdditions.length === 0) {
				return Graph.empty();
			}
		}
		return g.sample(amount);
	}

	/** @inheritdoc */
	async pathQuery(path, amount = 1000) {
		if (Utils.isEmpty(path)) {
			return Graph.empty();
		}
		if (path.length % 2 === 0) {
			throw new Error("A path query should have odd length.");
		}
		// check for valid path elements
		for (const s of path) {
			if (!_.isString(s) || Utils.isEmpty(s)) {
				throw new Error("Invalid path query.");
			}
		}
		const g = new Graph();
		if (path.length === 1) {
			const nodes = _.take(
				this.#nodes.filter((n) => _.includes(n.labels, path[0])),
				amount,
			);
			g.addNodes(nodes);
			return g;
		}

		/**
		 * Adds the nodes and edges fitting the given triple.
		 */
		const mergeSegment = async (segment) => {
			let edges = await this.getEdgesWithLabels(...segment, amount);
			for (const edge of edges) {
				const targetNode = await this.getNode(edge.targetId);
				if (!g.nodeIdExists(edge.sourceId)) {
					const sourceNode = await this.getNode(edge.sourceId);
					g.addNode(sourceNode);
				}
				if (!g.nodeIdExists(edge.targetId)) {
					const targetNode = await this.getNode(edge.targetId);
					g.addNode(targetNode);
				}
				if (!g.edgeExists(edge.id)) {
					g.addEdge(edge);
				}
			}
		};

		/**
		 * Assembles the initial graph based on the path labels.
		 */
		const assembleRawGraph = async () => {
			const segments = _.range((path.length - 1) / 2).map((i) => [path[2 * i], path[2 * i + 1], path[2 * i + 2]]);
			for (const segment of segments) {
				await mergeSegment(segment);
			}
		};

		/**
		 * DFT and collects the valid node-paths.
		 * @param n Node
		 * @param edgeLabels The edge-labels which have to be traverse down.
		 * @param pathsFound The paths found so far.
		 * @param nodePath The current parents.
		 */
		const traverse = (n, edgeLabels, pathsFound, nodePath = []) => {
			nodePath.push(n);
			if (edgeLabels.length === 0) {
				pathsFound.push(nodePath);
				return;
			}
			const edgeLabel = edgeLabels.shift();
			let edges = g.getOutgoingEdges(n.id);
			if (edgeLabel !== "*") {
				edges = edges.filter((e) => _.includes(e.labels, edgeLabel));
			}
			const children = edges.map((e) => g.getNodeById(e.targetId));
			if (children.length > 0) {
				for (const child of children) {
					traverse(child, _.clone(edgeLabels), pathsFound, _.clone(nodePath));
				}
			} else {
				// unfinished path
			}
		};

		/**
		 * DFT according to the given edge-label path and tags the nodes which are part of a full path.
		 */
		const walkDownAdnTag = (startNode, edgeLabels) => {
			if (edgeLabels.length === 0) {
				return;
			}
			const pathsFound = [];
			traverse(startNode, _.clone(edgeLabels), pathsFound);
			// also truncating to the nearest amount of nodes while preserving paths

			pathsFound.forEach((p) => {
				p.forEach((n) => (n._drop = false));
			});
		};

		/**
		 * Removes the nodes which are not in the given path.
		 */
		const pruneRawGraph = async () => {
			// start from the nodes and tag all that are part of the path downwards
			g.nodes.forEach((n) => (n._drop = true));

			const edgeLabels = _.range((path.length - 1) / 2).map((i) => path[2 * i + 1]);
			for (const n of g.nodes) {
				// walking up and tagging
				walkDownAdnTag(n, edgeLabels);
			}
			for (const n of g.nodes) {
				if (n._drop) {
					g.removeNode(n);
				} else {
					delete n._drop;
				}
			}
		};

		await assembleRawGraph();
		await pruneRawGraph();
		return g;
	}

	//endregion

	//region Node

	/**
	 * Same as the {@link searchNodes} search but this limits the subset of nodes to the ones having the given label.
	 * @param term {string} A search term.
	 * @param [fields] {string[]} The properties to consider in the search. If none given the name will be considered only.
	 * @param label {string|null} One or more labels.
	 * @param amount {number} The maximum amount of nodes to return.
	 */
	async searchNodesWithLabel(term, fields = [], label = null, amount = 1000) {
		if (Utils.isEmpty(label)) {
			return this.searchNodes(term, fields, amount);
		}
		if (Utils.isEmpty(term)) {
			return [];
		}
		if (fields.length === 0) {
			fields = ["name"];
		}
		const lowerTerm = term.trim().toLowerCase();
		// only the nodes containing the given labels
		const nodes = this.#nodes.filter((n) => _.includes(n.labels || [], label));
		const found = nodes.filter((n) => {
			for (const field of fields) {
				if (field === "labels") {
					if (n.labels.join(" ").toLowerCase().indexOf(lowerTerm) > -1) {
						return true;
					}
				} else if (field === "id") {
					if (n.id.toLowerCase().indexOf(lowerTerm) > -1) {
						return true;
					}
				} else {
					if (_.isArray(n[field])) {
						if (n[field].join(" ").toLowerCase().indexOf(lowerTerm) > -1) {
							return true;
						}
					} else {
						if (n[field].toString().toLowerCase().indexOf(lowerTerm) > -1) {
							return true;
						}
					}
				}
			}
			return false;
		});
		const truncated = _.take(found, amount);
		return truncated;
	}

	/**
	 * Search of the nodes for the given term.
	 * @param term {string} A search term.
	 * @param [fields] {string[]} The properties to consider in the search. If none given the name will be considered only.
	 * @param amount {number} The maximum amount of nodes to return.
	 */
	async searchNodes(term, fields = [], amount = 100) {
		if (Utils.isEmpty(term)) {
			return [];
		}
		if (fields.length === 0) {
			fields = ["name"];
		}
		const lowerTerm = term.trim().toLowerCase();
		// yes, this is a full scan but that's the reality with a JSON stack
		const found = this.#nodes.filter((n) => {
			for (const field of fields) {
				if (field === "labels") {
					if (n.labels.join(" ").toLowerCase().indexOf(lowerTerm) > -1) {
						return true;
					}
				} else if (field === "id") {
					if (n.id.toLowerCase().indexOf(lowerTerm) > -1) {
						return true;
					}
				} else {
					if (_.isArray(n[field])) {
						if (n[field].join(" ").toLowerCase().indexOf(lowerTerm) > -1) {
							return true;
						}
					} else {
						if (n[field].toString().toLowerCase().indexOf(lowerTerm) > -1) {
							return true;
						}
					}
				}
			}
			return false;
		});
		const truncated = _.take(found, amount);
		return truncated;
	}

	/** @inheritdoc */
	async deleteNodes(predicate) {
		if (_.isNil(predicate)) {
			throw new Error(Errors.isNil("predicate", "JsonGraphStore.deleteNodes"));
		}
		let fun;
		if (_.isFunction(predicate)) {
			fun = predicate;
		} else if (_.isPlainObject(predicate)) {
			fun = toPredicate(predicate);
		} else {
			throw new Error(Errors.expectedType("predicate", "projection", "JsonGraphStore.deleteNodes"));
		}

		const found = _.filter(this.#nodes, fun);
		for (const node of found) {
			const index = _.findIndex(this.#nodes, { id: node.id });
			this.#nodes.splice(index, 1);
		}
		return found.map((n) => n.id);
	}

	/** @inheritdoc */
	async createNodes(seq) {
		if (Utils.isEmpty(seq)) {
			throw new Error(Errors.isNil("seq", "JsonGraphStore.createNodes"));
		}
		const coll = [];
		for (const item of seq) {
			// only a string or plain object will work here
			const n = await this.createNode(item);
			if (n) {
				coll.push(n);
			}
		}
		return coll;
	}

	/** @inheritdoc */
	async createNode(data = null, id = null, labels = null) {
		const specs = Utils.getNodeSpecs(data, id, labels);
		if (specs === null) {
			throw new Error(Errors.insufficientNodeSpecs());
		}
		const node = {
			id: Utils.id(),
		};

		if (specs.data && specs.data.id) {
			node.id = specs.data.id;
		}
		// id has priority over the possible id in the payload
		if (specs.id) {
			node.id = specs.id;
		}
		// the only guaranteed value is the id while no labels means no attribute
		if (specs.labels && specs.labels.length > 0) {
			node.labels = specs.labels;
		}
		if (await this.nodeExists(node.id)) {
			throw new Error(Errors.nodeExistsAlready(node.id));
		}

		// copy additional attribs
		if (_.isPlainObject(data)) {
			_.assign(node, Utils.getReducedPlainObject(data, ["id", "labels"]));
		}
		this.#nodes.push(node);
		return node;
	}

	/** @inheritdoc */
	async deleteNode(id) {
		if (Utils.isEmpty(id)) {
			throw new Error(Errors.isNil("id", "JsonGraphStore.deleteNode"));
		}
		const index = _.findIndex(this.#nodes, { id });
		if (index > -1) {
			this.#nodes.splice(index, 1);
		}
		// maintain integrity
		const toDelete = this.#edges.filter((e) => e.sourceId === id || e.targetId === id);
		toDelete.forEach((e) => {
			const index = _.findIndex(this.#edges, { id: e.id });
			this.#edges.splice(index, 1);
		});
	}

	/** @inheritdoc */
	async updateNode(data = null, id = null, labels = null) {
		const specs = Utils.getNodeSpecs(data, id, labels);
		if (specs === null) {
			throw new Error(Errors.insufficientNodeSpecs());
		}
		if (specs.id) {
			specs.data.id = specs.id;
		}
		if (specs.labels) {
			specs.data.labels = specs.labels;
		}
		if (!(await this.nodeExists(specs.data.id))) {
			throw new Error(Errors.nodeDoesNotExist(specs.data.id));
		}
		// remove replace the node
		const index = _.findIndex(this.#nodes, { id: specs.id });
		this.#nodes.splice(index, 1);
		this.#nodes.push(specs.data);
		return specs.data;
	}

	/** @inheritdoc */
	async upsertNode(data = null, id = null, labels = null) {
		const specs = Utils.getNodeSpecs(data, id, labels);
		if (specs === null) {
			throw new Error(Errors.insufficientNodeSpecs());
		}
		if (specs.id && (await this.nodeExists(specs.id))) {
			return this.updateNode(data, id, labels);
		} else {
			return this.createNode(data, id, labels);
		}
	}

	/** @inheritdoc */
	async getNodesWithLabel(label, amount = 1000) {
		if (Utils.isEmpty(label)) {
			throw new Error(Errors.emptyString("label", "JsonGraphStore.getNodesWithLabel"));
		}
		if (!Utils.isPositiveInteger(amount)) {
			throw new Error(Errors.invalidNumber("amount", "JsonGraphStore.getNodesWithLabel"));
		}
		return _.take(
			_.filter(this.#nodes, (n) => _.includes(n.labels, label)),
			amount,
		);
	}

	/** @inheritdoc */
	async getNode(projection) {
		if (Utils.isEmpty(projection)) {
			throw new Error(Errors.isNil("projection", "JsonGraphStore.getNode"));
		}
		if (_.isString(projection)) {
			return _.find(this.#nodes, { id: projection }) || null;
		} else if (_.isFunction(projection)) {
			// assuming this is a predicate
			return _.find(this.#nodes, (n) => projection(n)) || null;
		} else if (_.isPlainObject(projection)) {
			//_.find(this.#nodes,  ["Class","Schema"].every(...))

			return _.find(this.#nodes, toPredicate(projection)) || null;
		}
	}

	/** @inheritdoc */
	async nodeExists(id) {
		if (Utils.isEmpty(id)) {
			throw new Error(Errors.isNil("id", "JsonGraphStore.nodeExists"));
		}
		return !_.isNil(_.find(this.#nodes, { id }));
	}

	/** @inheritdoc */
	async nodeCount(predicate = null) {
		if (predicate) {
			if (_.isFunction(predicate)) {
				return _.filter(this.#nodes, predicate).length;
			} else if (_.isPlainObject(predicate)) {
				return _.filter(this.#nodes, toPredicate(predicate)).length;
			}
		}
		return this.#nodes.length;
	}

	/** @inheritdoc */
	async getNodes(projection = {}, amount = 1000) {
		if (_.isNil(projection)) {
			throw new Error(Errors.isNil("projection", "JsonGraphStore.getNodes"));
		}
		if (_.isFunction(projection)) {
			return _.take(_.filter(this.#nodes, projection), amount);
		} else if (_.isPlainObject(projection)) {
			return _.take(_.filter(this.#nodes, toPredicate(projection)) || [], amount);
		} else {
			throw new Error("Please use a Mongo-like projections for getNodes, see https://www.mongodb.com/docs/manual/reference/operator/query/.");
		}
	}

	/** @inheritdoc */
	async getNodeLabels() {
		return _.uniq(_.flattenDeep(_.map(this.#nodes, "labels")));
	}

	/** @inheritdoc */
	async getNodeLabelProperties(labelName) {
		const propNames = [];
		const nodes = await this.getNodesWithLabel(labelName);
		for (const node of nodes) {
			const names = Object.keys(node);
			names.forEach((name) => {
				if (name !== "labels" && !_.includes(propNames, name)) {
					propNames.push(name);
				}
			});
		}
		return propNames;
	}

	//endregion

	//region Edge
	/** @inheritdoc */
	async getEdge(projection) {
		if (Utils.isEmpty(projection)) {
			throw new Error(Errors.isNil("id", "JsonGraphStore.getEdge"));
		}
		if (_.isString(projection)) {
			return _.find(this.#edges, { id: projection }) || null;
		} else if (_.isFunction(projection)) {
			// assuming this is a predicate
			return _.find(this.#edges, (n) => projection(n)) || null;
		} else if (_.isPlainObject(projection)) {
			return _.find(this.#edges, toPredicate(projection)) || null;
		}
	}

	/** @inheritdoc */
	async getEdges(projection = {}, amount = 1000) {
		if (_.isNil(projection)) {
			throw new Error(Errors.isNil("projection", "JsonGraphStore.getEdges"));
		}
		if (_.isFunction(projection)) {
			return _.take(_.filter(this.#edges, projection), amount);
		} else if (_.isPlainObject(projection)) {
			return _.take(_.filter(this.#edges, toPredicate(projection)) || [], amount);
		} else {
			throw new Error("Please use a Mongo-like projections for getNodes, see https://www.mongodb.com/docs/manual/reference/operator/query/.");
		}
	}

	/**
	 * Returns the amount of edges, optionally filtered with the specified predicate.
	 * @param predicate? {function} An optional predicate.
	 * @returns {Promise<number>}
	 */
	async edgeCount(predicate = null) {
		if (predicate) {
			return _.filter(this.#edges, predicate).length;
		}
		return this.#edges.length;
	}

	/** @inheritdoc */
	async edgeExists(id) {
		if (Utils.isEmpty(id)) {
			throw new Error(Errors.isNil("id", "JsonGraphStore.edgeExists"));
		}
		return !_.isNil(_.find(this.#edges, { id }));
	}

	/** @inheritdoc */
	async createEdge(sourceId, targetId = null, data = null, id = null, labels = null) {
		const specs = Utils.getEdgeSpecs(sourceId, targetId, data, id, labels);
		if (specs === null) {
			throw new Error(Errors.insufficientEdgeSpecs());
		}

		if (_.isNil(specs.data)) {
			specs.data = {};
		}
		// check endpoints
		if (!(await this.nodeExists(specs.sourceId))) {
			throw new Error(Errors.sourceDoesNotExist(specs.sourceId));
		}
		if (!(await this.nodeExists(specs.targetId))) {
			throw new Error(Errors.targetDoesNotExist(specs.targetId));
		}

		const edge = {
			sourceId: specs.sourceId,
			targetId: specs.targetId,
			labels: undefined,
			id: Utils.id(),
		};
		// priority to the explicit id
		if (specs.id) {
			edge.id = specs.id;
		}
		if (specs.labels && specs.labels.length > 0) {
			edge.labels = specs.labels;
		}
		if (_.isPlainObject(sourceId)) {
			_.assign(edge, Utils.getReducedPlainObject(sourceId, ["id", "labels"]));
		} else {
			_.assign(edge, Utils.getReducedPlainObject(specs.data, ["id", "labels"]));
		}
		// note that multiplicity is allowed here
		this.#edges.push(edge);
		return edge;
	}

	/** @inheritdoc */
	async deleteEdge(id) {
		if (Utils.isEmpty(id)) {
			throw new Error(Errors.isNil("id", "JsonGraphStore.deleteEdge"));
		}
		const index = _.findIndex(this.#edges, { id });
		if (index > -1) {
			this.#edges.splice(index, 1);
		}
	}

	/** @inheritdoc */
	async updateEdge(data, id = null, labels = null) {
		const specs = Utils.getEdgeSpecs(null, null, data, id, null);
		if (specs === null) {
			throw new Error(Errors.insufficientEdgeSpecs());
		}
		if (_.isNil(specs.data)) {
			specs.data = {};
		}
		// priority to the explicit id
		if (specs.id) {
			specs.data.id = specs.id;
			const e = await this.getEdge(specs.id);
			specs.sourceId = e.sourceId;
			specs.targetId = e.targetId;
		}
		if (specs.labels) {
			specs.data.labels = specs.labels;
		}
		specs.data.sourceId = specs.sourceId;
		specs.data.targetId = specs.targetId;
		// check endpoints
		if (!(await this.nodeExists(specs.sourceId))) {
			throw new Error(Errors.sourceDoesNotExist(specs.sourceId));
		}
		if (!(await this.nodeExists(specs.targetId))) {
			throw new Error(Errors.targetDoesNotExist(specs.targetId));
		}
		if (!(await this.edgeExists(specs.id))) {
			throw new Error(Errors.edgeDoesNotExist(specs.id));
		}
		const index = _.findIndex(this.#edges, { id: specs.id });
		this.#edges.splice(index, 1);
		this.#edges.push(specs.data);
		return specs.data;
	}

	/** @inheritdoc */
	async upsertEdge(data, id = null, labels = null) {
		const specs = Utils.getEdgeSpecs(data, id, labels);
		if (specs === null) {
			throw new Error(Errors.insufficientEdgeSpecs());
		}
		if (specs.id && (await this.edgeExists(specs.id))) {
			return this.updateEdge(data, specs.id, labels);
		} else {
			return this.createEdge(data, id, labels);
		}
	}

	/** @inheritdoc */
	async getEdgesBetween(sourceId, targetId, amount = 10) {
		if (!Utils.isPositiveInteger(amount)) {
			throw new Error(Errors.invalidNumber("amount", "JsonGraphStore.getEdgesBetween"));
		}
		if (Utils.isEmpty(sourceId)) {
			throw new Error(Errors.isNil("sourceId", "JsonGraphStore.getEdgesBetween"));
		}
		if (Utils.isEmpty(targetId)) {
			throw new Error(Errors.isNil("targetId", "JsonGraphStore.getEdgesBetween"));
		}
		return _.take(
			_.filter(this.#edges, (e) => e.sourceId == sourceId && e.targetId === targetId),
			amount,
		);
	}

	/** @inheritdoc */
	async getEdgeWithLabel(sourceId, targetId, label) {
		return _.find(this.#edges, (e) => e.sourceId === sourceId && e.targetId === targetId && _.includes(e.labels, label)) || null;
	}

	/** @inheritdoc */
	async getEdgeBetween(sourceId, targetId) {
		return _.head(await this.getEdgesBetween(sourceId, targetId, 1)) || null;
	}

	/** @inheritdoc */
	async getEdgesWithLabel(label, amount = 1000) {
		if (!Utils.isPositiveInteger(amount)) {
			throw new Error(Errors.invalidNumber("amount", "JsonGraphStore.getEdgesBetween"));
		}
		if (_.isNil(label)) {
			return _.take(
				_.filter(this.#edges, (e) => _.isNil(e.labels)),
				amount,
			);
		}
		return _.take(
			_.filter(this.#edges, (e) => _.includes(e.labels, label)),
			amount,
		);
	}

	async getEdgesBetweenLabels(sourceLabel, targetLabel, amount = 1000) {
		if (Utils.isEmpty(sourceLabel)) {
			throw new Error("No source label given.");
		}
		if (Utils.isEmpty(targetLabel)) {
			throw new Error("No target label given.");
		}
		if (sourceLabel === "*") {
			throw new Error("This method cannot be used for arbitrary source label '*'.");
		}
		if (targetLabel === "*") {
			throw new Error("This method cannot be used for arbitrary target label '*'.");
		}

		const coll = [];
		const sourceNodes = await this.getNodesWithLabel(sourceLabel, amount);
		for (const sourceNode of sourceNodes) {
			const edges = await this.getDownstreamEdges(sourceNode.id, 1000);
			for (const edge of edges) {
				const targetNode = await this.getNode(edge.targetId);
				if (_.includes(targetNode.labels, targetLabel)) {
					coll.push(edge);
				}
			}
		}
		return coll;
	}

	async getEdgesWithLabels(sourceLabel, edgeLabel, targetLabel, amount = 1000) {
		if (Utils.isEmpty(sourceLabel)) {
			throw new Error("No source label given.");
		}
		if (Utils.isEmpty(edgeLabel)) {
			throw new Error("No edge label given.");
		}
		if (Utils.isEmpty(targetLabel)) {
			throw new Error("No target label given.");
		}
		if (edgeLabel === "*") {
			return await this.getEdgesBetweenLabels(sourceLabel, targetLabel, amount);
		}

		const coll = [];
		const edges = await this.getEdgesWithLabel(edgeLabel, amount);
		if (sourceLabel === "*" && targetLabel === "*") {
			return edges;
		}

		for (const edge of edges) {
			if (sourceLabel !== "*") {
				const sourceNode = await this.getNode(edge.sourceId);
				if (!_.includes(sourceNode.labels, sourceLabel)) {
				} else {
					if (targetLabel !== "*") {
						const targetNode = await this.getNode(edge.targetId);
						if (!_.includes(targetNode.labels, targetLabel)) {
						} else {
							coll.push(edge);
						}
					} else {
						coll.push(edge);
					}
				}
			} else {
				if (targetLabel !== "*") {
					const targetNode = await this.getNode(edge.targetId);
					if (!_.includes(targetNode.labels, targetLabel)) {
					} else {
						coll.push(edge);
					}
				} else {
					coll.push(edge);
				}
			}
		}

		return coll;
	}

	/** @inheritdoc */
	async getEdgeLabels() {
		return _.uniq(_.flattenDeep(_.map(this.#edges, "labels")));
	}

	//endregion
}
