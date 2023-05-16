import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import EditorInterfaceComponent from './EditorInterface.vue'

export class EditorInterface extends NodeInterface<string | null> {
	component = markRaw(EditorInterfaceComponent) as ComponentOptions
	public position = undefined
	public placeholder = undefined

	public constructor({
		name,
		position,
		value,
		placeholder,
	}: any) {
		super(name, value)
		this.position = position
		this.placeholder = placeholder
		this.setPort(false)
	}
}

export { EditorInterfaceComponent }
