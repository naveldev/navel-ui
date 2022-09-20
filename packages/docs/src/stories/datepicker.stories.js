import { VDatePicker } from '@naviisml/vuejs-components'

export const template = {
	title: 'VDatePicker',
	component: VDatePicker,
	template: '<v-date-picker v-model="value" v-bind="args" />'
}

export const options = {
	placeholder: {
		label: 'Placeholder',
		type: 'String',
		default: 'Test'
	},
	minDate: {
		label: 'Date from',
		type: 'Date',
		default: null
	},
	maxDate: {
		label: 'Date untill',
		type: 'Date',
		default: null
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