import {
	defineNode,
	NodeInterface,
} from 'baklavajs'

const DEFAULT_NODE_WIDTH = 369

export const StartNode = defineNode({
	type: 'StartNode',
	title: 'Старт',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	outputs: {
		output1: () => new NodeInterface('Да (output1)', 0),
		output2: () => new NodeInterface('Кабачок (output2)', 0),
		output3: () => new NodeInterface('Другой ответ (output3)', 0),
		output4: () => new NodeInterface('Нет ответа 3 часа (output4)', 0),
	},
})

export const ActionNode = defineNode({
	type: 'ActionNode',
	title: 'Действие',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	inputs: {
		input: () => new NodeInterface('Socket (input)', ''),
	},
})

export const IdleNode = defineNode({
	type: 'IdleNode',
	title: 'Задержка',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	inputs: {
		input: () => new NodeInterface('Socket (input)', ''),
	},
	outputs: {
		output: () => new NodeInterface('Следующий шаг (output)', 0),
	},
})

export const IfNode = defineNode({
	type: 'IfNode',
	title: 'Условие',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
})

export const MessageNode = defineNode({
	type: 'MessageNode',
	title: 'Сообщение',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	inputs: {
		input: () => new NodeInterface('Socket (input)', ''),
	},
	outputs: {
		output: () => new NodeInterface('Следующий шаг (output)', 0),
	},
})

export const InputNode = defineNode({
	type: 'InputNode',
	title: 'Вложение',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
})

export const RedirectNode = defineNode({
	type: 'RedirectNode',
	title: 'Другой бот',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
})

export const TemplateWabaNode = defineNode({
	type: 'TemplateWabaNode',
	title: 'Шаблон WABA',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	inputs: {
		input: () => new NodeInterface('Socket (input)', ''),
	},
	outputs: {
		output: () => new NodeInterface('Следующий шаг (output)', 0),
	},
})
