import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import RunAtInterfaceComponent from './RunAtInterface.vue'

export class RunAtInterface extends NodeInterface<string> {
	component = markRaw(RunAtInterfaceComponent) as ComponentOptions
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

export { RunAtInterfaceComponent }
