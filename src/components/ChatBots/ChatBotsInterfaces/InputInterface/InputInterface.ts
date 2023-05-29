import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import InputInterfaceComponent from './InputInterface.vue'

export class InputInterface extends NodeInterface<string> {
	component = markRaw(InputInterfaceComponent) as ComponentOptions
	public position = undefined
	public callback?: () => void
	public placeholder = undefined
	public icon: boolean

	public constructor({ name, position, callback, value, placeholder, hidden = false, icon = true, port = true }: any) {
		super(name, value)
		this.callback = callback
		this.position = position
		this.placeholder = placeholder
		this.icon = icon
		this.hidden = hidden
		this.setPort(port)
	}
}

export { InputInterfaceComponent }
