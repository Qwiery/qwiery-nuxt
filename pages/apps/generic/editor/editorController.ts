import EventEmitter from "eventemitter3";
import GraphAPI from "../../../../utils/GraphAPI";
import type { IQwieryNode } from "~/utils";
import { Utils } from "@orbifold/utils";
import _ from "lodash";
/*
 * MVC controller between the graph viewer and the backend (via GraphAPI).
 * */
export default class EditorController extends EventEmitter {
	public commitChanges: boolean = true;

	async deleteNode(node: IQwieryNode) {
		if (!node || Utils.isEmpty(node.id)) {
			throw new Error("Nothing to delete.");
		}
		if (node && this.commitChanges) {
			await GraphAPI.deleteNode(node.id);
		}
		this.emit("nodeDeleted", node);
	}

	async createNode(node: IQwieryNode) {
		if (!node || Utils.isEmpty(node.id)) {
			throw new Error("Nothing to create.");
		}
		if (node && this.commitChanges) {
			// donnot save the position
			const n = _.clone(node);
			delete n.x;
			delete n.y;
			await GraphAPI.createNode(node);
		}

		this.emit("nodeCreated", node);
	}

	async updateNode(node: IQwieryNode) {
		if (!node || Utils.isEmpty(node.id)) {
			throw new Error("Nothing to update.");
		}
		if (this.commitChanges) {
			await GraphAPI.updateNode(node);
		}
		this.emit("nodePropertiesUpdated", node);
	}
}
