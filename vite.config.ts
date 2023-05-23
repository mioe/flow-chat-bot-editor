import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import svgLoader from 'vite-svg-loader'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	console.log('🦕 vite.config.ts/defineConfig', command, mode)

	return {
		base: mode === 'development' ? './' : '/flow-chat-bot-editor/',

		resolve: {
			alias: {
				'~/': `${path.resolve(__dirname, 'src')}/`,
			},
		},

		plugins: [
			vue(),

			// https://github.com/unocss/unocss
			Unocss(),

			// https://github.com/hannoeru/vite-plugin-pages
			Pages(),

			svgLoader(),
		],
	}
})
