import IId from "./iid.js";

/**
 * The minimum requirements for an edge.
 * @interface
 */
export default class IEdgeBase extends IId {
    sourceId;
    targetId;

    toJSON(){}
}

