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
	IdleInterface,
	InputInterface,
	SimpleInterface,
	SwitchInterface,
	TabsInterface,
} from '~/components/ChatBots/ChatBotsInterfaces'
import { SelectInterface } from '~/components/ChatBots/ChatBotsInterfaces/SelectInterface/SelectInterface'

export enum Actions {
	operatorCall = 'Позвать оператора',
	stopBot = 'Остановить бота',
	editDB = 'Изменить в базе',
	addTag = 'Добавить тег',
	removeTag = 'Удалить тег',
}

export const StartNode = defineDynamicNode({
	type: 'StartNode',
	title: 'Старт',
	outputs: {
		tabs: () => new TabsInterface({
			name: 'tabs',
			value: 'first',
			tabs: [
				{
					title: 'Входящее сообщение',
					value: 'first',
				},
				{
					title: 'Исходящее (шаблон)',
					value: 'second',
				},
			],
			position: 'top',
		}),
	},
	onUpdate(_, { tabs }) {
		if (tabs === 'second') {
			return {
				outputs: {

				} as DynamicNodeDefinition,
			}
		}
		return {
			outputs: {
				output: () => new SimpleInterface({
					name: 'Следующий шаг',
					value: undefined,
					position: 'bottom',
				}),
			} as DynamicNodeDefinition,
		}
	},
})

export const ActionNode = defineDynamicNode<any, { select: Actions }>({
	type: 'ActionNode',
	title: 'Действие',
	onCreate() {
		// @ts-ignore
		this.currentAction = ''
	},
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
	outputs: {
		select: () => new SelectInterface({
			name: 'Селектор действия',
			value: '',
			position: 'top',
			options: {
				options: [
					{
						text: Actions.operatorCall,
						value: Actions.operatorCall,
					},
					{
						text: Actions.stopBot,
						value: Actions.stopBot,
					},
					{
						text: Actions.editDB,
						value: Actions.editDB,
					},
					{
						text: Actions.addTag,
						value: Actions.addTag,
					},
					{
						text: Actions.removeTag,
						value: Actions.removeTag,
					},
				],
				placeholder: 'Выберите действие',
				hideEmptyMenu: true,
			},
		}),
	},
	onUpdate(_, { select }) {
		const nextStepOutput = () => new SimpleInterface({
			name: 'Следующий шаг',
			value: undefined,
			position: 'bottom',
		})

		switch (select) {
		case Actions.removeTag: {
			return {
				outputs: {
					output: nextStepOutput,
					removeTagSelect: () => new SelectInterface({
						name: 'Селектор',
						value: '',
						position: 'center',
						options: {
							options: [
								{
									text: 'Тег 1',
									value: 'Тег 1',
								},
								{
									text: 'Тег 2',
									value: 'Тег 2',
								},
								{
									text: 'Тег 3',
									value: 'Тег 3',
								},
							],
							placeholder: 'Выберите или введите тег',
							allowCustomValue: true,
							hintEmptySearch: true,
						},
					}),
				} as DynamicNodeDefinition,
			}
		}
		case Actions.editDB:{
			return {
				outputs: {
					output: nextStepOutput,
					editDBSelect: () => new SelectInterface({
						name: 'Селектор',
						value: '',
						position: 'center',
						options: {
							options: [
								{
									text: 'Существующая колонка строка',
									value: 'Существующая колонка строка',
								},
								{
									text: 'Существующая колонка 2',
									value: 'Существующая колонка 2',
								},
							],
							placeholder: 'Колонка для записи',
						},
					}),
				} as DynamicNodeDefinition,
			}
		}
		case Actions.addTag:{
			return {
				outputs: {
					output: nextStepOutput,
					addTagSelect: () => new SelectInterface({
						name: 'Селектор',
						value: '',
						position: 'center',
						options: {
							options: [
								{
									text: 'Тег 1',
									value: 'Тег 1',
								},
								{
									text: 'Тег 2',
									value: 'Тег 2',
								},
								{
									text: 'Тег 3',
									value: 'Тег 3',
								},
							],
							placeholder: 'Выберите или введите тег',
							allowCustomValue: true,
							addEmptySearch: true,
						},
					}),
				} as DynamicNodeDefinition,
			}
		}
		default:{
			return {}
		}
		}
	},
})

export const IdleNode = defineNode({
	type: 'IdleNode',
	title: 'Задержка',
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
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
})

export const MessageNode = defineDynamicNode({
	type: 'MessageNode',
	title: 'Сообщение',
	onCreate() {
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
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
})

export const RedirectNode = defineNode({
	type: 'RedirectNode',
	title: 'Другой бот',
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
})

export const TemplateWabaNode = defineNode({
	type: 'TemplateWabaNode',
	title: 'Шаблон WABA',
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
	outputs: {
		output: () => new NodeInterface('Следующий шаг (output)', 0),
	},
})
