import _ from "lodash";
import { Utils } from "./utils/lib/utils.js";
import type { RawNode, RawEdge } from "@linkurious/ogma";

export default class OgmaUtils {
	/**
	 *
	 * @param obj
	 * @return {RawGraph}
	 */
	static toOgmaGraph(g) {
		return {
			nodes: g.nodes.map((n) => OgmaUtils.toRawNode(n)),
			edges: g.edges.map((e) => OgmaUtils.toRawEdge(e)),
		};
	}

	/**
	 * Extracts an array of Ogma RawNodes for the given array of plain objects.
	 * @see {@link toRawNode}
	 * @see https://doc.linkurious.com/ogma/latest/api.html#RawNode
	 * @param nodes {any[]}  The array of objects to extract the RawNodes from.
	 * @return {(RawNode<any> | null)[]}
	 */
	static toOgmaNodes(nodes: any[]): (RawNode<any> | null)[] {
		return nodes.map((n) => OgmaUtils.toRawNode(n));
	}

	/**
	 * Extracts an Ogma RawNode for the given plain object.
	 *  @description
	 *  This is an alias for {@link toRawNode}.
	 *  A RawNode is an object with the following properties:
	 *  - id: string
	 *  - attributes: NodeAttributes
	 *  - data: any
	 * @see https://doc.linkurious.com/ogma/latest/api.html#RawNode
	 * @alias toRawNode
	 * @param obj {*}   The object to extract the RawNode from.
	 * @return {RawNode}   The extracted RawNode.
	 */
	static toOgmaNode(obj: any): RawNode<any> | null {
		return OgmaUtils.toRawNode(obj);
	}

	/**
	 * Extracts an Ogma RawNode for the given plain object.
	 * @description
	 * This is an alias for {@link toRawNode}.
	 * A RawNode is an object with the following properties:
	 * - id: string
	 * - attributes: NodeAttributes
	 * - data: any
	 *
	 * @alias toOgmaNode
	 * @see https://doc.linkurious.com/ogma/latest/api.html#RawNode
	 * @see https://doc.linkurious.com/ogma/latest/api.html#NodeAttributes
	 * @param obj {*}   The object to extract the RawNode from.
	 * @return {RawNode}
	 */
	static toRawNode(obj: any): RawNode | null {
		if (Utils.isEmpty(obj)) {
			return null;
		}
		if (!_.isPlainObject(obj)) {
			throw new Error("Expect plain object.");
		}
		const rawNode: RawNode = {
			id: Utils.id(),
		};
		const d = _.clone(obj);
		if (d.id) {
			rawNode.id = obj.id;
			delete d.id;
		}
		if (d.x) {
			OgmaUtils.setRawProperty(rawNode, "attributes.x", d.x);
			delete d.x;
		}
		if (d.y) {
			OgmaUtils.setRawProperty(rawNode, "attributes.y", d.y);
			delete d.x;
		}
		if (d.color) {
			OgmaUtils.setRawProperty(rawNode, "attributes.color", d.color);
			delete d.color;
		}
		if (d.text) {
			OgmaUtils.setRawProperty(rawNode, "attributes.text.content", d.text);
			delete d.text;
		}
		// whatever remains goes into the data
		if (!Utils.isEmpty(d)) {
			rawNode.data = d;
		}
		return rawNode;
	}

	/**
	 * Extracts an Ogma RawEdge for the given plain object.
	 * @param obj {*}   The object to extract the RawEdge from.
	 * @return {RawEdge}
	 */
	static toRawEdge(obj: any): RawEdge {
		if (!_.isPlainObject(obj)) {
			throw new Error("Expect plain object.");
		}
		const rawEdge: RawEdge = {
			id: Utils.id(),
			source: "",
			target: "",
		};
		const d = _.clone(obj);
		if (d.id) {
			rawEdge.id = obj.id;
			delete d.id;
		}

		if (d.source) {
			rawEdge.source = obj.source;
			delete d.source;
		}
		if (d.sourceId) {
			rawEdge.source = obj.sourceId;
			delete d.sourceId;
		}
		if (d.from) {
			rawEdge.source = obj.from;
			delete d.from;
		}
		if (Utils.isEmpty(rawEdge.source)) {
			throw new Error("Could not assign the required 'source' property of an Ogma RawEdge.");
		}

		if (d.target) {
			rawEdge.target = obj.target;
			delete d.target;
		}
		if (d.targetId) {
			rawEdge.target = obj.targetId;
			delete d.targetId;
		}
		if (d.to) {
			rawEdge.target = obj.to;
			delete d.to;
		}
		if (Utils.isEmpty(rawEdge.target)) {
			throw new Error("Could not assign the required 'target' property of an Ogma RawEdge.");
		}
		// whatever remains goes into the data
		if (!Utils.isEmpty(d)) {
			rawEdge.data = d;
		}
		return rawEdge;
	}

	/**
	 *
	 * @param rawNode {*} The raw node to extend.
	 * @param name {string} The name or a path of the RawNode to set.
	 * @param value {*} The value to set.
	 * @return {*}
	 */
	static setRawProperty(rawNode, name, value) {
		if (!rawNode) {
			rawNode = {};
		}
		if (name.indexOf(".") > -1) {
			Utils.ensureJsonPath(rawNode, name, value);
		} else {
			let path;
			switch (name.toLowerCase()) {
				case "color":
					path = "attributes.color";
					break;
				case "text":
					path = "attributes.text.content";
					break;

				default:
					throw new Error(`RawNode property '' is not recognized as a valid Ogma RawNode property.`);
			}
			Utils.ensureJsonPath(rawNode, path, value);
		}
		return rawNode;
	}
}
