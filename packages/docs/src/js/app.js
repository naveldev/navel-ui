import { createApp } from 'vue'

import { router } from './router.js'
import { components } from '@components'

import './utils'

import App from '@components/App.vue'

export const app = createApp(App)

app.use(router)

components.forEach(Component => {
	app.component(Component.name, Component)
})

app.mount('#app')
