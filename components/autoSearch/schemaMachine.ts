export default class SchemaMachine {
	// @ts-ignore
	private schema: Graph;

	// @ts-ignore
	constructor(schema: Graph) {
		this.schema = schema;
	}

	allNodeLabels() {
		return this.schema.nodes.map((n) => n.name);
	}

	allEdgeLabels() {
		return this.schema.edges.map((e) => e.name);
	}

	/**
	 * Returns the list of possibilities for the given current path.
	 * @param path
	 */
	next(path: string[] = []) {
		if (path.length === 0) {
			return this.allNodeLabels().map((l) => [l]);
		}
		const coll: any = [];
		// any edge label for each node label
		this.allNodeLabels().forEach((label: any) => {
			coll.push([...path, "*", label]);
		});

		this.allEdgeLabels().forEach((label: any) => {
			coll.push([...path, label, "*"]);
		});

		return coll;
	}
}
