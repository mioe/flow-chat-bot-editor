import { ComponentOptions, defineComponent, h } from 'vue'
import { Components } from '@baklavajs/renderer-vue'
import { AbstractNode } from '@baklavajs/core'
// @ts-ignore
import MyNodeRenderer from './MyNodeRenderer.vue'

export default defineComponent({
	props: {
		node: {
			type: Object as () => AbstractNode,
			required: true,
		},
	},
	render() {
		const getComponent = (): ComponentOptions => {
			const node = this.node
			return node.type === 'MyNode' ? MyNodeRenderer : (Components.Node as ComponentOptions)
		}

		return h(getComponent(), { ...this.$props, ...this.$attrs })
	},
})
