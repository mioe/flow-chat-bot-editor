import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import TabsInterfaceComponent from './TabsInterface.vue'

export class TabsInterface extends NodeInterface<string> {
	component = markRaw(TabsInterfaceComponent) as ComponentOptions
	public position = undefined
	public tabs = []

	public constructor({
		name,
		position,
		value,
		tabs,
	}: any) {
		super(name, value)
		this.position = position
		this.tabs = tabs
	}
}

export { TabsInterfaceComponent }
