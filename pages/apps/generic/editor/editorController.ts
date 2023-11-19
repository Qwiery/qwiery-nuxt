import EventEmitter from "eventemitter3";
import { GraphDB } from "~/server/api/graph/graphDB";

/*
 * MVC controller between the graph viewer and the backend (via GraphAPI).
 * */
export default class EditorController extends EventEmitter {
	public commitChanges: boolean = true;

	async deleteNode(node) {
		if (node && this.commitChanges) {
			await GraphAPI.deleteNode(node.id);
		}
		this.emit("nodeDeleted", node);
	}

	async createNode() {}

	async updateNode(node) {
		if (node && this.commitChanges) {
			await GraphAPI.updateNode(node.data(), node.id(), node.data("labels"));
		}
		this.emit("nodePropertiesUpdated", node);
	}
}
