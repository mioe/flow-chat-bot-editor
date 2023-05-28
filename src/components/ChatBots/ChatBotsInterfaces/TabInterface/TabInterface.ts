import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import TabInterfaceComponent from './TabInterface.vue'

export class TabInterface extends NodeInterface<string> {
	component = markRaw(TabInterfaceComponent) as ComponentOptions
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

export { TabInterfaceComponent }
