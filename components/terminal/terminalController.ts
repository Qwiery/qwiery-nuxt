import { EventEmitter } from "eventemitter3";
import _ from "lodash";
export default class TerminalController extends EventEmitter {
	public static preamble = "qwiery>";

	private outputStack: string[] = [];
	private inputStack: string[][] = [];
	private historyIndex: number = -1;
	private events = {
		output: "output",
		input: "input",
		response: "response",
	};
	constructor() {
		super();
	}
	private raiseEvent(eventName: string, data: any): void {
		if (this.events[eventName]) {
			this.emit(this.events[eventName], data);
		} else {
			throw new Error(`The event ${eventName} does not exist`);
		}
	}

	/**
	 * Passes a command to be executed.
	 * @param command {string} The command to be executed.
	 * @return {Promise<void>}
	 */
	public async execute(command: string): Promise<void> {
		if (Utils.isEmpty(command)) {
			return this.addInput("");
		}

		const [commandName, ...args] = command.split(" ");
		// const result = this[commandName]?.(args);
		switch (commandName.trim().toLowerCase()) {
			case "clear":
				return this.clear();
		}
		const result = `You typed: ${command}`;
		this.addInput(command);
		this.addOutput(result);
		return;
	}
	private clear() {
		this.outputStack = [];
		this.raiseEvent("output", this.outputStack);
	}
	private addHistory(input: string | string[]) {
		if (_.isArray(input)) {
			this.inputStack.push(<string[]>input);
		} else {
			this.inputStack.push([<string>input]);
		}

		this.historyIndex = this.inputStack.length;
	}
	private addOutput(output: string) {
		this.outputStack.push(output);
		this.raiseEvent("output", this.outputStack);
	}
	private addInput(input: string) {
		this.outputStack.push(`<span class="text-blue-400">${TerminalController.preamble}</span> ${input}`);
		if (!Utils.isEmpty(input)) {
			this.addHistory(input);
		}
		this.raiseEvent("output", this.outputStack);
	}
	historyUp() {
		if (this.historyIndex - 1 < 0) {
			return;
		}
		this.historyIndex--;
		this.raiseEvent("input", this.inputStack[this.historyIndex]);
	}
	historyDown() {
		if (this.historyIndex + 1 > this.inputStack.length - 1) {
			this.historyIndex = this.inputStack.length;
			return this.raiseEvent("input", [""]);
		}
		this.historyIndex++;
		this.raiseEvent("input", this.inputStack[this.historyIndex]);
	}
	tab() {}
}
