import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import InputInterfaceComponent from './InputInterface.vue'

export class InputInterface extends NodeInterface<string | null> {
	component = markRaw(InputInterfaceComponent) as ComponentOptions
	public position = undefined
	public callback?: () => void
	public placeholder = undefined

	public constructor({
		name,
		position,
		callback,
		value,
		placeholder,
	}: any) {
		super(name, value)
		this.callback = callback
		this.position = position
		this.placeholder = placeholder
	}
}

export { InputInterfaceComponent }
