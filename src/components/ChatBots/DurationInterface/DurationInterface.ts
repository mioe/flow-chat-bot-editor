import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import DurationInterfaceComponent from './DurationInterface.vue'

export class DurationInterface extends NodeInterface<number> {
	component = markRaw(DurationInterfaceComponent) as ComponentOptions
	public hide: boolean

	public constructor({
		name,
		value,
		hide,
	}: any) {
		super(name, value)
		this.hide = hide
		this.setPort(false)
	}
}

export { DurationInterfaceComponent }
