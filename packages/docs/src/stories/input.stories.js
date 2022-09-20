import { VInput } from '@naveldev/vuejs-components'

export const template = {
	title: 'VInput',
	component: VInput,
	template: '<v-input v-model="value" v-bind="args" />'
}

export const options = {
	placeholder: {
		label: 'Placeholder',
		type: 'String',
		default: 'Test'
	},
	prefix: {
		label: 'Prefix',
		type: 'String',
		default: false
	},
	suffix: {
		label: 'Suffix',
		type: 'String',
		default: false
	},
	error: {
		label: 'Error',
		type: 'Boolean',
		default: false
	},
	/*errorWith: {
		label: 'Error with message',
		type: 'String',
		default: 'Test'
	},*/
	loading: {
		type: 'Boolean',
		default: false
	},
	required: {
		type: 'Boolean',
		default: true
	},
	disabled: {
		type: 'Boolean',
		default: false
	}
}