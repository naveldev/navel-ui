import { Container } from '../router'

export default [
	// Documentation...
	{
		path: '/docs/getting-started',
		name: 'docs',
		component: Container('GettingStarted')
	},
	{
		path: '/docs/installation',
		name: 'docs.installation',
		component: Container('Installation')
	},
	
	// Components...
	{
		path: '/docs/components/button',
		name: 'docs.components.button',
		component: Container('Components/Button')
	},

	// Vue Components...
	{
		path: '/docs/vuejs/getting-started',
		name: 'docs.vue',
		component: Container('Stories/GettingStarted')
	},
	{
		path: '/docs/vuejs/input',
		name: 'docs.vue.components.input',
		component: Container('Stories/Input')
	},
	{
		path: '/docs/vuejs/datepicker',
		name: 'docs.vue.components.datepicker',
		component: Container('Stories/DatePicker')
	},
	
	// Plugins...
	{
		path: '/docs/plugins/snackbar',
		name: 'docs.vue.components.snackbar',
		component: Container('Plugins/Snackbar')
	},
]
