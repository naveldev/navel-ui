import { VDatePicker } from '@naviisml/vuejs-components'

export const template = {
	title: 'Button',
	component: '<button></button>',
	template: '<button v-bind="args"></button>'
}

export const options = {
	"v-html": {
		type: 'String',
		default: false
	}
}