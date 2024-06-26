// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxt/test-utils/module',
		'@pinia/nuxt',
		// '@primevue/nuxt-module',
	],
	pinia: {
		storesDirs: ['./stores/**'],
	},
	// primevue: {
	// 	theme: 'saga-blue', // Выберите тему по вашему вкусу
	// 	ripple: true,
	// 	components: ['InputText', 'Password', 'Button', 'Form', 'FormItem'],
	// 	directives: ['Tooltip', 'Ripple'],
	// },
});
