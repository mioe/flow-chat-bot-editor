import {
	defineNode,
	NodeInterface,
	TextInterface,
} from 'baklavajs'

export const DisplayNode = defineNode({
	type: 'DisplayNode',
	title: 'Display',
	inputs: {
		value: () => new NodeInterface('Value', ''),
	},
	outputs: {
		display: () => new TextInterface('Display', ''),
	},
})
