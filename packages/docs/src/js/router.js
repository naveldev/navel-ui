import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

// the routes
const routes = resolveRoutes(
	require.context('./routes', false, /.*\.js$/)
)

// the router instance
export const router = createRouterInstance()

/**
 * Import a page from a containers
 *
 * @param   {string}  path
 *
 * @return  {object}
 */
export function Container (path) {
	return () => import(`@containers/${path}.vue`).then(m => m.default || m)
}

/**
 * Create a new router instance
 *
 * @param   {Object}  config
 *
 * @return  {Router}
 */
function createRouterInstance() {
	let instance

	instance = createRouter({
		history: createWebHistory(),
		routes
	})

	instance.beforeEach(beforeEach)
	instance.afterEach(afterEach)

	return instance
}

/**
 * The beforeEach function for each route
 *
 * @param   {Object}  to
 * @param   {Object}  from
 * @param   {void}  next
 *
 * @return  {void}
 */
 async function beforeEach (to, from, next) {
	let components = []

	try {
		// Get the matched components and resolve them.
		components = await resolveComponents(
			to.matched
		)
	} catch (error) {
		if (/^Loading( CSS)? chunk (\d)+ failed\./.test(error.message)) {
			window.location.reload(true)
			return
		}
	}

	if (components.length === 0) {
		return next()
	}

	let base = to.matched[0].components.default || false
	let layout = false

	if (typeof base === 'function')
		base = await base()
	if (typeof base === 'object')
		layout = base.layout

	window.App.setLayout(layout || '')

	await next()
}

/**
 * Async data
 *
 * @param   {object}  components
 *
 * @return  {void}
 */
async function asyncData (components) {
    for (let i = 0; i < components.length; i++) {
        const component = components[i]

        if (!component.asyncData) {
            continue
        }

        const dataFn = component.data

        try {
            const asyncData = await component.asyncData()

            component.data = function () {
                return {
                    ...(dataFn ? dataFn.apply(this) : {}),
                    ...asyncData
                }
            }
        } catch (e) {
            component.layout = 'error'

            console.error('Failed to load asyncData', e)
        }
    }
}

/**
 * The afterEach function for each route
 *
 * @param   {Object}  to
 * @param   {Object}  from
 *
 * @return  {void}
 */
async function afterEach (to, from) {
    await nextTick(() => {})
}

/**
 * Resolve async components.
 *
 * @param  {Array} components
 * @return {Array}
 */
function resolveComponents (components) {
	let component

	return Promise.all(components.map(c => {
		component = c.components.default
		return typeof component === 'function' ? component() : component
	}))
}

/**
 * Resolve the route files
 *
 * @param   {Object}  files
 *
 * @return  {Array}
 */
function resolveRoutes(requireContext) {
	let routelist = []

	requireContext.keys().map(file =>
		[file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
	)
	.reduce((routes, [name, route]) => (
		routelist.push(...route.default)
	), {})

	return routelist
}
