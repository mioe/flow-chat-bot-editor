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
	AcceptOutputInterface,
	CancelOutputInterface,
	TabsInterface,
	TimeInputInterface,
	DurationInterface,
	ChipsInterface,
	FromToInterface,
	CalendarInterface,
	SwitchInterface,
} from '~/components/ChatBots/ChatBotsInterfaces'
import { DelayType, defaultTime, defaultPeriod, gtmTimeZones, typeOptions } from '../ChatBotsInterfaces/helpers/delayHelpers'
import { conditionOptions, defaultWorkingDays, defaultTarget, subconditions, daysChips, matchers, fieldsMapper, RecordSubcondtions, AnswerSubcondtions, ConditionType, FieldsType } from '../ChatBotsInterfaces/helpers/conditionHelpers'
import { SelectInterface } from '~/components/ChatBots/ChatBotsInterfaces/SelectInterface/SelectInterface'

export enum Actions {
	operatorCall = 'Позвать оператора',
	stopBot = 'Остановить бота',
	editDB = 'Изменить в базе',
	addTag = 'Добавить тег',
	removeTag = 'Удалить тег',
}

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

export const IfNode = defineDynamicNode({
	type: 'IfNode',
	title: 'Условие',
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
	outputs: {
		[FieldsType.conditionType]: () => new SelectInterface({
			name: 'Тип условия',
			value: ConditionType.record,
			options: {
				options: conditionOptions,
			},
			position: 'top',
		}),
		[FieldsType.conditionTarget]: () => new SelectInterface({
			name: 'Цель условия',
			value: defaultTarget,
			options: {
				options: subconditions.record,
			},
			position: 'center',
		}),
		[FieldsType.timeZone]: () => new SelectInterface({
			name: 'Зона',
			value: gtmTimeZones[3].value,
			options: {
				options: gtmTimeZones,
			},
			position: 'center',
			hidden: true,
		}),
		[FieldsType.formatCheck]: () => new SelectInterface({
			name: 'Формат',
			value: subconditions.answer[0].value,
			options: {
				options: subconditions.answer,
			},
			position: 'center',
			hidden: true,
		}),
		[FieldsType.workingDays]: () => new ChipsInterface({
			name: 'Рабочие дни',
			value: defaultWorkingDays,
			chips: daysChips,
			position: 'bottom',
			hidden: true,
		}),
		[FieldsType.workingDaysTimeAccept]: () => new FromToInterface({
			name: 'Рабочие дни время (положительно)',
			value: '00:00-00:00',
			position: 'special',
			hidden: true,
		}),
		[FieldsType.workingDaysTimeCancel]: () => new FromToInterface({
			name: 'Рабочие дни время (отрицательно)',
			value: '00:00-00:00',
			position: 'special',
			hidden: true,
		}),
		[FieldsType.weekendDaysTimeAccept]: () => new FromToInterface({
			name: 'Выходные дни время (положительно)',
			value: '00:00-00:00',
			position: 'special',
			hidden: true,
			active: false,
		}),
		[FieldsType.weekendDaysTimeCancel]: () => new FromToInterface({
			name: 'Выходные дни время (отрицательно)',
			value: '00:00-00:00',
			position: 'special',
			hidden: true,
			active: false,
		}),
		[FieldsType.conditionMatcher]: () => new SelectInterface({
			name: 'Условие',
			value: '',
			options: {
				options: [],
				placeholder: 'Тип соответствия',
				disabled: true,
			},
			position: 'center',
		}),
		[FieldsType.numberMatcher]: () => new SelectInterface({
			name: 'Условия для числа',
			value: '',
			options: {
				options: matchers.number,
				placeholder: 'Тип соответствия',
			},
			position: 'center',
			hidden: true,
		}),
		[FieldsType.stringMatcher]: () => new SelectInterface({
			name: 'Условие для строки',
			value: '',
			options: {
				options: matchers.string,
				placeholder: 'Тип соответствия',
			},
			position: 'center',
			hidden: true,
		}),
		[FieldsType.dateMatcher]: () => new SelectInterface({
			name: 'Условие для даты',
			value: '',
			options: {
				options: matchers.date,
				placeholder: 'Тип соответствия',
			},
			position: 'center',
			hidden: true,
		}),
		[FieldsType.conditionValue]: () => new InputInterface({
			name: 'Значение условия',
			value: '',
			placeholder: 'Значение',
			icon: false,
			position: 'center',
			port: false,
		}),
		[FieldsType.numberValue]: () => new InputInterface({
			name: 'Число',
			value: '',
			placeholder: 'Введите число',
			icon: false,
			position: 'center',
			port: false,
			hidden: true,
		}),
		[FieldsType.stringValue]: () => new InputInterface({
			name: 'Строка',
			value: '',
			placeholder: 'Введите значение',
			icon: false,
			position: 'center',
			port: false,
			hidden: true,
		}),
		[FieldsType.dateValue]: () => new CalendarInterface({
			name: 'Дата',
			value: '',
			min: new Date().toISOString(),
			position: 'center',
			hidden: true,
		}),
		[FieldsType.accept]: () => new AcceptOutputInterface({ name: 'Соответствует', position: 'bottom' }),
		[FieldsType.cancel]: () => new CancelOutputInterface({ name: 'Не соответствует', position: 'bottom' }),
	},
	onUpdate(_, data) {
		let requiredFields: any = []

		if (data.conditionType === ConditionType.record) {
			if (data.conditionTarget === RecordSubcondtions.date) {
				requiredFields = fieldsMapper.recordAndDate
			} else {
				requiredFields = fieldsMapper.record
			}
		}

		if (data.conditionType === ConditionType.time) {
			requiredFields = fieldsMapper.time
		}

		if (data.conditionType === ConditionType.answer) {
			switch (data.formatCheck) {
			case AnswerSubcondtions.date:
				requiredFields = fieldsMapper.answerDate
				break
			case AnswerSubcondtions.number:
				requiredFields = fieldsMapper.answerNumber
				break
			case AnswerSubcondtions.string:
				requiredFields = fieldsMapper.answerString
				break
			default:
				requiredFields = fieldsMapper.answerEmail
			}
		}

		const fieldsToHide = Object.keys(this.outputs as any).filter(item => !requiredFields.includes(item))

		// @ts-ignore
		fieldsToHide.forEach(item => this.outputs[item].setHidden(true))
		// @ts-ignore
		requiredFields.forEach(item => this.outputs[item].setHidden(false))

		return {}
	},
})

export const IdleNode = defineDynamicNode({
	type: 'IdleNode',
	title: 'Задержка',
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
	outputs: {
		delayType: () => new TabsInterface({
			name: 'Тип задержки',
			value: DelayType.period,
			tabs: typeOptions,
			position: 'top',
		}),
	},
	onUpdate(_, data) {
		if (data.delayType === DelayType.period) {
			return {
				outputs: {
					duration: () => new DurationInterface({
						name: 'Длительность',
						value: defaultPeriod,
						position: 'center',
					}),
					output: () => new SimpleInterface({
						name: 'Следующий шаг',
						value: undefined,
						position: 'bottom',
					}),
				} as DynamicNodeDefinition,
			}
		} else {
			return {
				outputs: {
					time: () => new TimeInputInterface({
						name: 'По наступлению',
						value: defaultTime,
						position: 'center',
					}),
					timeZone: () => new SelectInterface({
						name: 'Зона',
						value: gtmTimeZones[3].value,
						options: {
							options: gtmTimeZones,
							placeholder: '+3 GTM',
						},
						position: 'center',
					}),
					output: () => new SimpleInterface({
						name: 'Следующий шаг',
						value: undefined,
						position: 'bottom',
					}),
				} as DynamicNodeDefinition,
			} 
		}
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

export { node as StartNode } from '~/components/ChatBots/ChatBotsNodes/StartNode'
