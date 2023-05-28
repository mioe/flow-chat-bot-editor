import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import ChipsInterfaceComponent from './ChipsInterface.vue'

export class ChipsInterface extends NodeInterface<string | null> {
	component = markRaw(ChipsInterfaceComponent) as ComponentOptions
	public position = undefined
	public chips = undefined

	public constructor({ name, position, value, chips, hidden = false }: any) {
		super(name, value)
		this.position = position
		this.chips = chips
		this.setPort(false)
		this.setHidden(hidden)
	}
}

export { ChipsInterfaceComponent }
