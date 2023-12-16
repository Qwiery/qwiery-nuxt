<template>
	<div @click="setFocusOnInput()">
		<div ref="terminal" class="bg-black text-white font-mono p-2 h-[450px] rounded">
			<div v-if="showBanner">
				<div class="my-2 bg-blue-600 text-white px-2 py-1 rounded">Qwiery v{{ info }} Terminal</div>
			</div>
			<div class="h-[370px] pb-4 overflow-scroll">
				<div v-html="output"></div>
				<div class="flex mb-0">
					<div class="my-1 mr-2 text-blue-400">{{ TerminalController.preamble }}</div>
					<input v-model="input" ref="cmdInput" @keydown.enter="execute($event)" @keydown.up="historyUp($event)" @keydown.down="historyDown($event)" @keydown.tab="tab($event)" class="border-none bg-transparent outline-none text-white font-mono w-full" autofocus />
				</div>
				<div ref="bottom" class="h-[50px]"></div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const props = defineProps<{
		executor?: (input: string) => Promise<string[]>;
	}>();
	import Qwiery from "../../utils/qwiery/lib/qwiery";
	import TerminalController from "./terminalController";

	const showBanner = ref(true);
	const info = Qwiery.version;
	const cmdInput = ref<HTMLInputElement>(null!);
	const bottom = ref<HTMLDivElement>(null!);
	const input = ref<string>("");
	const output = ref<string>("");

	function createController() {
		const controller = new TerminalController();
		if (props.executor) {
			controller.executor = props.executor;
		}
		controller.on("output", (obj: any) => {
			switch (obj.type) {
				case "input":
					input.value += formatInput(obj.data);
					break;
				case "output":
					output.value = formatOutput(obj.data);
					break;
				case "error":
					output.value = formatError(obj.data);
					break;
			}

			bottom.value?.scrollIntoView({
				behavior: "instant",
				block: "end",
				inline: "nearest",
			});
		});
		controller.on("input", (data: string[]) => {
			input.value = data.join("<br/>");
			bottom.value?.scrollIntoView(false);
		});
		return controller;
	}

	function formatOutput(output: string | string[]) {
		if (Array.isArray(output)) {
			return formatOutput((<string[]>output).join("<br/>"));
		}
		return output;
	}

	function formatInput(input: string | string[]) {
		if (Array.isArray(input)) {
			return formatInput((<string[]>input).join("<br/>"));
		}
		return `<span class="text-blue-400">${TerminalController.preamble}</span> ${input}`;
	}

	function formatError(error: string | Error) {
		if (error instanceof Error) {
			return `<span class="text-red-400">${error.message}</span>`;
		}
		return `<span class="text-red-400">${error}</span>`;
	}

	let controller: TerminalController | null = null;

	onMounted(() => {
		setFocusOnInput();
		controller = createController();
	});

	function setFocusOnInput() {
		cmdInput.value?.focus();
	}

	function historyUp(event: KeyboardEvent) {
		event.preventDefault();
		controller?.historyUp();
	}

	function historyDown(event: KeyboardEvent) {
		event.preventDefault();
		controller?.historyDown();
	}

	function tab(event: KeyboardEvent) {
		event.preventDefault();
		controller?.tab();
	}

	function execute(event: KeyboardEvent) {
		event.preventDefault();
		controller?.execute(input.value);
		input.value = "";
	}
</script>
<style></style>
