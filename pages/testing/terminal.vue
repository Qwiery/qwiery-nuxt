<template>
	<Terminal class="m-3" :executor="executor" />
</template>
<script setup lang="ts">
	// https://pyodide.org/en/stable/usage/quickstart.html
	import { Utils } from "../../utils/utils/lib/utils";

	let stdOut = "";

	async function loadPython() {
		let indexURL = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/";
		const urlParams = new URLSearchParams(window.location.search);
		const buildParam = urlParams.get("build");
		if (buildParam) {
			if (["full", "debug", "pyc"].includes(buildParam)) {
				indexURL = indexURL.replace("/full/", "/" + urlParams.get("build") + "/");
			} else {
				console.warn('Invalid URL parameter: build="' + buildParam + '". Using default "full".');
			}
		}
		const { loadPyodide } = await import(/* @vite-ignore */ indexURL + "pyodide.mjs");

		const pyodide = await loadPyodide();
		pyodide.setStdout({
			batched: (msg) => {
				stdOut += msg;
			},
		});
		pyodide.setStderr({
			batched: (msg) => {
				stdOut += msg;
			},
		});
		globalThis.pyodide = pyodide;
	}

	onMounted(async () => {
		await loadPython();
		const pyodide = globalThis.pyodide;
		await pyodide.loadPackage("micropip");
		const micropip = pyodide.pyimport("micropip");
		await micropip.install("networkx");
		// const out = pyodide.runPython(`
		// import networkx as nx;
		// G = nx.Graph();
		// G.name = "Swa"
		// G.add_edge('a', 'b', weight=0.6);
		// G.add_edge('a', 'c', weight=0.4);
		// print(G.edges(data=True));
		// `);
		// console.log(pyodide.globals.get("G").name);
	});

	async function executor(input: string) {
		stdOut = "";
		try {
			const out = globalThis.pyodide.runPython(input);
			const result: string[] = [];
			if (!Utils.isEmpty(stdOut)) {
				result.push(stdOut);
			}
			if (!Utils.isEmpty(out)) {
				result.push(out);
			}
			console.log(result);
			return result;
		} catch (e: any) {
			console.error(e);
			return e.stack.split("\n");
		}
	}

	definePageMeta({
		layout: "plain",
	});
</script>
