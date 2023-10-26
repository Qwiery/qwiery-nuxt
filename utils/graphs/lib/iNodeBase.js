import {Strings} from "../../utils/lib/strings.js";
import IId from "./iid.js";

/**
 * The minimum requirements for a node.
 * @interface
 */
export default class INodeBase extends IId {

	/**
	 * The (not necessarily unique) name of the node.
	 * @type {string|null}
	 */
	name = null;

	/**
	 * The node type.
	 * This attribute is mostly there for compatibility with the Qwiery Semantic framework.
	 * @type {string}
	 */
	typeName = "Unknown";

	toJSON() {
		throw new Error(Strings.InterfaceMethod());
	}
}

