import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import DurationInterfaceComponent from './DurationInterface.vue'

export class DurationInterface extends NodeInterface<number> {
	component = markRaw(DurationInterfaceComponent) as ComponentOptions
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

export { DurationInterfaceComponent }
