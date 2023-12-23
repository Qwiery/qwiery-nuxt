import { EventEmitter } from "eventemitter3";
import _ from "lodash";
import { Utils } from "@orbifold/utils";

export default class TerminalController extends EventEmitter {
	public static preamble = "qwiery>";
	/**
	 * The executor is a function that takes a command and returns something which gets transformed into a printable bunch.
	 * @type {((input: string) => Promise<any>) | null}
	 */
	public executor: null | ((input: string) => Promise<string | string[] | null | Error | any>) = null;

	private inputStack: string[][] = [];
	private historyIndex: number = -1;
	private events = {
		output: "output",
		input: "input",
		response: "response",
		clear: "clear",
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
		const result = this.executor ? await this.executor(command) : null;
		this.addInput(command);
		if (result) {
			this.sendOutput(result);
		}

		return;
	}

	private clear() {
		this.raiseEvent("clear", null);
	}

	private addHistory(input: string | string[]) {
		if (_.isArray(input)) {
			this.inputStack.push(<string[]>input);
		} else {
			this.inputStack.push([<string>input]);
		}

		this.historyIndex = this.inputStack.length;
	}

	private sendOutput(output: string | string[] | null | Error | any) {
		if (output === null) {
			return;
		}
		if (_.isArray(output) || _.isString(output)) {
			this.raiseEvent("output", {
				type: "output",
				data: output,
			});
		} else if (output instanceof Error) {
			this.sendError(output);
		} else {
			this.raiseEvent("output", output);
		}
	}

	private sendError(error: string | Error) {
		if (error instanceof Error && !Utils.isEmpty(error.message)) {
			this.raiseEvent("output", {
				type: "error",
				data: error.message,
			});
		} else {
			this.raiseEvent("output", {
				type: "error",
				data: error,
			});
		}
	}

	private sendInput(input: string | string[]) {
		this.raiseEvent("output", {
			type: "input",
			data: input,
		});
	}

	private addInput(input: string) {
		this.sendInput(input);
		if (!Utils.isEmpty(input)) {
			this.addHistory(input);
		}
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
