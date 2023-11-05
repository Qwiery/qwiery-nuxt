import { onMounted, onUnmounted } from "vue";

export function useKeyDownHandler(handler: any) {
	onMounted(() => document.addEventListener("keydown", handler));
	onUnmounted(() => document.removeEventListener("keydown", handler));
}
