import { describe, test, it, expect, vi } from "vitest";
import { Gravitation, TwoInOne } from "./plugins";
import Qwiery from "../lib/qwiery.js";

describe("Plugins", function () {
	it("should be pluggable", function () {
		Qwiery.plugin(Gravitation.plugin());

		const q = new Qwiery();
		expect(q.collapse).toBeDefined();
		expect(q.collapse()).toEqual(Number.EPSILON);
	});

	it("should combine adapter and plugin", async function () {
		/*
		 * The plugin also defines an adapter.
		 * */
		Qwiery.plugin(TwoInOne);
		const q = new Qwiery({ adapters: ["two-in-one", "memory"] });
		let n = await q.createNode("a");
		expect(n).toEqual({
			id: "a",
			color: "white",
		});
		console.log(n);
		// the color is a static which always gets added to node
		q.setColor("red");
		n = await q.createNode("b");
		expect(n).toEqual({
			id: "b",
			color: "red",
		});
		console.log(n);
	});

	it("should raise an error on non-plugin", function () {
		expect(() => {
			Qwiery.plugin(null);
		}).toThrow(Error);
		expect(() => {
			Qwiery.plugin(13);
		}).toThrow(Error);
		expect(() => {
			Qwiery.plugin({});
		}).toThrow(Error);
		expect(() => {
			Qwiery.adapter();
		}).toThrow(Error);
		expect(() => {
			Qwiery.adapter(12, {});
		}).toThrow(Error);
		expect(() => {
			Qwiery.adapter("aa", {});
		}).toThrow(Error);
		expect(() => {
			Qwiery.adapter("aa", 12);
		}).toThrow(Error);
	});
	it("should warn if using unknown adapter id", function () {
		vi.spyOn(console, "warn").mockImplementation();
		const q = new Qwiery({ adapters: ["a"] });
		expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("but does not exist."));
	});
	it("should warn if using an empty adapter sequence", function () {
		vi.spyOn(console, "warn").mockImplementation();
		const q = new Qwiery({ adapters: [] });
		expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("no data will be ingested"));
	});

	it("should work with non-async methods", function () {
		Qwiery.plugin({
			number() {
				return 101;
			},
			createNode() {
				return "Worked";
			},
		});
		let q = new Qwiery();
		expect(q.number()).toEqual(101);
		// note that this overrides the base methods as well as the async nature
		expect(q.createNode()).toEqual("Worked");
	});
});
