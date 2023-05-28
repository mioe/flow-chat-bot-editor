import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import FromToInterfaceComponent from './FromToInterface.vue'

export class FromToInterface extends NodeInterface<string> {
	component = markRaw(FromToInterfaceComponent) as ComponentOptions
	public position = undefined
	public active: boolean
	public disabled: boolean

	public constructor({
		name,
		value,
		position,
		active = true,
		disabled = false,
		hidden = false
	}: any) {
		super(name, value)
		this.active = active
		this.disabled = disabled
		this.position = position
		this.setHidden(hidden)
	}
}

export { FromToInterfaceComponent }
