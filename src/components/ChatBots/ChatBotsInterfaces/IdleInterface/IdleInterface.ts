import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import IdleInterfaceComponent from './IdleInterface.vue'

export class IdleInterface extends NodeInterface<number | null> {
	component = markRaw(IdleInterfaceComponent) as ComponentOptions
	public position = undefined

	public constructor({
		name,
		value,
		position,
	}: any) {
		super(name, value)
		this.position = position
	}
}

export { IdleInterfaceComponent }
