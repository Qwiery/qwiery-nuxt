import _ from "lodash";
import { Utils } from "@orbifold/utils";

export default class GoUtils {
	/**
	 * Turns the given object into a Go GraphLinksModel.
	 */
	static toLinkModel(g) {
		const init = {
			nodeDataArray: [],
			linkDataArray: [],
		};

		if (!g.nodes || Utils.isEmpty(g.nodes)) {
			return init;
		}
		init.nodeDataArray.push(...g.nodes.map((n) => GoUtils.toGoNode(n)));
		if (!g.edges || Utils.isEmpty(g.edges)) {
			return init;
		}
		init.linkDataArray.push(...g.edges.map((e) => GoUtils.toGoEdge(e)));
		return init;
	}

	/**
	 * Turns the given object into a Go node.
	 */
	static toGoNode(obj) {
		if (!_.isPlainObject(obj)) {
			throw new Error("Expected a plain object.");
		}
		const goNode = {
			key: Utils.id(),
		};
		const d = _.clone(obj);
		if (d.id) {
			goNode.key = obj.id;
			delete d.id;
		}
		if (d.x) {
			GoUtils.setRawProperty(goNode, "location.x", d.x);
			delete d.x;
		}
		if (d.y) {
			GoUtils.setRawProperty(goNode, "location.y", d.y);
			delete d.x;
		}

		// whatever remains goes into the data
		if (!Utils.isEmpty(d)) {
			goNode.data = d;
		}
		return goNode;
	}

	static toGoEdge(obj) {
		if (!_.isPlainObject(obj)) {
			throw new Error("Expected a plain object.");
		}
		const cyEdge = {
			key: Utils.id(),
		};
		const d = _.clone(obj);
		if (d.id) {
			cyEdge.id = obj.id;
			delete d.id;
		}

		if (d.source) {
			cyEdge.from = obj.source;
			delete d.source;
		}
		if (d.sourceId) {
			cyEdge.from = obj.sourceId;
			delete d.sourceId;
		}
		if (d.from) {
			cyEdge.from = obj.from;
			delete d.from;
		}
		if (Utils.isEmpty(cyEdge.from)) {
			throw new Error("Could not assign the required 'source' property of a Cyto edge.");
		}

		if (d.target) {
			cyEdge.to = obj.target;
			delete d.target;
		}
		if (d.targetId) {
			cyEdge.to = obj.targetId;
			delete d.targetId;
		}
		if (d.to) {
			cyEdge.to = obj.to;
			delete d.to;
		}
		if (Utils.isEmpty(cyEdge.to)) {
			throw new Error("Could not assign the required 'target' property of a Cyto edge.");
		}
		// whatever remains goes into the data
		if (!Utils.isEmpty(d)) {
			cyEdge.data = d;
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
}
