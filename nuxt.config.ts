// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

export default defineNuxtConfig({
	app: {
		head: {
			title: "Graph Visualizer",
			titleTemplate: "%s | Graphalizer",
			htmlAttrs: {
				lang: "en",
			},
			meta: [
				{ charset: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no",
				},
				{
					hid: "description",
					name: "description",
					content: "Graph visualization template",
				},
				{ name: "format-detection", content: "telephone=no" },
			],
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/orbifold.svg" },
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap",
				},
			],
		},
	},
	devtools: { enabled: true },
	css: ["~/assets/css/app.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@nuxt/content"],
	ssr: true,
	i18n: {
		locales: [
			{ code: "de", file: "de.json" },
			{ code: "en", file: "en.json" },
		],
		lazy: true,
		defaultLocale: "en",
		strategy: "no_prefix",
		langDir: "locales/",
	},
	vite: {
		// optimizeDeps: { include: ['quill'] },
	},
	router: {
		options: { linkExactActiveClass: "active" },
	},
	nitro: {
		output: {
			dir: path.join(__dirname, "dist"),
		},
	},
	content: {
		// https://content.nuxtjs.org/api/configuration
		highlight: {
			theme: {
				// Default theme (same as single string)
				default: "material-theme-palenight",
				// Theme used if `html.dark`
				dark: "github-dark",
			},
		},
		markdown: {
			toc: {
				depth: 5,
				searchDepth: 5,
			},
		},
	},
	tailwindcss: {
		cssPath: "~/assets/css/documentation.css",
	},
});
