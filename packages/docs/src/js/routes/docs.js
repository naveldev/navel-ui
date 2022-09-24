import { Container } from '../router'

export default [
	// Documentation
	{
		path: '/docs/getting-started',
		name: 'docs',
		component: Container('Documentation/GettingStarted')
	},
	{
		path: '/docs/installation',
		name: 'docs.installation',
		component: Container('Documentation/Installation')
	},
	{
		path: '/docs/button',
		name: 'docs.components.button',
		component: Container('Documentation/Components/Button')
	},

	// Vue Components...
	{
		path: '/docs/input',
		name: 'docs.vue',
		component: Container('Documentation/VueComponents/GettingStarted')
	},
	{
		path: '/docs/input',
		name: 'docs.vue.components.input',
		component: Container('Documentation/VueComponents/Input')
	},
	{
		path: '/docs/datepicker',
		name: 'docs.vue.components.datepicker',
		component: Container('Documentation/VueComponents/DatePicker')
	},
]
