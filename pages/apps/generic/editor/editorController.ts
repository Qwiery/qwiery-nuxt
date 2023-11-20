import EventEmitter from "eventemitter3";
import GraphAPI from "../../../../utils/GraphAPI";
import type { IQwieryNode } from "~/utils";
import { Utils } from "../../../../utils/utils/lib/utils";

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

	async createNode() {}

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
