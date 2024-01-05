<template>
	<GraphViewer ref="viewer" :license="license" />
</template>
<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import { Graph } from "@orbifold/graphs";
	const viewer = ref(null);
	const { $yfiles } = useNuxtApp();
	const license = ref();
	function setLicense() {
		const config = useRuntimeConfig();
		if (!config.public.YFILES_LICENSE || config.public.YFILES_LICENSE === "") {
			throw new Error("No yFiles license found.");
		}
		license.value = <any>config.public.YFILES_LICENSE;
	}
	setLicense();
	onMounted(() => {
		setTimeout(() => {
			const yviz = <any>viewer.value;
			yviz.setStyle("default");
			const g = Graph.create("erdos");
			yviz.loadGraph(g);
			yviz.layout();
			console.log($yfiles.toEdgeTag({ id: "a", source: "b", target: "c" }));
		}, 300);
	});
</script>
<style>
	.graphHost {
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
