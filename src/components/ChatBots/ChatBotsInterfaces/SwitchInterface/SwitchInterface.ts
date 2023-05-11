import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import SwitchInterfaceComponent from './SwitchInterface.vue'

export class SwitchInterface extends NodeInterface<boolean> {
	component = markRaw(SwitchInterfaceComponent) as ComponentOptions
}

export { SwitchInterfaceComponent }
