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
		path: '/docs/components/nav-top',
		name: 'docs.components.nav-top',
		component: Container('Components/NavTop')
	},
	{
		path: '/docs/components/button',
		name: 'docs.components.button',
		component: Container('Components/Button')
	},

	// Vue Components...
	{
		path: '/docs/vue/getting-started',
		name: 'docs.vue',
		component: Container('Stories/GettingStarted')
	},
	{
		path: '/docs/vue/input',
		name: 'docs.vue.input',
		component: Container('Stories/Input')
	},
	{
		path: '/docs/vue/datepicker',
		name: 'docs.vue.datepicker',
		component: Container('Stories/DatePicker')
	},
	
	// Plugins...
	{
		path: '/docs/plugins/snackbar',
		name: 'docs.plugins.snackbar',
		component: Container('Plugins/Snackbar')
	},
]
