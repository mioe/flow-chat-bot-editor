import {
	defineNode,
	NodeInterface,
	defineDynamicNode,
	DynamicNodeDefinition,
} from 'baklavajs'
import { v4 as uuidv4 } from 'uuid'
import { allowMultipleConnections } from '@baklavajs/engine'
import {
	ButtonInterface,
	EditorInterface,
	SwitchInterface,
	InputInterface,
	IdleInterface,
	SimpleInterface,
} from '~/components/ChatBots/ChatBotsInterfaces'

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
		this.fields = []
	},
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
	outputs: {
		text: () => new EditorInterface({
			name: 'Текст',
			placeholder: 'Введите текст, или оставьте поле пустым если хотите отправить только кнопки',
			value: '',
			position: 'top',
		}),
		enabled: () => new SwitchInterface({
			name: 'Кнопки-ответы',
			value: false,
			position: 'top',
		}),
	},
	onUpdate(_, { enabled }) {
		if (!enabled) {
			// @ts-ignore
			this.fields = []
			return {
				outputs: {
					output: () => new SimpleInterface({
						name: 'Следующий шаг',
						value: undefined,
						position: 'bottom',
					}),
				} as DynamicNodeDefinition,
			}
		}
		const savedOutputs = {}
		// @ts-ignore
		this.fields.forEach((field: any) => {
			// @ts-ignore
			savedOutputs[field.uuid] = field.node
		})
		return {
			outputs: {
				...savedOutputs,

				add: () => new ButtonInterface({
					name: 'Добавить исход',
					callback: () => {
						const currentFieldId = uuidv4()
						const currentField = {
							uuid: currentFieldId,
							node: new InputInterface({
								name: 'text',
								placeholder: 'Введите вариант ответа',
								value: '',
								callback: () => {
									// @ts-ignore
									this.removeOutput(currentFieldId)
								},
							}),
						}
						// @ts-ignore
						this.fields.push(currentField)
						// @ts-ignore
						this.addOutput(
							currentField.uuid,
							currentField.node,
						)
					},
					icon: 'IconAddMd',
					position: 'center',
				}),

				anotherAnswer: () => new SimpleInterface({
					name: 'Другой ответ',
					value: undefined,
					position: 'bottom',
				}),
				idle: () => new IdleInterface({
					value: null,
					position: 'bottom',
				}),
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
