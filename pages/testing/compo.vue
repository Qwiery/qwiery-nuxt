<template>
	<Dummy ref="dummy" />
	<button class="btn" @click="go()">Go</button>
</template>
<script setup lang="ts">
	const dummy = ref<any>(null);
	definePageMeta({
		layout: "plain",
	});

	function go() {
		dummy.value.go();
	}
</script>
