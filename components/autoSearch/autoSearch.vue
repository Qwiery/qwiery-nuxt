<template>
	<div class="autocomplete">
		<div ref="preamble" class="flex min-h-[45px] overflow-y-scroll max-w-2xl"></div>
		<input ref="input" type="text" name="autoSearchInput" placeholder="Search graph" class="input focus" />
	</div>
</template>

<script setup lang="ts">
	import SchemaMachine from "~/components/autoSearch/schemaMachine";
	import GraphAPI from "~/utils/GraphAPI";

	const input = ref(null);
	const preamble = ref<HTMLDivElement>();
	let inputBox: any;
	let m: SchemaMachine = null;
	const schema = await GraphAPI.getSchema();
	if (!schema) {
		Toasts.error("Could not load the schema");
	} else {
		m = new SchemaMachine(schema);
	}

	function initAutoComplete() {
		let highlightIndex: number = -1;
		let currentPath: string[] = [];
		let autocompleteValues;
		inputBox.addEventListener("input", () => {
			clearDropdown();
			if (!inputBox.value) {
				return false;
			}
			createItems();
		});

		function itemsAreVisible() {
			return document.getElementsByClassName("autocomplete-items").length > 0;
		}

		function createItems() {
			highlightIndex = -1;

			const a = document.createElement("DIV");
			a.setAttribute("id", inputBox.id + "autocomplete-list");
			a.setAttribute("class", "autocomplete-items");
			inputBox.parentNode.appendChild(a);
			autocompleteValues = m.next(currentPath);
			for (let i = 0; i < autocompleteValues.length; i++) {
				if (isValidOption(i)) {
					const b = document.createElement("DIV");

					const name = autocompleteValues[i].join(" ");
					b.innerHTML = `<span class="badge bg-primary">${name}</span>`;
					b.innerHTML += "<input type='hidden' value='" + i + "'>";
					b.addEventListener("click", function (e) {
						appendLastAddition(autocompleteValues[i]);
						currentPath = autocompleteValues[i];
						inputBox.value = "";
						showNext();
					});
					a.appendChild(b);
				}
			}
		}

		function isValidOption(i) {
			const val = inputBox.value;
			if (currentPath.length === 0) {
				// single labels
				return autocompleteValues[i][0].substring(0, val.length).toUpperCase() == val.toUpperCase();
			} else {
				const labels = autocompleteValues[i]; // something like ["A","*","B","E1","C"]
				const edgeLabel = labels.slice(-2)[0];
				const nodeLabel = labels.slice(-2)[1];
				return edgeLabel.substring(0, val.length).toUpperCase() == val.toUpperCase() || nodeLabel.substring(0, val.length).toUpperCase() == val.toUpperCase();
			}
		}

		function clearBadges() {
			preamble.value?.replaceChildren();
			currentPath = [];
		}

		/**
		 * Removes the last edge and node.
		 * This effectively goes backwards in the path trail.
		 */
		function removeLastBadge() {
			if (currentPath.length === 0) {
				return;
			}
			if (currentPath.length === 1) {
				clearBadges();
			} else {
				currentPath.pop(); // remove the last node
				currentPath.pop(); // remove the edge
				createBadgeSequence(currentPath);
			}
			// recreate the items since the dropdown is still showing the previous path
			showNext();
		}

		function createBadgeSequence(sequence: string[]) {
			clearBadges();
			currentPath = sequence.slice(0);
			if (sequence.length === 0) {
				return;
			} else if (sequence.length === 1) {
				createFirstBadge(sequence[0]);
			} else {
				let nodeLabel = sequence.shift();
				createFirstBadge(nodeLabel);
				// for here on it's always an edge plus a node
				while (sequence.length > 0) {
					const edgeLabel = sequence.shift();
					const nodeLabel = sequence.shift();
					appendBadge(edgeLabel, nodeLabel);
				}
			}
		}

		/**
		 * The whole sequence is given but only the last addition is added.
		 */
		function appendLastAddition(sequence: string[]) {
			if (sequence.length > 1) {
				appendBadge(sequence.slice(-2)[0], sequence.slice(-2)[1]);
			} else {
				createFirstBadge(sequence[0]);
			}
		}

		/**
		 * Adds an edge and node to the chain of badges.
		 */
		function appendBadge(edgeLabel?: string, nodeLabel?: string) {
			if (!edgeLabel || !nodeLabel) {
				return;
			}
			let badge;
			addDash();
			if (edgeLabel !== "*") {
				badge = document.createElement("div");
				badge.classList.add("badge", "badge-outline-dimgrey", "h-[25px]", "m-auto", "mx-0", "w-max");
				badge.innerText = edgeLabel;
				preamble.value?.appendChild(badge);
			} else {
				addDash();
			}

			addDash();

			badge = document.createElement("div");
			badge.classList.add("badge", "bg-emerald-600", "h-[25px]", "m-auto", "mx-1");
			badge.innerText = nodeLabel;
			preamble.value?.appendChild(badge);
		}

		function createFirstBadge(text?: string) {
			if (!text) {
				return;
			}
			const badge = document.createElement("div");
			badge.classList.add("badge", "bg-emerald-600", "h-[25px]", "m-auto", "mx-1");
			badge.innerText = text;
			preamble.value?.appendChild(badge);
		}

		function addDash() {
			const dash = document.createElement("div");
			dash.classList.add("dash-line");
			preamble.value?.appendChild(dash);
		}

		function showNext() {
			clearDropdown();
			createItems();
		}

		// ============================================================`
		// Keyboard navigation
		// ============================================================`
		inputBox.addEventListener("keydown", function (e) {
			let x: any = document.getElementById(this.id + "autocomplete-list");
			if (x) {
				x = x.getElementsByTagName("div");
			}

			if (e.key === "ArrowDown") {
				highlightIndex++;
				makeActive(x);
				// if drop isn't visible, show it again
				if (!itemsAreVisible()) {
					showNext();
				}
			} else if (e.key == "ArrowUp") {
				highlightIndex--;
				makeActive(x);
			} else if (e.key == "Tab") {
				// TAB means selecting without execute
				e.preventDefault();
				if (highlightIndex > -1) {
					if (x) x[highlightIndex].click();
				}
				showNext();
			} else if (e.key == "Enter") {
				e.preventDefault();
				if (highlightIndex > -1) {
					if (x) {
						x[highlightIndex].click();
					}
				}
				emit("query", currentPath);
			} else if (e.key === "Backspace") {
				// if no text typed by the user we are at the start and the intention is to remove badges
				if (inputBox.value === "") {
					removeLastBadge();
				}
			} else if (e.key === "Escape") {
				clearDropdown();
				e.preventDefault();
			}
		});

		function makeActive(x) {
			if (!x) return false;
			removeActive(x);
			if (highlightIndex >= x.length) highlightIndex = 0;
			if (highlightIndex < 0) highlightIndex = x.length - 1;
			x[highlightIndex].classList.add("autocomplete-active");
		}

		function removeActive(x) {
			for (let i = 0; i < x.length; i++) {
				x[i].classList.remove("autocomplete-active");
			}
		}

		function clearDropdown(elmnt = null) {
			const x = document.getElementsByClassName("autocomplete-items");
			for (let i = 0; i < x.length; i++) {
				if (elmnt != x[i] && elmnt != inputBox) {
					x[i].parentNode?.removeChild(x[i]);
				}
			}
		}

		document.addEventListener("click", function (e) {
			clearDropdown(e.target);
		});

		// show initially what can be selected
		showNext();
	}

	onMounted(async () => {
		inputBox = input.value;
		initAutoComplete();
	});
	const emit = defineEmits(["query"]);
</script>

<style>
	.autocomplete {
		@apply relative m-5 flex w-fit bg-white-light dark:bg-primary-dark-light;
	}

	.input {
		@apply ml-2 border-0 bg-white-light p-3 text-base outline-none dark:bg-primary-dark-light;
	}

	.autocomplete-items {
		position: absolute;
		border: 1px solid #d4d4d4;
		border-bottom: none;
		border-top: none;
		z-index: 99;
		top: 100%;
		left: 0;
		right: 0;
	}

	.autocomplete-items div {
		padding: 10px;
		cursor: pointer;
		background-color: #fff;
		border-bottom: 1px solid #d4d4d4;
	}

	.autocomplete-items div:hover {
		background-color: #e9e9e9;
	}

	.autocomplete-active {
		background-color: DodgerBlue !important;
		color: #ffffff;
	}

	.dash-line {
		height: 25px;
		border-bottom: 2px solid dimgray;
		width: 10px;
	}
</style>
