<template>
	<div>
		<div class="fixed inset-0 z-[60] hidden bg-[black]/60 px-4 transition-[display]" :class="{ '!block': store.showTerminal }" @click="store.toggleTerminal()"></div>

		<nav class="fixed bottom-0 top-0 z-[61] w-full max-w-[400px] bg-white shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 ltr:-right-[400px] rtl:-left-[400px] dark:bg-[#333333]" :class="{ 'ltr:!right-0 rtl:!left-0': store.showTerminal }">
			<client-only>
				<perfect-scrollbar
					:options="{
						swipeEasing: true,
						wheelPropagation: false,
					}"
					class="relative h-full overflow-x-hidden bg-gray-950"
				>
					<div class="text-white p-5 font-mono">
						<span>$> Just a dummy for now.</span><br />
						<span>$> </span><span class="animate-pulse">|</span>
					</div>
				</perfect-scrollbar>
			</client-only>
		</nav>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	import { useAppStore } from "@/stores/index";

	const store = useAppStore();
</script>
