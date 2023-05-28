import { gtmTimeZones } from './delayHelpers'

export const defaultWorkingDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт']

export const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export enum ConditionType {
    record = 'record',
    time = 'time',
    answer = 'answer'
}

export const conditionOptions = [
	{
		value: ConditionType.record,
		text: 'Значение в базе',
	},
	{
		value: ConditionType.time,
		text: 'Рабочее время',
	},
	{
		value: ConditionType.answer,
		text: 'Ответ пользователя',
	},
]

export enum RecordSubcondtions {
    column = 'column',
    date = 'date'
}

export enum AnswerSubcondtions {
    email = 'email',
    phone = 'phone',
    date = 'date',
    number = 'number',
    string = 'string'
}

export const defaultTarget = RecordSubcondtions.column

export const matchers = {
	[AnswerSubcondtions.number]: [
		{
			value: '=',
			text: '=',
		},
		{
			value: '>',
			text: '>',
		},
		{
			value: '<',
			text: '<',
		},
	],
	[AnswerSubcondtions.string]: [
		{
			value: '{}',
			text: '{ } (Содержит)',
		},
		{
			value: '=',
			text: '= (Точное соответствие)',
		},
	],
	[AnswerSubcondtions.date]: [
		{
			value: '=',
			text: '= (Соответствует)',
		},
		{
			value: '<',
			text: '< (До)',
		},
		{
			value: '>',
			text: '> (После)',
		},
	],
}

export const subconditions = {
	[ConditionType.record]: [
		{
			value: RecordSubcondtions.column,
			text: 'Колонка',
		},
		{
			value: RecordSubcondtions.date,
			text: 'Дата рождения',
		},
	],
	[ConditionType.time]: gtmTimeZones,
	[ConditionType.answer]: [
		{
			value: AnswerSubcondtions.email,
			text: 'Электронная почта',
		},
		{
			value: AnswerSubcondtions.phone,
			text: 'Номер телефона',
		},
		{
			value: AnswerSubcondtions.date,
			text: 'Дата',
		},
		{
			value: AnswerSubcondtions.number,
			text: 'Число',
		},
		{
			value: AnswerSubcondtions.string,
			text: 'Строка',
		},
	],
}

export const daysChips = days.map(item => ({
	text: item,
	value: item,
}))

enum FieldsType {
    conditionType = 'conditionType',
    conditionTarget = 'conditionTarget',

    conditionMatcher = 'conditionMatcher',
    dateMatcher = 'dateMatcher',
    numberMatcher = 'numberMatcher',
    stringMatcher = 'stringMatcher',

    conditionValue = 'conditionValue',
    numberValue = 'numberValue',
    stringValue = 'stringValue',
    dateValue = 'dateValue',

    timeZone = 'timeZone',

    workingDays = 'workingDays',
    workingDaysTimeAccept = 'workingDaysTimeAccept',
    workingDaysTimeCancel = 'workingDaysTimeCancel',
    weekendDaysTimeAccept ='weekendDaysTimeAccept', 
    weekendDaysTimeCancel = 'weekendDaysTimeCancel',

    formatCheck = 'formatCheck',

    accept = 'accept',
    cancel = 'cancel',
}

export const fieldsMapper = {
	record: [FieldsType.conditionType, FieldsType.conditionTarget, FieldsType.conditionMatcher, FieldsType.conditionValue, FieldsType.accept, FieldsType.cancel],
	recordAndDate: [FieldsType.conditionType, FieldsType.conditionTarget, FieldsType.dateMatcher, FieldsType.conditionValue, FieldsType.accept, FieldsType.cancel],
	time: ['conditionType', 'timeZone', 'workingDays', 'workingDaysTimeAccept', 'workingDaysTimeCancel', 'weekendDaysTimeAccept', 'weekendDaysTimeCancel'],
	answerEmail: ['conditionType', 'formatCheck', 'accept', 'cancel'],
	answerNumber: ['conditionType', 'formatCheck', 'numberMatcher', 'numberValue', 'accept', 'cancel'],
	answerString: ['conditionType', 'formatCheck', 'stringMatcher', 'stringValue', 'accept', 'cancel'],
	answerDate: ['conditionType', 'formatCheck', 'dateMatcher', 'dateValue', 'accept', 'cancel'],
}