import {defineConfig} from 'vite'
import svelte from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(
			{
				preprocess: preprocess(),
				dev: true,
				hot: true
			})
	],
	rollupDedupe: ['svelte'],
	// https://github.com/aws-amplify/amplify-js/issues/7499
	resolve: {
		alias: {
			'./runtimeConfig': './runtimeConfig.browser'
		},
		dedupe: ['svelte']
	},
	build: {
		rollupOptions: {
			output: {
				intro: 'if(exports === undefined){var exports ={}; var self = {}}'
			}
		}
	},
	optimizeDeps: {
		exclude: ['svelte-routing']
	},
	server: {
		port: 3000
	}
});
