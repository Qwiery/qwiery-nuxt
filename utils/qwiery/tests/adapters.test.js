import { describe, test, it, expect } from "vitest";
import { Utils } from "../../utils/lib/utils.js";
import { DefaultNodeLabelAdapter } from "./plugins.js";
import Qwiery from "../lib/qwiery.js";

function HackedNodeCountAdapter(options, done) {
	const api = {
		/**
		 * Shows how the last return value is given and can be manipulated by adapters.
		 */
		nodeCount(done) {
			return async ([predicate], lastReturnValue) => {
				// the lastReturnValue contains the actual stored amount but we hack it here by adding whatever you like
				done(null, [predicate], lastReturnValue + 1);
			};
		},
	};
	process.nextTick(() => {
		// first param is an init error
		done(null, api);
	});
}

function AlwaysFailingAdapter(options, done) {
	process.nextTick(() => {
		// first param is an init error
		done("End of the road adapter.", null);
	});
}

describe("Qwiery Adapters", function () {
	it("should use the default node label adapter", async function () {
		/*
		 * Shows how to use adapters to set defaults.
		 * */
		Qwiery.plugin((Q) => {
			Q.adapter("set-node-label", DefaultNodeLabelAdapter);
		});

		const q = new Qwiery({ adapters: ["set-node-label", "memory"] });
		await q.createNode("a");
		const found = await q.getNode("a");
		expect(found).toEqual({ id: "a", labels: ["Something"] });
	});

	it("should pass initialization errors", async function () {
		Qwiery.plugin((Q) => {
			Q.adapter("bad-one", AlwaysFailingAdapter);
		});
		const q = new Qwiery({ adapters: ["bad-one"] });

		await expect(q.createNode("a")).rejects.toThrow(Error);
	});

	it("should access return values", async function () {
		Qwiery.plugin((Q) => {
			Q.adapter("bad-count", HackedNodeCountAdapter);
		});
		// note that the hacked is positioned AFTER the storage to manipulate the returned result
		const q = new Qwiery({ adapters: ["memory", "bad-count"] });
		await q.createNode("a");
		// the memory store contains only one item but the adapter skews this
		expect(await q.nodeCount()).toEqual(2);
	});

	it("should raise an error", async function () {
		function MyFaultyAdapter(Q) {
			function CustomAdapterMethods(options, done) {
				// implement only those methods you wish to alter
				const api = {
					createNode(done) {
						return async ([data, id, labels]) => {
							// nothing can be saved, this adapter will always trigger an error
							done("Angry adapter", [data, id, labels], null);
						};
					},
				};
				process.nextTick(() => {
					// first param is an init error
					done(null, api);
				});
			}

			Q.adapter("my-faulty-adapter", CustomAdapterMethods);
		}

		Qwiery.plugin(MyFaultyAdapter);
		const q = new Qwiery({ adapters: ["my-faulty-adapter"] });
		await expect(q.createNode("a")).rejects.toThrow("Angry");
	});

	it("should accept parameters", async () => {
		const x = Utils.randomId();
		/*
		 * Don't need to add the memory plugin since it's added by default.
		 * Whatever options are assigned to an adapter is passed on when the adapter is initialized.
		 * */
		const q = new Qwiery({
			adapters: ["memory"],
			memory: {
				x,
			},
		});
		await new Promise((r) => setTimeout(r, 500));

		const api = q.storageApis[0];
		expect(api.store.options.x).toEqual(x);
	});
});
