import { VInput } from '@naveldev/vue-components'

export const template = {
	title: 'VInput',
	component: VInput,
	template: '<v-input v-model="value" v-bind="args" />'
}

export const options = {
	placeholder: {
		label: 'Placeholder',
		type: 'String',
		default: 'Placeholder'
	},
	prefix: {
		label: 'Prefix',
		type: 'String',
		default: ''
	},
	suffix: {
		label: 'Suffix',
		type: 'String',
		default: ''
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
