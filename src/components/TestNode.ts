import {
	defineNode,
} from 'baklavajs'

export const TestNode = defineNode({
	type: 'TestNode',
	title: 'Тестовый блок',
	inputs: {},
	outputs: {},
	onCreate() {
		// @ts-ignore
		this.width = 369
	},
})
