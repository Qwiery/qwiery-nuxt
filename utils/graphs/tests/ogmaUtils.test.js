import { describe, test, it, expect } from "vitest";
import OgmaUtils from "../../ogmaUtils.js";

describe("Ogma Utils", () => {
	it("should get raw nodes", () => {
		expect(OgmaUtils.setRawProperty(null, "text", "abc")).toEqual({ attributes: { text: { content: "abc" } } });
		const u = { a: { v: 4 } };
		expect(OgmaUtils.setRawProperty(u, "text", "abc")).toEqual({ a: { v: 4 }, attributes: { text: { content: "abc" } } });
	});
	it("should convert to RawNode", () => {
		expect(OgmaUtils.toRawNode({ id: 12, text: "a" })).toEqual({ id: 12, attributes: { text: { content: "a" } } });
		expect(OgmaUtils.toRawNode({ id: 12, text: "a", color: "red" })).toEqual({ id: 12, attributes: { text: { content: "a" }, color: "red" } });
		expect(OgmaUtils.toRawNode({ id: 12, text: "a", color: "red", stuff: 44 })).toEqual({
			id: 12,
			attributes: { text: { content: "a" }, color: "red" },
			data: { stuff: 44 },
		});
	});
});
