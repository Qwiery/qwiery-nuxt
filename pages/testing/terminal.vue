<template>
	<Terminal class="m-3" :executor="executor" />
</template>
<script setup lang="ts">
	async function executor(input: string) {
		return [`Hello ${input}!`];
	}

	definePageMeta({
		layout: "plain",
	});
</script>
