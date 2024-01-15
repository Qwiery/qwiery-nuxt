import { Graph, INodeBase } from "@orbifold/graphs";
// import { CypherAdapter } from "@orbifold/cypher";

import { Utils } from "@orbifold/utils";
import { GraphAPIBase } from "./GraphAPIBase";
import type { IQwieryNode } from "~/utils/index";
import _ from "lodash";

const showErrorToast = (error) => Toasts.error(error.value.data.message);

/**
 * The graph API is a proxy to the REST service.
 * It's the default implementation of {@link GraphAPIBase}
 * If you use Neo4j and wish to connect directly to it without the REST service, you can use the {@link Neo4jGraphAPI}.
 */
export default class Neo4jGraphAPI implements GraphAPIBase {}
