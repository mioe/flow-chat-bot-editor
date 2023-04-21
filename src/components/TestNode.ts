import {
	defineNode,
} from 'baklavajs'

export const TestNode = defineNode({
	type: 'TestNode',
	title: 'Тестовый блок',
	inputs: {},
	outputs: {},
	onCreate() {
		this.width = 369
	},
})
