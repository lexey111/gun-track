import {defineConfig} from 'vite'
import svelte from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(
			{
				preprocess: preprocess(),
				hot: true
			}),
	],
	rollupDedupe: ['svelte'],
	// https://github.com/aws-amplify/amplify-js/issues/7499
	resolve: {
		alias: {
			'./runtimeConfig': './runtimeConfig.browser',
			'/@': path.resolve(__dirname, './src')
		},
		dedupe: ['svelte']
	},
	build: {
		rollupOptions: {
			output: {
				format: 'es',
				intro: 'if(exports === undefined){var exports ={}; var self = {}}',
				// manualChunks: {
				// 	'aws-amplify': ['aws-amplify'],
				// 	'dayjs': ['dayjs'],
				// 	'svelte': ['svelte'],
				// }
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
