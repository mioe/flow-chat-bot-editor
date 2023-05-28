import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import SelectInputInterfaceComponent from './SelectInputInterface.vue'

export class SelectInputInterface extends NodeInterface<string | null> {
	component = markRaw(SelectInputInterfaceComponent) as ComponentOptions
	public position: string
	public placeholder: string
	public disabled: boolean
	public options = undefined

	public constructor({
		name,
		value,
		options,
		position,
		disabled = false,
		placeholder = '',
		hidden = false,
	}: any) {
		super(name, value)
		this.options = options
		this.position = position
		this.disabled = disabled
		this.placeholder = placeholder
		this.setPort(false)
		this.setHidden(hidden)
	}
}

export { SelectInputInterfaceComponent }
