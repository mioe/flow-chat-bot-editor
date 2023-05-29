import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import CalendarInterfaceComponent from './CalendarInterface.vue'

export class CalendarInterface extends NodeInterface<string> {
	component = markRaw(CalendarInterfaceComponent) as ComponentOptions
	public position = undefined
	public min = undefined

	public constructor({ name, position, min, value, hidden = false }: any) {
		super(name, value)
		this.position = position
		this.min = min
		this.setHidden(hidden)
		this.setPort(false)
	}
}

export { CalendarInterfaceComponent }
