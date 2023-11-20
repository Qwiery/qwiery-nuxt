import _ from "lodash";
import { Utils } from "./utils/lib/utils.js";

/*
 * Diverse conversion utilities to and from Cytoscape elements.
 * */
export default class CytoUtils {
	/**
	 * Turns the given object into a Cyto eles collection.
	 */
	static toElements(g: any) {
		if (!g) {
			return null;
		}
		const coll: any[] = [];
		if (!g.nodes || Utils.isEmpty(g.nodes)) {
			return [];
		}
		coll.push(...g.nodes.map((n) => CytoUtils.toCyNode(n)));
		if (!g.edges || Utils.isEmpty(g.edges)) {
			return coll;
		}
		coll.push(...g.edges.map((e) => CytoUtils.toCyEdge(e)));

		// cytoscape likes its elements to all have a unique id
		coll.filter((el) => el.group === "edges").forEach((el) => (el.data.id = Utils.id()));

		return coll;
	}

	/**
	 * Turns the given object into a Cytoscape node.
	 * Node:
	 * - the id sits inside the data
	 * - a node is characterized by the 'group:"nodes"' property
	 * - the position is not part of the data but in the root
	 * @param obj {*} Anything
	 * @return {Ele}
	 * @see https://js.cytoscape.org/#notation/elements-json
	 */
	static toCyNode(obj) {
		if (_.isArray(obj)) {
			return obj.map((e) => CytoUtils.toCyNode(e));
		}
		if (!_.isPlainObject(obj)) {
			throw new Error("Expected a plain object.");
		}
		const cyNode = {
			group: "nodes",
			data: {
				id: Utils.id(),
			},
			position: {
				x: 0,
				y: 0,
			},
		};
		const d = _.clone(obj);
		if (d.id) {
			cyNode.data.id = d.id;
			delete d.id;
		}
		if (d.x) {
			CytoUtils.setRawProperty(cyNode, "position.x", d.x);
			delete d.x;
		}
		if (d.y) {
			CytoUtils.setRawProperty(cyNode, "position.y", d.y);
			delete d.y;
		}

		// whatever remains goes into the data
		if (!Utils.isEmpty(d)) {
			_.assign(cyNode.data, d);
		}
		return cyNode;
	}

	static toCyEdge(obj: any) {
		if (!_.isPlainObject(obj)) {
			throw new Error("Expected a plain object.");
		}
		const id = Utils.id();
		const cyEdge: any = {
			group: "edges",
			data: {
				id,
			},
		};
		const d = _.clone(obj);
		if (d.id) {
			cyEdge.data.id = d.id;
			delete d.id;
		}

		if (d.source) {
			// cyEdge.source = d.source;
			cyEdge.data.source = d.source;
			delete d.source;
		}
		if (d.sourceId) {
			// cyEdge.source = d.sourceId;
			cyEdge.data.source = d.sourceId;
			delete d.sourceId;
		}
		if (d.from) {
			// cyEdge.source = d.from;
			cyEdge.data.source = d.from;
			delete d.from;
		}
		if (Utils.isEmpty(cyEdge.data.source)) {
			throw new Error("Could not assign the required 'source' property of a Cyto edge.");
		}

		if (d.target) {
			// cyEdge.target = d.target;
			cyEdge.data.target = d.target;
			delete d.target;
		}
		if (d.targetId) {
			// cyEdge.target = d.targetId;
			cyEdge.data.target = d.targetId;
			delete d.targetId;
		}
		if (d.to) {
			// cyEdge.target = d.to;
			cyEdge.data.target = d.to;
			delete d.to;
		}
		if (Utils.isEmpty(cyEdge.data.target)) {
			throw new Error("Could not assign the required 'target' property of a Cyto edge.");
		}
		// whatever remains goes into the data
		if (!Utils.isEmpty(d)) {
			_.assign(cyEdge.data, d);
		}
		if (_.isArray(cyEdge.data.labels)) {
			cyEdge.data.labels = cyEdge.data.labels.join(",");
		}
		return cyEdge;
	}

	/**
	 *
	 * @param ele {*} The ele to extend.
	 * @param name {string} The name or a path of the ele to set.
	 * @param value {*} The value to set.
	 * @return {*}
	 */
	static setRawProperty(ele, name, value) {
		if (!ele) {
			ele = {};
		}
		if (name.indexOf(".") > -1) {
			Utils.ensureJsonPath(ele, name, value);
		} else {
			let path;
			switch (name.toLowerCase()) {
				case "x":
					path = "position.x";
					break;
				case "y":
					path = "position.y";
					break;
				default:
					path = `data.${name}`;
			}
			Utils.ensureJsonPath(ele, path, value);
		}
		return ele;
	}

	static toPlain(el: any | any[]): any {
		if (_.isArray(el)) {
			if (Utils.isEmpty(el)) {
				return [];
			}
			return el.map((e) => CytoUtils.toPlain(e));
		} else {
			if (Utils.isEmpty(el)) {
				return null;
			}
			if (CytoUtils.isCytoNode(el)) {
				let p = _.cloneDeep(el.data() || {});
				p.id = el.id();
				return p;
			} else if (CytoUtils.isCytoEdge(el)) {
				let p = _.cloneDeep(el.data() || {});
				// rename, the Qwiery naming is sourceId/targetId
				p.sourceId = p.source || null;
				delete p.source;
				p.targetId = p.target || null;
				delete p.target;
				p.id = el.id();
				return p;
			} else {
				// presumable a cy element as json
				let p = _.clone(el.data || {});
				if (el.id) {
					p.id = el.id;
				}
				if (el.position) {
					_.assign(p, el.position);
				}
				if (p.source) {
					p.sourceId = p.source || null;
					delete p.source;
				}
				if (p.target) {
					p.targetId = p.target || null;
					delete p.target;
				}
				return p;
			}
		}
	}

	static isCytoElement(thing: any) {
		// difficult to characterize, seems the proto is an Array (WTF).
		// best next thing is the fact that id is a function
		return typeof thing.id === "function" && typeof thing.data === "function" && typeof thing.group === "function";
	}

	static isCytoNode(thing: any) {
		return CytoUtils.isCytoElement(thing) && thing.group() === "nodes";
	}

	static isCytoEdge(thing: any) {
		return CytoUtils.isCytoElement(thing) && thing.group() === "edges";
	}
}
