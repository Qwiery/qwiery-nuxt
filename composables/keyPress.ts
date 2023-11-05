import { onMounted, onUnmounted } from "vue";

export function useKeyPressHandler(handler: any) {
	onMounted(() => document.addEventListener("keypress", handler));
	onUnmounted(() => document.removeEventListener("keypress", handler));
}
