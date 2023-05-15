import {
	defineNode,
	NodeInterface,
	defineDynamicNode,
	DynamicNodeDefinition,
} from 'baklavajs'
import { allowMultipleConnections } from '@baklavajs/engine'
import { ButtonInterface, SwitchInterface } from '~/components/ChatBots/ChatBotsInterfaces'

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
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
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
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
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
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
})

export const MessageNode = defineDynamicNode({
	type: 'MessageNode',
	title: 'Сообщение',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
		// @ts-ignore
		this.counter = 0
	},
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
	outputs: {
		enabled: () => new SwitchInterface({
			name: 'Кнопки-ответы',
			value: false,
		}),
	},
	onUpdate(_, { enabled }) {
		// @ts-ignore
		console.log('🦕 onUpdate', enabled)
		if (!enabled) {
			return {
				outputs: {
					output: () => new NodeInterface('Следующий шаг', undefined),
				} as DynamicNodeDefinition,
			}
		}
		return {
			outputs: {
				add: () => new ButtonInterface({
					name: 'Добавить исход',
					callback: () => {
						// @ts-ignore
						const name = 'Output ' + ++this.counter
						// @ts-ignore
						this.addOutput(name, new NodeInterface<any>(name, undefined))
					},
					icon: 'IconAddMd',
				}),
				remove: () => new ButtonInterface({
					name: 'Удалить исход',
					callback: () => {
						// @ts-ignore
						this.removeOutput('Output ' + this.counter--)
					}
				}),

				anotherAnswer: () => new NodeInterface('Другой ответ', undefined),
				idle: () => new NodeInterface('Нет ответа X минут', null),
			} as DynamicNodeDefinition,
		}
	},
	calculate: undefined,
})

export const InputNode = defineNode({
	type: 'InputNode',
	title: 'Вложение',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
})

export const RedirectNode = defineNode({
	type: 'RedirectNode',
	title: 'Другой бот',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
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
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
	outputs: {
		output: () => new NodeInterface('Следующий шаг (output)', 0),
	},
})
