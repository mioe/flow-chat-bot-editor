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
	inputs: {
		input1: () => new NodeInterface('Да (input1)', 0),
		input2: () => new NodeInterface('Кабачок (input2)', 0),
		input3: () => new NodeInterface('Другой ответ (input3)', 0),
		input4: () => new NodeInterface('Нет ответа 3 часа (input4)', 0),
	},
})

export const ActionNode = defineNode({
	type: 'ActionNode',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	outputs: {
		output: () => new NodeInterface('Socket (output)', ''),
	},
})

export const IdleNode = defineNode({
	type: 'IdleNode',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	outputs: {
		output: () => new NodeInterface('Socket (output)', ''),
	},
	inputs: {
		input: () => new NodeInterface('Следующий шаг (input)', 0),
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
	outputs: {
		output: () => new NodeInterface('Socket (output)', ''),
	},
	inputs: {
		input: () => new NodeInterface('Следующий шаг (input)', 0),
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
	outputs: {
		output: () => new NodeInterface('Socket (output)', ''),
	},
	inputs: {
		input: () => new NodeInterface('Следующий шаг (input)', 0),
	},
})
