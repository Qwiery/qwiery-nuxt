import { describe, test, it, expect } from "vitest";
import Store from "../lib/store";
import { Utils } from "../../utils/lib/utils.js";
describe("Store", function () {
	it("should fetch node specs", function () {
		// empty payload will not do
		expect(Utils.getNodeSpecs({})).toBeNull();
		// just a string is an id
		expect(Utils.getNodeSpecs("A")).toEqual({
			id: "A",
			data: null,
			labels: [],
		});
		// a function will work as well
		expect(Utils.getNodeSpecs(() => "A")).toEqual({
			id: "A",
			data: null,
			labels: [],
		});
		// the id in the payload
		expect(Utils.getNodeSpecs({ id: "V" })).toEqual({
			id: "V",
			data: {},
			labels: [],
		});
		expect(Utils.getNodeSpecs({ id: "V", name: "G" })).toEqual({
			id: "V",
			data: { name: "G" },
			labels: [],
		});

		// generated id
		let specs = Utils.getNodeSpecs({ name: "G" });
		expect(specs.id).toBeNull();
		expect(specs.data).toEqual({ name: "G" });

		specs = Utils.getNodeSpecs({ name: "G", id: "K" }, "W");
		expect(specs.id).toEqual("W");
		// note the overriden id
		expect(specs.data).toEqual({ name: "G" });

		// just a label will not do
		expect(Utils.getNodeSpecs(null, null, "a")).toBeNull();
		expect(Utils.getNodeSpecs(null, "G", "a")).toEqual({
			id: "G",
			data: null,
			labels: ["a"],
		});

		expect(Utils.getNodeSpecs(null, "G", "a,b")).toEqual({
			id: "G",
			data: null,
			labels: ["a", "b"],
		});
		expect(Utils.getNodeSpecs({}, "G", "a,b")).toEqual({
			id: "G",
			data: null,
			labels: ["a", "b"],
		});

		expect(Utils.getNodeSpecs({ x: 33 }, "G", "a,b")).toEqual({
			id: "G",
			data: { x: 33 },
			labels: ["a", "b"],
		});
	});
});
