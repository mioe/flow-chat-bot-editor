import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import SimpleInterfaceComponent from './SimpleInterface.vue'

export class SimpleInterface extends NodeInterface<undefined> {
	component = markRaw(SimpleInterfaceComponent) as ComponentOptions
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

export { SimpleInterfaceComponent }
