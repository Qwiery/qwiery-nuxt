// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

export default defineNuxtConfig({
	app: {
		head: {
			title: "Qwiery",
			titleTemplate: "%s",
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
					content: "Qwiery is an open source toolbox to create graph-driven apps",
				},
				{ name: "format-detection", content: "telephone=no" },
			],
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/images/orbifold.svg" },
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap",
				},
			],
		},
	},
	devtools: { enabled: false },
	css: ["~/assets/css/app.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
	ssr: false,
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
		experimental: {
			openAPI: true, // http://localhost:3000/_nitro/swagger
		},
	},
	tailwindcss: {
		// goto http://localhost:3000/_tailwind/
		cssPath: "~/assets/css/documentation.css",
	},
	components: [
		{
			path: "~/components",
			pathPrefix: true,
		},
	],
	runtimeConfig: {
		public: {
			// public means that the value is available on the client and server, see https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables
			YFILES_LICENSE: "",
		},
	},
});
