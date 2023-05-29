import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import CancelOutputInterfaceComponent from './CancelOutputInterface.vue'

export class CancelOutputInterface extends NodeInterface<undefined> {
	component = markRaw(CancelOutputInterfaceComponent) as ComponentOptions
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

export { CancelOutputInterfaceComponent }
