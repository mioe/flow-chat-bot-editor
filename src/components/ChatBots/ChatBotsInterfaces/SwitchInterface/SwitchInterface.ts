import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import SwitchInterfaceComponent from './SwitchInterface.vue'

export class SwitchInterface extends NodeInterface<boolean> {
	component = markRaw(SwitchInterfaceComponent) as ComponentOptions
	public position = undefined

	public constructor({
		name,
		position,
		value,
	}: any) {
		super(name, value)
		this.position = position
		this.setPort(false)
	}
}

export { SwitchInterfaceComponent }
