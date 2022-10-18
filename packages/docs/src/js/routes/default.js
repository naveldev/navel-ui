import { Container } from '../router'

export default [
	{
		path: '/',
		name: 'home',
		component: Container('Home')
	},

	{
		path: '/unauthorized',
		name: '401',
		component: Container('Errors/401')
	},

	{
		path: '/:slug',
		name: '404',
		component: Container('Errors/404')
	},
]
