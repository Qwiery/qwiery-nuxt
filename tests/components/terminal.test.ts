import { describe, expect, it } from "vitest";
import TerminalController from "../../components/terminal/terminalController";
import { Utils } from "@orbifold/utils";

describe("terminal", () => {
	it("should raise the output event", () => {
		const controller = new TerminalController();
		let raised = false;
		let something = Utils.randomId();
		controller.on("output", (data) => {
			expect(data).toEqual({ type: "input", data: something });
			raised = true;
		});
		controller.execute(something);
		expect(raised).toBeTruthy();
	});

	it("should use the executor", async () => {
		const controller = new TerminalController();
		let data: string[] = [];
		let types: string[] = [];
		controller.executor = async (command) => {
			return "r";
		};
		controller.on("output", (obj) => {
			types.push(obj.type);
			data.push(obj.data);
		});
		await controller.execute("a");
		expect(data).toEqual(["a", "r"]);
		expect(types).toEqual(["input", "output"]);

		data = [];
		types = [];
		controller.executor = async (command) => {
			return new Error("e");
		};
		await controller.execute("a");
		expect(data).toEqual(["a", "e"]);
		expect(types).toEqual(["input", "error"]);

		data = [];
		types = [];
		controller.executor = async (command) => {
			return null;
		};
		await controller.execute("a");
		expect(data).toEqual(["a"]);
		expect(types).toEqual(["input"]);

		data = [];
		types = [];
		controller.executor = async (command) => {
			return undefined;
		};
		await controller.execute("a");
		expect(data).toEqual(["a"]);
		expect(types).toEqual(["input"]);
	});
});
