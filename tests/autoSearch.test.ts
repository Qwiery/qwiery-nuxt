import { describe, test, it, expect } from "vitest";
import Graph from "../utils/graphs/lib/graph";
import SchemaMachine from "../components/autoSearch/schemaMachine";

const schema = new Graph();
const A = schema.addNode({ name: "A" });
const B = schema.addNode({ name: "B" });
const C = schema.addNode({ name: "C" });
schema.addEdge({ sourceId: A.id, targetId: B.id, name: "E" });
schema.addEdge({ sourceId: B.id, targetId: C.id, name: "F" });
schema.addEdge({ sourceId: B.id, targetId: C.id, name: "G" });

// A-[E]->B
// B-[F,G]->C
describe("AutoSearch", () => {
	it("should get the suggestion list", () => {
		const m = new SchemaMachine(schema);
		expect(m.next([])).toHaveLength(3);
		expect(m.next(["A"])).toHaveLength(6);
		expect(m.next(["A", "*", "B"])).toHaveLength(6);
	});
});
