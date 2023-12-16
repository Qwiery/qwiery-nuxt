import { describe, expect, it } from "vitest";
import TerminalController from "../components/terminal/terminalController";
import { Utils } from "../utils/utils/lib/utils";
describe("terminal", () => {
	it("should raise the output event", () => {
		const controller = new TerminalController();
		let raised = false;
		let something = Utils.randomId();
		controller.on("output", (data) => {
			expect(data).toBe(`You typed: ${something}`);
			raised = true;
		});
		controller.execute(something);
		expect(raised).toBeTruthy();
	});
});
