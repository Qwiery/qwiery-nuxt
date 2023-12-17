import { describe, it, expect } from "vitest";
import OgmaUtils from "../utils/ogmaUtils";

describe("ogmaUtils", () => {
	it("should convert nodes", () => {
		expect(OgmaUtils.toOgmaNode(null)).toBe(null);
		expect(OgmaUtils.toOgmaNode({})).toBe(null);
		expect(OgmaUtils.toOgmaNode({ id: 2 })).toEqual({ id: 2 });
		expect(OgmaUtils.toOgmaNode({ id: 2, a: "4" })).toEqual({ id: 2, data: { a: "4" } });
	});
});
