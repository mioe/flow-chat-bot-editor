import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import ButtonInterfaceComponent from './ButtonInterface.vue'

const DEFAULT_OPTIONS = {
	variant: 'default',
	size: 'small',
	color: 'secondary',
	disabled: false,
	nuxt: false,
	type: 'button',
}

export class ButtonInterface extends NodeInterface<undefined> {
	public component = markRaw(ButtonInterfaceComponent) as ComponentOptions
	public callback?: () => void
	public position = undefined
	public options? = DEFAULT_OPTIONS
	public icon = null

	public constructor({
		name,
		callback,
		position,
		options = DEFAULT_OPTIONS,
		icon = null,
	}: any) {
		super(name, undefined)
		this.callback = callback
		this.position = position
		this.options = options
		this.icon = icon
		this.setPort(false)
	}
}

export { ButtonInterfaceComponent }
