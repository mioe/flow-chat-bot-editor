import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/**
 * Styles
 */
import 'uno.css'
import '@profeat/ui-kit/style.css'
import './assets/styles/root.css'
import './style.css'

/**
 * UI
 */
import { ProfeatUI } from '@profeat/ui-kit'

/**
 * init app
 */
createApp(App)
	.use(router)
	.use(ProfeatUI)
	.mount('#app')
