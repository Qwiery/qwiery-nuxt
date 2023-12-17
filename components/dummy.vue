<template>
	<h1>Dummy</h1>
	<p>{{ things }}</p>
</template>
<script setup lang="ts">
	import { Utils } from "../utils/utils/lib/utils";
	let things = ref("");
	defineExpose({
		go: () => {
			things.value = Utils.randomId(10);
		},
	});
</script>
