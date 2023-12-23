import _ from "lodash";
import { Utils } from "@orbifold/utils";
import { GraphComponent } from "yfiles";

export default class yFilesUtils {
	/**
	 * Loads the graph.
	 * @param g {Graph}
	 * @param graphComponent {GraphComponent}
	 * @return {void}
	 */
	static loadGraph(g, graphComponent) {
		const nodeDic = {};
		for (const n of g.nodes) {
			const node = yFilesUtils.createNode(n, graphComponent);
			nodeDic[n.id] = node;
		}
		for (const e of g.edges) {
			const sourceNode = nodeDic[e.sourceId];
			const targetNode = nodeDic[e.targetId];
			if (sourceNode && targetNode) {
				const tag = yFilesUtils.toEdgeTag(e);
				graphComponent.graph.createEdge({ source: sourceNode, target: targetNode, tag });
			}
		}
	}

	/**
	 * Extracts an yFiles RawNode for the given plain object.
	 * @see https://doc.linkurious.com/ogma/latest/api.html#RawNode
	 * @see https://doc.linkurious.com/ogma/latest/api.html#NodeAttributes
	 * @param n
	 * @param graphComponent {GraphComponent}
	 * @return {*}
	 */
	static createNode(n, graphComponent) {
		if (!_.isPlainObject(n)) {
			throw new Error("Expect plain object.");
		}
		const tag = {
			id: Utils.id(),
		};
		const location = {
			x: 0,
			y: 0,
		};
		let labels = [];
		const d = _.clone(n);

		if (d.x) {
			location.x = d.x;
			delete d.x;
		}
		if (d.y) {
			location.y = d.y;
			delete d.x;
		}
		if (d.labels) {
			labels = d.labels;
		}
		_.assign(tag, d);
		const node = graphComponent.graph.createNodeAt({ location, tag });
		if (labels.length > 0) {
			// todo: handle multiple labels
			graphComponent.graph.addLabel(node, labels[0]);
		}
		return node;
	}

	static toEdgeTag(e) {
		const tag = _.clone(e);
		delete tag.source;
		delete tag.sourceId;
		delete tag.target;
		delete tag.targetId;
		return tag;
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
