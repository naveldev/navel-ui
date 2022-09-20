import { Container } from '../router'

export default [
	{
		path: '/docs',
		component: Container('Documentation/_Base'),
		children: [
			{
				path: '',
				name: 'docs',
				component: Container('Documentation/GettingStarted')
			},
			{
				path: 'installation',
				name: 'docs.installation',
				component: Container('Documentation/Installation')
			},
			{
				path: 'button',
				name: 'docs.components.button',
				component: Container('Components/Button')
			},
		]
	},

	{
		path: '/docs',
		component: Container('Documentation/_Base'),
		children: [
			{
				path: '',
				name: 'docs.vue',
				component: Container('VueComponents/GettingStarted')
			},
			{
				path: 'input',
				name: 'docs.vue.components.input',
				component: Container('VueComponents/Input')
			},
			{
				path: 'datepicker',
				name: 'docs.vue.components.datepicker',
				component: Container('VueComponents/DatePicker')
			},
		]
	}
]
