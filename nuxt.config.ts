// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@pinia/nuxt',
		// '@primevue/nuxt-module',
	],
	pinia: {
		storesDirs: ['./stores/**'],
	},
});
