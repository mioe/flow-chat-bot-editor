export const isNumber = (ev: KeyboardEvent) => {
	const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
	const keyPressed: string = ev.key

	if (!keysAllowed.includes(keyPressed)) {
		ev.preventDefault()
	}
}

export const getHoursAndMinutes = (min: number | null) => {
	if (!min) return { h: 0, m: 0 }

	const h = Math.floor(min / 60)
	const m = h > 0
		? min % (h * 60)
		: min

	return { h, m }
}

export const gtmTimeZones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => ({
	value: item,
	text: `+ ${item} GTM`,
}))

export enum DelayType {
    period = 'period',
    time = 'time'
}

export const delayType = {
	period: { value: DelayType.period, title: 'Период' },
	time: { value: DelayType.time, title: 'Время' },
}

export const typeOptions = [
	{
		value: delayType.period.value,
		title: 'Период',
	},
	{
		value: delayType.time.value,
		title: 'Время',
	},
]

export const defaultPeriod = 15 // minutes

export const defaultTime = '00:00'


