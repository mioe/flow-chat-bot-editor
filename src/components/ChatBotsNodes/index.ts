import {
	defineNode,
	NodeInterface,
} from 'baklavajs'

const DEFAULT_NODE_WIDTH = 369

export const StartNode = defineNode({
	type: 'StartNode',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	outputs: {
		result: () => new NodeInterface('Result', 0),
	},
})

export const ActionNode = defineNode({
	type: 'ActionNode',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	outputs: {
		result: () => new NodeInterface('Result', 0),
	},
	inputs: {
		value: () => new NodeInterface('Value', ''),
	},
})

export const IdleNode = defineNode({
	type: 'IdleNode',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	inputs: {
		value: () => new NodeInterface('Value', ''),
	},
})

export const IfNode = defineNode({
	type: 'IfNode',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
})

export const MessageNode = defineNode({
	type: 'MessageNode',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
})

export const InputNode = defineNode({
	type: 'InputNode',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
})

export const RedirectNode = defineNode({
	type: 'RedirectNode',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
})

export const TemplateWabaNode = defineNode({
	type: 'TemplateWabaNode',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
})
