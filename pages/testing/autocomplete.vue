<template>
	<div class="autocomplete m-5 flex">
		<div ref="preamble" class="flex min-h-[45px]"></div>
		<input id="myInput" ref="input" type="text" name="myCountry" placeholder="Search graph" />
	</div>
</template>
<script setup lang="ts">
	import { GraphDB } from "~/server/api/graph/graphDB";

	let dump: any;
	const input = ref(null);
	const preamble = ref(null);
	let inputBox: any;

	definePageMeta({
		layout: "plain",
	});

	function autocomplete() {
		let highlightIndex: number = -1;
		inputBox.addEventListener("input", function (e) {
			let a,
				b,
				i,
				val = this.value;
			clearDropdown();
			if (!val) {
				return false;
			}
			highlightIndex = -1;
			a = document.createElement("DIV");
			a.setAttribute("id", this.id + "autocomplete-list");
			a.setAttribute("class", "autocomplete-items");
			this.parentNode.appendChild(a);
			for (i = 0; i < autocompleteValues.length; i++) {
				if (autocompleteValues[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
					b = document.createElement("DIV");
					const name = autocompleteValues[i];
					b.innerHTML = `<span class="badge bg-primary">${name}</span>`;
					b.innerHTML += "<input type='hidden' value='" + autocompleteValues[i] + "'>";
					b.addEventListener("click", function (e) {
						appendBadge(name);
						inputBox.value = "";
						clearDropdown();
					});
					a.appendChild(b);
				}
			}
		});

		function clearBadges() {
			preamble.value?.replaceChildren();
		}

		function appendBadge(name) {
			const badge = document.createElement("div");
			badge.classList.add("badge", "bg-emerald-600", "h-[25px]", "m-auto", "mx-2");
			badge.innerText = name;
			preamble.value.appendChild(badge);
		}

		// ============================================================`
		// Keyboard navigation
		// ============================================================`
		inputBox.addEventListener("keydown", function (e) {
			let x: any = document.getElementById(this.id + "autocomplete-list");
			if (x) {
				x = x.getElementsByTagName("div");
			}
			console.log(e.key);
			if (e.key === "ArrowDown") {
				highlightIndex++;
				makeActive(x);
			} else if (e.key == "ArrowUp") {
				highlightIndex--;
				makeActive(x);
			} else if (e.key == "Enter") {
				e.preventDefault();
				if (highlightIndex > -1) {
					if (x) x[highlightIndex].click();
				}
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
	}
	const { data, pending, error, refresh } = await useFetch("/api/graph/nodes", {
		method: "GET",
	});
	let found = data.value?.map((u) => u.id);
	onMounted(async () => {
		inputBox = input.value;
		autocomplete();
	});
	const autocompleteValues = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"Andorra",
		"Angola",
		"Antigua & Barbuda",
		"Argentina",
		"Armenia",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bhutan",
		"Bolivia",
		"Bosnia & Herzegovina",
		"Botswana",
		"Brazil",
		"Brunei",
		"Bulgaria",
		"Burkina Faso",
		"Burundi",
		"Cambodia",
		"Cameroon",
		"Canada",
		"Cape Verde",
		"Central African Republic",
		"Chad",
		"Chile",
		"China",
		"Colombia",
		"Comoros",
		"Congo",
		"Congo Democratic Republic",
		"Costa Rica",
		"Cote D'Ivoire",
		"Croatia",
		"Cuba",
		"Cyprus",
		"Czech Republic",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic",
		"East Timor",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Eritrea",
		"Estonia",
		"Ethiopia",
		"Fiji",
		"Finland",
		"France",
		"Gabon",
		"Gambia",
		"Georgia",
		"Germany",
		"Ghana",
		"Greece",
		"Grenada",
		"Guatemala",
		"Guinea",
		"Guinea-Bissau",
		"Guyana",
		"Haiti",
		"Honduras",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kiribati",
		"Korea North",
		"Korea South",
		"Kosovo",
		"Kuwait",
		"Kyrgyzstan",
		"Laos",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Macedonia",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Marshall Islands",
		"Mauritania",
		"Mauritius",
		"Mexico",
		"Micronesia",
		"Moldova",
		"Monaco",
		"Mongolia",
		"Montenegro",
		"Morocco",
		"Mozambique",
		"Myanmar (Burma)",
		"Namibia",
		"Nauru",
		"Nepal",
		"New Zealand",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"Norway",
		"Oman",
		"Pakistan",
		"Palau",
		"Palestinian State*",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Poland",
		"Portugal",
		"Qatar",
		"Romania",
		"Russia",
		"Rwanda",
		"Samoa",
		"San Marino",
		"Sao Tome & Principe",
		"Saudi Arabia",
		"Senegal",
		"Serbia",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Slovakia",
		"Slovenia",
		"Solomon Islands",
		"Somalia",
		"South Africa",
		"South Sudan",
		"Spain",
		"Sri Lanka",
		"St. Kitts & Nevis",
		"St. Lucia",
		"St. Vincent & The Grenadines",
		"Sudan",
		"Suriname",
		"Swaziland",
		"Sweden",
		"Switzerland",
		"Syria",
		"Taiwan",
		"Tajikistan",
		"Tanzania",
		"Thailand",
		"The Netherlands",
		"The Philippines",
		"Togo",
		"Tonga",
		"Trinidad & Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Tuvalu",
		"Uganda",
		"Ukraine",
		"United Arab Emirates",
		"United Kingdom",
		"United States Of America",
		"Uruguay",
		"Uzbekistan",
		"Vanuatu",
		"Vatican City (Holy See)",
		"Venezuela",
		"Vietnam",
		"Yemen",
		"Zambia",
		"Zimbabwe",
	];
</script>
<style>
	.autocomplete {
		position: relative;

		width: 60%;
	}

	input {
		border: 1px solid transparent;
		background-color: #f1f1f1;
		padding: 10px;
		font-size: 16px;
	}

	input[type="text"] {
		background-color: #f1f1f1;
		width: 100%;
		outline: none;
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
</style>
