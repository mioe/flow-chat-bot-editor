import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import TimeInputInterfaceComponent from './TimeInputInterface.vue'

export class TimeInputInterface extends NodeInterface<string | null> {
	component = markRaw(TimeInputInterfaceComponent) as ComponentOptions
	public position: string

	public constructor({
		name,
		value,
		position,
	}: any) {
		super(name, value)
		this.position = position
		this.setPort(false)
	}
}

export { TimeInputInterfaceComponent }
