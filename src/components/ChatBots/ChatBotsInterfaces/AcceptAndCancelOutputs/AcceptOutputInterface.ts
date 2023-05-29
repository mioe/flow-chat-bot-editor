import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import AcceptOutputInterfaceComponent from './AcceptOutputInterface.vue'

export class AcceptOutputInterface extends NodeInterface<undefined> {
	component = markRaw(AcceptOutputInterfaceComponent) as ComponentOptions
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

export { AcceptOutputInterfaceComponent }
