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
	AcceptOutputInterface,
	CancelOutputInterface,
	TabInterface,
	TimeInputInterface,
	DurationInterface,
	SelectInputInterface,
	ChipsInterface,
	FromToInterface,
	CalendarInterface,
} from '~/components/ChatBots/ChatBotsInterfaces'
// import { gtmTimeZones } from '../DelayInterface/helpers'
import { DelayType, defaultTime, defaultPeriod, gtmTimeZones } from '../ChatBotsInterfaces/helpers/delayHelpers'
import { conditionOptions, defaultWorkingDays, defaultTarget, subconditions, daysChips, matchers, fieldsMapper, RecordSubcondtions, AnswerSubcondtions, ConditionType } from '../ChatBotsInterfaces/helpers/conditionHelpers'

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

export const IfNode = defineDynamicNode({
	type: 'IfNode',
	title: 'Условие',
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
	outputs: {
		conditionType: () => new SelectInputInterface({
			name: 'Тип условия',
			value: ConditionType.record,
			options: conditionOptions,
			position: 'top',
		}),
		conditionTarget: () => new SelectInputInterface({
			name: 'Цель условия',
			value: defaultTarget,
			options: subconditions.record,
			position: 'center',
		}),
		timeZone: () => new SelectInputInterface({
			name: 'Зона',
			value: gtmTimeZones[3].value,
			options: gtmTimeZones,
			position: 'center',
			hidden: true,
		}),
		formatCheck: () => new SelectInputInterface({
			name: 'Формат',
			value: subconditions.answer[0].value,
			options: subconditions.answer,
			position: 'center',
			hidden: true,
		}),
		workingDays: () => new ChipsInterface({
			name: 'Рабочие дни',
			value: defaultWorkingDays,
			chips: daysChips,
			position: 'bottom',
			hidden: true,
		}),
		workingDaysTimeAccept: () => new FromToInterface({
			name: 'Рабочие дни время (положительно)',
			value: '00:00-00:00',
			position: 'special',
			hidden: true,
		}),
		workingDaysTimeCancel: () => new FromToInterface({
			name: 'Рабочие дни время (отрицательно)',
			value: '00:00-00:00',
			position: 'special',
			hidden: true,
		}),
		weekendDaysTimeAccept: () => new FromToInterface({
			name: 'Выходные дни время (положительно)',
			value: '00:00-00:00',
			position: 'special',
			hidden: true,
			active: false,
		}),
		weekendDaysTimeCancel: () => new FromToInterface({
			name: 'Выходные дни время (отрицательно)',
			value: '00:00-00:00',
			position: 'special',
			hidden: true,
			active: false,
		}),
		conditionMatcher: () => new SelectInputInterface({
			name: 'Условие',
			value: '',
			options: [],
			placeholder: 'Тип соответствия',
			disabled: true,
			position: 'center',
		}),
		numberMatcher: () => new SelectInputInterface({
			name: 'Условия для числа',
			value: '',
			options: matchers.number,
			placeholder: 'Тип соответствия',
			position: 'center',
			hidden: true,
		}),
		stringMatcher: () => new SelectInputInterface({
			name: 'Условие для строки',
			value: '',
			options: matchers.string,
			placeholder: 'Тип соответствия',
			position: 'center',
			hidden: true,
		}),
		dateMatcher: () => new SelectInputInterface({
			name: 'Условие для даты',
			value: '',
			options: matchers.date,
			placeholder: 'Тип соответствия',
			position: 'center',
			hidden: true,
		}),
		conditionValue: () => new InputInterface({
			name: 'Значение условия',
			value: '',
			placeholder: 'Значение',
			icon: false,
			position: 'center',
			port: false,
		}),
		numberValue: () => new InputInterface({
			name: 'Число',
			value: '',
			placeholder: 'Введите число',
			icon: false,
			position: 'center',
			port: false,
			hidden: true,
		}),
		stringValue: () => new InputInterface({
			name: 'Строка',
			value: '',
			placeholder: 'Введите значение',
			icon: false,
			position: 'center',
			port: false,
			hidden: true,
		}),
		dateValue: () => new CalendarInterface({
			name: 'Дата',
			value: '',
			min: new Date().toISOString(),
			position: 'center',
			hidden: true,
		}),
		accept: () => new AcceptOutputInterface({ name: 'Соответствует', position: 'bottom' }),
		cancel: () => new CancelOutputInterface({ name: 'Не соответствует', position: 'bottom' }),
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

		// const allConnectionsFromNode = this.graphInstance.connections
		// console.log(allConnectionsFromNode)
		// console.log(this.graphInstance.removeConnection())
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
	onCreate() {
		// @ts-ignore
		this.width = DEFAULT_NODE_WIDTH
	},
	inputs: {
		input: () => new NodeInterface('socket', []).use(allowMultipleConnections),
	},
	outputs: {
		delayType: () => new TabInterface({
			name: 'Тип задержки',
			value: DelayType.period,
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
					timeZone: () => new SelectInputInterface({
						name: 'Зона',
						value: gtmTimeZones[3].value,
						options: gtmTimeZones,
						placeholder: '+3 GTM',
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
	calculate: undefined,
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
