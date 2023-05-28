import { defineDynamicNode } from '@baklavajs/core'
import type { DynamicNodeDefinition } from '@baklavajs/core'

import {
	SimpleInterface,
	TabsInterface,
} from '~/components/ChatBots/ChatBotsInterfaces'

const TABS = [
	{
		title: 'Входящее сообщение',
		value: 'first',
	},
	{
		title: 'Исходящее (шаблон)',
		value: 'second',
	},
]

const node = defineDynamicNode<any, any>({
	type: 'StartNode',
	title: 'Старт',
	outputs: {
		tabs: () => new TabsInterface({
			name: 'tabs',
			value: 'first',
			tabs: TABS,
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

export { node }
