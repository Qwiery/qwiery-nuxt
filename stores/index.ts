import { defineStore } from "pinia";
import appSetting from "@/app-setting";

export const useAppStore = defineStore("app", {
	state: () => ({
		isDarkMode: false,
		user: {
			name: "Francois Vanderseypen",
			nickname: "Swa",
			email: "info@orbifold.net",
		},
		mainLayout: "app",
		theme: "light",
		menu: "collapsible-vertical",
		layout: "full",
		rtlClass: "ltr",
		animation: "",
		navbar: "navbar-sticky",
		locale: "en",
		sidebar: false,
		languageList: [
			{ code: "en", name: "English" },
			{ code: "de", name: "German" },
		],
		isShowMainLoader: true,
		semidark: false,
		graphlib: "cytoscape",
		showAppSettings: false,
	}),

	actions: {
		setMainLayout(payload: any = null) {
			this.mainLayout = payload; //app , auth
		},
		toggleTheme(payload: any = null) {
			payload = payload || this.theme; // light|dark|system
			localStorage.setItem("theme", payload);
			this.theme = payload;
			if (payload == "light") {
				this.isDarkMode = false;
			} else if (payload == "dark") {
				this.isDarkMode = true;
			} else if (payload == "system") {
				if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
					this.isDarkMode = true;
				} else {
					this.isDarkMode = false;
				}
			}

			if (this.isDarkMode) {
				document.querySelector("body")?.classList.add("dark");
			} else {
				document.querySelector("body")?.classList.remove("dark");
			}
		},
		changeGraphlib(name = "cytoscape") {
			this.graphlib = name;
			localStorage.setItem("graphlib", name);
		},

		toggleRTL(payload: any = null) {
			payload = payload || this.rtlClass; // rtl, ltr
			localStorage.setItem("rtlClass", payload);
			this.rtlClass = payload;
			document.querySelector("html")?.setAttribute("dir", this.rtlClass || "ltr");
		},
		toggleAnimation(payload: any = null) {
			payload = payload || this.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
			payload = payload?.trim();
			localStorage.setItem("animation", payload);
			this.animation = payload;
			appSetting.changeAnimation();
		},

		toggleSemidark(payload: any = null) {
			payload = payload || false;
			localStorage.setItem("semidark", payload);
			this.semidark = payload;
		},
		toggleLocale(payload: any = null, setLocale: any) {
			payload = payload || this.locale;
			localStorage.setItem("i18n_locale", payload);
			this.locale = payload;
			setLocale(payload);
			if (this.locale?.toLowerCase() === "ae") {
				this.toggleRTL("rtl");
			} else {
				this.toggleRTL("ltr");
			}
		},
		toggleSidebar(state: boolean = false) {
			this.sidebar = !this.sidebar;
		},
		toggleMainLoader(state: boolean = false) {
			this.isShowMainLoader = true;
			setTimeout(() => {
				this.isShowMainLoader = false;
			}, 500);
		},
		toggleAppSettings(state: boolean = false) {
			this.showAppSettings = !this.showAppSettings;
		},
	},
	getters: {},
});
